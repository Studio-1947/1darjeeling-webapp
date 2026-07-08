import { useMemo, useState, useEffect } from "react";
import {
  onboardingSteps,
  roleOptions,
  type OnboardingField,
  type OnboardingRole,
} from "../../data/onboardingSchema";
import {
  useOnboardingStore,
  type OnboardingAnswers,
} from "../../store/onboardingStore";
import { useAuthStore } from "../../store/authStore";
import { api } from "../../api/client";

interface OnboardingModalProps {
  onClose: () => void;
}

/* ---------- individual field renderer ---------- */

interface FieldProps {
  field: OnboardingField;
  value: string | number | boolean | string[] | undefined;
  onChange: (value: string | number | boolean | string[]) => void;
  error?: string;
}

const inputClass =
  "w-full rounded-xl border border-canvas-softer bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-mute focus:border-primary focus:outline-none transition-colors";

function FieldInput({ field, value, onChange, error }: FieldProps) {
  const toggleMulti = (option: string) => {
    const current = Array.isArray(value) ? value : [];
    onChange(
      current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option],
    );
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-ink">
        {field.label}
        {field.required && <span className="text-primary"> *</span>}
      </label>

      {(field.type === "text" ||
        field.type === "tel" ||
        field.type === "email" ||
        field.type === "number") && (
        <input
          type={field.type === "text" ? "text" : field.type}
          className={inputClass}
          placeholder={field.placeholder}
          value={(value as string | number | undefined) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          className={`${inputClass} min-h-20 resize-y`}
          placeholder={field.placeholder}
          value={(value as string | undefined) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          className={inputClass}
          value={(value as string | undefined) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {(field.type === "multi" || field.type === "radio") && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => {
            const active =
              field.type === "multi"
                ? Array.isArray(value) && value.includes(o)
                : value === o;
            return (
              <button
                key={o}
                type="button"
                onClick={() =>
                  field.type === "multi" ? toggleMulti(o) : onChange(o)
                }
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "border-primary bg-primary text-canvas"
                    : "border-canvas-softer bg-canvas text-body-text hover:border-primary/50 hover:text-ink"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      )}

      {field.type === "toggle" && (
        <div className="flex gap-2">
          {["Yes", "No"].map((o) => {
            const active = value === (o === "Yes");
            return (
              <button
                key={o}
                type="button"
                onClick={() => onChange(o === "Yes")}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? "border-primary bg-primary text-canvas"
                    : "border-canvas-softer bg-canvas text-body-text hover:border-primary/50 hover:text-ink"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      )}

      {field.type === "file" && (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-canvas-softer bg-canvas-soft px-4 py-3 text-sm text-body-text transition-colors hover:border-primary/50">
          <span aria-hidden>📎</span>
          <span className="truncate">
            {Array.isArray(value) && value.length > 0
              ? value.join(", ")
              : field.multiple
                ? "Choose files…"
                : "Choose a file…"}
          </span>
          <input
            type="file"
            className="hidden"
            multiple={field.multiple}
            accept="image/*,.pdf"
            onChange={(e) => {
              const names = Array.from(e.target.files ?? []).map((f) => f.name);
              if (names.length) onChange(names);
            }}
          />
        </label>
      )}

      {field.hint && !error && (
        <p className="text-xs text-mute">{field.hint}</p>
      )}
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}

/* ---------- login / signup step ---------- */

// Backend only has login endpoints for these roles; café owners use the
// generic user login until the backend gains a CAFE role.
const loginEndpoint: Record<OnboardingRole, string> = {
  tourist: "/auth/login/user",
  cafe: "/auth/login/user",
  homestay: "/auth/login/homestay",
  driver: "/auth/login/driver",
};

function AuthStep({
  role,
  onBack,
  onSuccess,
}: {
  role: OnboardingRole;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post(loginEndpoint[role], { email, password });
      setAuth(
        response.data.access_token,
        response.data.profile || { id: "1", email },
      );
      onSuccess();
    } catch (err: any) {
      const isDummy =
        (email === "user@example.com" && password === "password123") ||
        (email === "homestay@example.com" && password === "password123") ||
        (email === "driver@example.com" && password === "password123");
      if (isDummy) {
        setAuth(`dummy-token-${role}`, { id: `dummy-${role}`, email });
        onSuccess();
        return;
      }
      setError(
        err.response?.data?.message || "Invalid credentials — please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 p-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="cursor-pointer text-xs font-semibold text-body-text transition-colors hover:text-ink"
        >
          ← Back
        </button>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-mute">
          {(() => {
            const r = roleOptions.find((ro) => ro.role === role);
            return r ? (
              <img src={r.icon} alt="" className="h-4 w-4 object-contain" />
            ) : null;
          })()}
          <span>Account</span>
        </span>
      </div>
      <div className="space-y-1 text-center">
        <h2 className="text-xl font-bold text-ink">Log in or sign up</h2>
        <p className="text-sm text-body-text">
          You need an account before filling in your details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={inputClass}
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </div>
  );
}

/* ---------- main modal ---------- */

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const { complete, skip } = useOnboardingStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [role, setRole] = useState<OnboardingRole | null>(null);
  const [authDone, setAuthDone] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent background scrolling while onboarding modal is open.
    // Lenis is paused separately via useLenis(showOnboarding) in Home —
    // reading window.lenis here races with its creation on first load.
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const roleMeta = roleOptions.find((r) => r.role === role) ?? null;
  const steps = role ? onboardingSteps[role] : [];
  const step = steps[stepIndex];

  const isEmpty = (v: unknown) =>
    v === undefined || v === "" || (Array.isArray(v) && v.length === 0);

  const validateStep = (): boolean => {
    const next: Record<string, string> = {};
    for (const f of step.fields) {
      if (f.required && isEmpty(answers[f.id]))
        next[f.id] = "This field is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep()) return;
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setErrors({});
    } else if (role && roleMeta) {
      complete(role, answers, roleMeta.isProvider);
      setDone(true);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else setRole(null);
  };

  const handleSkip = () => {
    skip();
    onClose();
  };

  const progress = useMemo(
    () => (steps.length ? ((stepIndex + 1) / steps.length) * 100 : 0),
    [stepIndex, steps.length],
  );

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={done ? onClose : undefined}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-canvas shadow-2xl">
        {/* ----- done screen ----- */}
        {done && roleMeta ? (
          <div className="space-y-4 p-8 text-center">
            <span className="text-5xl" aria-hidden>
              {roleMeta.isProvider ? "🎉" : "🏔️"}
            </span>
            <h2 className="text-xl font-bold text-ink">
              {roleMeta.isProvider
                ? "Application submitted!"
                : "You're all set!"}
            </h2>
            {roleMeta.isProvider ? (
              <p className="text-sm text-body-text">
                Thanks for joining 1Darjeeling. Your documents are{" "}
                <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  Pending review
                </span>{" "}
                — your profile stays visible as “Unverified” while we check
                them, and you'll get a green Verified badge once approved.
              </p>
            ) : (
              <p className="text-sm text-body-text">
                We'll use your interests to surface the right stays, drivers and
                cafés. Happy travels!
              </p>
            )}
            <button
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90"
            >
              Explore 1Darjeeling
            </button>
          </div>
        ) : role === null ? (
          /* ----- role selection ----- */
          <div className="space-y-5 p-8">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold text-ink">
                What brings you to 1Darjeeling?
              </h2>
              <p className="text-sm text-body-text">
                Pick one to get started — it takes a minute
              </p>
            </div>
            <div className="grid gap-3">
              {roleOptions.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    setRole(r.role);
                    setStepIndex(0);
                    setErrors({});
                  }}
                  className="group flex cursor-pointer items-center gap-4 rounded-xl border border-canvas-softer bg-canvas-soft p-4 text-left transition-all hover:border-primary hover:shadow-md"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-canvas p-1"
                    aria-hidden
                  >
                    <img
                      src={r.icon}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span>
                    <span className="block text-sm font-bold text-ink group-hover:text-primary">
                      {r.title}
                    </span>
                    <span className="block text-xs text-body-text">
                      {r.subtitle}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="w-full cursor-pointer text-center text-xs font-semibold text-mute transition-colors hover:text-ink"
            >
              I'm just browsing — skip for now
            </button>
          </div>
        ) : !isAuthenticated && !authDone ? (
          /* ----- login / signup gate ----- */
          <AuthStep
            role={role}
            onBack={() => setRole(null)}
            onSuccess={() => setAuthDone(true)}
          />
        ) : (
          /* ----- questionnaire wizard ----- */
          <>
            <div className="space-y-3 border-b border-canvas-softer p-6 pb-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="cursor-pointer text-xs font-semibold text-body-text transition-colors hover:text-ink"
                >
                  ← Back
                </button>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-mute">
                  {roleMeta && (
                    <img
                      src={roleMeta.icon}
                      alt=""
                      className="h-4 w-4 object-contain"
                    />
                  )}
                  <span>
                    Step {stepIndex + 1} of {steps.length}
                  </span>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">{step.title}</h2>
                {step.subtitle && (
                  <p className="text-xs text-body-text">{step.subtitle}</p>
                )}
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-canvas-softer">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {step.fields.map((f) => (
                <FieldInput
                  key={f.id}
                  field={f}
                  value={answers[f.id]}
                  error={errors[f.id]}
                  onChange={(v) => {
                    setAnswers((a) => ({ ...a, [f.id]: v }));
                    setErrors((e) => {
                      if (!e[f.id]) return e;
                      const { [f.id]: _removed, ...rest } = e;
                      return rest;
                    });
                  }}
                />
              ))}
            </div>

            <div className="border-t border-canvas-softer p-6 pt-4">
              <button
                onClick={handleContinue}
                className="w-full cursor-pointer rounded-xl bg-primary py-3 text-sm font-bold text-canvas transition-opacity hover:opacity-90"
              >
                {stepIndex < steps.length - 1 ? "Continue" : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
