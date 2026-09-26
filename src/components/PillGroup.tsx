/** A row of toggle pills; used for the city filter and the rating filter. */
export default function PillGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`h-9 rounded-full border px-4 text-sm font-semibold transition-colors ${
              active
                ? "border-brand bg-brand text-white"
                : "border-line bg-white text-ink hover:border-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
