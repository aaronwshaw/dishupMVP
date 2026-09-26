import { SearchX } from "lucide-react";

export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-line px-6 py-14 text-center">
      <SearchX size={36} className="text-muted" />
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{message}</p>
    </div>
  );
}
