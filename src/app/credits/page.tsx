import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PhotoCreditLine from "@/components/PhotoCreditLine";
import { getAllDishes, getRestaurant } from "@/lib/data";

export const metadata: Metadata = { title: "Photo credits · DishUp" };

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Photo credits</h1>
      <p className="mt-2 text-muted">
        DishUp&apos;s dish photos are representative images from{" "}
        <a href="https://commons.wikimedia.org" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">
          Wikimedia Commons
        </a>{" "}
        under the licenses shown, not photos from the restaurants themselves.
      </p>
      <ul className="mt-8 divide-y divide-line">
        {getAllDishes()
          .filter((d) => d.photoCredit)
          .map((d) => (
            <li key={d.id} className="flex items-center gap-4 py-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                <Image src={d.imageUrl} alt={d.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0 text-sm">
                <Link href={`/dishes/${d.id}`} className="font-bold hover:text-brand">
                  {d.name}
                </Link>
                <span className="text-muted"> · {getRestaurant(d.restaurantId)?.name}</span>
                <div className="text-muted">
                  <PhotoCreditLine credit={d.photoCredit!} />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
