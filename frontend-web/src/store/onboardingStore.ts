import { create } from 'zustand';
import type { OnboardingRole } from '../data/onboardingSchema';

export type OnboardingStatus = 'incomplete' | 'skipped' | 'completed';
/** Providers go to 'pending' on submit; an admin flow will later move them to verified/rejected. */
export type VerificationStatus = 'none' | 'pending' | 'verified' | 'rejected';

export type OnboardingAnswers = Record<string, string | number | boolean | string[]>;

interface PersistedOnboarding {
  status: OnboardingStatus;
  role: OnboardingRole | null;
  answers: OnboardingAnswers;
  verification: VerificationStatus;
  submittedAt: string | null;
}

interface OnboardingState extends PersistedOnboarding {
  complete: (role: OnboardingRole, answers: OnboardingAnswers, isProvider: boolean) => void;
  skip: () => void;
  reset: () => void;
}

const STORAGE_KEY = 'onboarding_state';

function load(): PersistedOnboarding {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedOnboarding;
      // A skip only lasts for the session it happened in — show the
      // questionnaire again on the next visit until it's completed.
      if (parsed.status !== 'skipped') return parsed;
    }
  } catch {
    // corrupted state — fall through to defaults
  }
  return { status: 'incomplete', role: null, answers: {}, verification: 'none', submittedAt: null };
}

function save(state: PersistedOnboarding) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...load(),

  complete: (role, answers, isProvider) => {
    const next: PersistedOnboarding = {
      status: 'completed',
      role,
      answers,
      verification: isProvider ? 'pending' : 'none',
      submittedAt: new Date().toISOString(),
    };
    save(next);
    set(next);
  },

  // Deliberately not persisted: a skip hides the modal for this session only.
  skip: () => {
    set({ status: 'skipped', role: null, answers: {}, verification: 'none', submittedAt: null });
  },

  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ status: 'incomplete', role: null, answers: {}, verification: 'none', submittedAt: null });
  },
}));
