"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

/** Shrinks a photo so it fits comfortably in localStorage (~5MB total). */
async function resizeImage(file: File, maxWidth = 800): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new window.Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, maxWidth / img.naturalWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.8);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function PhotoUpload({ value, onChange }: { value?: string; onChange: (v?: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("That file isn't an image.");
      return;
    }
    setBusy(true);
    try {
      onChange(await resizeImage(file));
    } catch {
      setError("Couldn't read that photo. Try a JPG or PNG.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative h-48 w-64 overflow-hidden rounded-md border border-line">
          <Image src={value} alt="Your photo" fill unoptimized className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            aria-label="Remove photo"
            className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files[0]);
          }}
          className="flex h-36 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-line text-sm text-muted transition-colors hover:border-brand hover:text-brand"
        >
          <Camera size={28} />
          {busy ? "Processing…" : "Click or drag a photo of your dish"}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      {error && <p className="mt-2 text-sm text-brand">{error}</p>}
    </div>
  );
}
