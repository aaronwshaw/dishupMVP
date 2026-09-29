import HeroSearch from "@/components/HeroSearch";
import HomeSections from "@/components/HomeSections";
import { CITIES } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="bg-hero bg-[radial-gradient(ellipse_at_top_right,rgba(218,55,67,0.35),transparent_60%)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-24">
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Find the best dish, not just the best restaurant
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/75 sm:text-lg">
            Rate the plates you actually ordered at Provo and Orem spots, so the next person knows exactly what to get.
          </p>
          <div className="mt-8 flex w-full justify-center">
            <HeroSearch cities={CITIES} />
          </div>
        </div>
      </section>
      <HomeSections />
    </>
  );
}
