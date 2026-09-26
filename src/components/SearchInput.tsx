import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="relative w-full">
      <Search size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
      <input
        type="search"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-line bg-white pr-9 pl-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted hover:bg-band"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
