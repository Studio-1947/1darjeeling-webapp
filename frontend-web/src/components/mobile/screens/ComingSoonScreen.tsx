import { attractions } from '../../../data/attractions';

interface ComingSoonScreenProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

/**
 * Placeholder screen sharing the reference hero style, used for category tabs
 * whose full layouts are being built in subsequent passes.
 */
export default function ComingSoonScreen({ eyebrow, title, subtitle }: ComingSoonScreenProps) {
  return (
    <div className="pb-4">
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img src={attractions[0]?.photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-6 text-white">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-white/15 text-[10.5px] font-semibold text-amber-200 mb-3">
              {eyebrow}
            </span>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2">{title}</h1>
            <p className="text-[12.5px] leading-relaxed text-white/80">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10 text-center">
        <div className="text-3xl mb-3">🚧</div>
        <h2 className="text-[17px] font-bold text-ink">This screen is coming next</h2>
        <p className="text-[13px] text-body-text mt-1.5 max-w-xs mx-auto">
          The full layout for this section is being built to match the design.
        </p>
      </div>
    </div>
  );
}
