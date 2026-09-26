import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
            <UtensilsCrossed size={16} strokeWidth={2.5} />
          </span>
          DishUp
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-4">
          <Link href="/restaurants" className="rounded-md px-3 py-2 hover:bg-band">
            Restaurants
          </Link>
          <Link href="/#top-dishes" className="rounded-md px-3 py-2 hover:bg-band">
            Top dishes
          </Link>
        </nav>
      </div>
    </header>
  );
}
