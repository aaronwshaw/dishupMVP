import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">This page isn&apos;t on the menu</h1>
      <p className="mt-2 text-muted">The restaurant or dish you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-dark">
        Back to home
      </Link>
    </div>
  );
}
