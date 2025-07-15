"use client";

import { HeroCard as HeroCardType } from "@/types/HeroCard";
import Image from "next/image";

export function HeroCard({ hero }: { hero: HeroCardType }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center w-36 border-2 border-gray-300">
      <Image
        src={hero.image}
        alt={hero.name}
        width={64}
        height={64}
        className="mx-auto rounded"
      />
      <h3 className="font-bold text-sm mt-2">{hero.name}</h3>
      <p className="text-xs text-gray-500">{hero.activeRole}</p>
      <p className="text-sm font-bold mt-1 text-blue-600">{hero.points} pts</p>
    </div>
  );
}
