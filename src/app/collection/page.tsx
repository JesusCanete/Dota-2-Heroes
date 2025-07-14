// src/app/collection/page.tsx
"use client";
import Image from "next/image";
import heroes from "@/data/heroes.json";

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">📚 Tu Colección de Cartas</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {heroes.map((hero) => (
          <div
            key={hero.id}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden p-4 text-center hover:scale-105 transition-transform"
          >
            <Image
              src={hero.image}
              alt={hero.name}
              width={100}
              height={100}
              className="mx-auto rounded"
            />
            <h2 className="mt-2 text-lg font-semibold capitalize">{hero.name}</h2>
            <p className="text-sm text-gray-400">{hero.mainAttribute}</p>
            <p className="text-xs mt-1 text-gray-500">
              {hero.roles.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}