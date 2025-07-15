"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">🔥 Dota Card Battle</h1>
      <p className="text-gray-600">Selecciona un modo de juego:</p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <GameLink href="/decks/play-1v1" label="🧑‍🤝‍🧑 Jugar 1v1" />
        <GameLink href="/decks/play-vs-ai" label="🤖 Jugar contra IA" />
        <GameLink href="/decks/view" label="📦 Ver tu colección" />
        <GameLink href="/decks/create" label="🃏 Crear mazo" />
        <GameLink href="/decks/tutorial" label="📘 Tutorial" />
      </div>
    </main>
  );
}

function GameLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} passHref>
      <a className="bg-white border rounded-xl p-6 shadow hover:shadow-md hover:scale-105 transition transform duration-300 block">
        <p className="text-xl font-semibold">{label}</p>
      </a>
    </Link>
  );
}
