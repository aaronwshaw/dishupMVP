"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ message, onDone }: { message: string; onDone?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!visible) return null;
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg"
    >
      <CheckCircle2 size={18} className="text-green-400" />
      {message}
    </div>
  );
}
