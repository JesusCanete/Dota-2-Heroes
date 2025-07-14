// src/app/decks/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createInitialDeck } from "@/utils/deck";
import { HeroCard } from "@/models/heroCard";
import Image from "next/image";
import clsx from "clsx";

function groupByLine(deck: HeroCard[]) {
  return {
    strength: deck.filter((h) => h.mainAttribute === "Strength"),
    agility: deck.filter((h) => h.mainAttribute === "Agility"),
    intelligence: deck.filter((h) => h.mainAttribute === "Intelligence"),
  };
}

function applyRoleBonus(line: HeroCard[]): HeroCard[] {
  const roleCount: Record<string, number> = {};
  line.forEach((card) => {
    roleCount[card.activeRole] = (roleCount[card.activeRole] || 0) + 1;
  });

  return line.map((card) => {
    const sameRoleCount = roleCount[card.activeRole];
    const boostedPoints = sameRoleCount >= 2 ? card.points * 2 : card.points;
    return { ...card, points: boostedPoints };
  });
}

export default function DeckBoard() {
  const [deck, setDeck] = useState<HeroCard[]>([]);

  useEffect(() => {
    const newDeck = createInitialDeck();
    setDeck(newDeck);
  }, []);

  const { strength, agility, intelligence } = groupByLine(deck);

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">⚔️ Campo de Batalla</h1>

      <section className="space-y-4">
        <Line title="Primera línea: Fuerza 💪" cards={applyRoleBonus(strength)} />
        <Line title="Segunda línea: Agilidad 🗡️" cards={applyRoleBonus(agility)} />
        <Line title="Tercera línea: Inteligencia 🧠" cards={applyRoleBonus(intelligence)} />
      </section>
    </main>
  );
}

function Line({ title, cards }: { title: string; cards: HeroCard[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id + "-" + Math.random()}
            className={clsx(
              "rounded-lg border shadow-md p-2 bg-white flex flex-col items-center",
              card.mainAttribute === "Strength" && "border-red-500",
              card.mainAttribute === "Agility" && "border-green-500",
              card.mainAttribute === "Intelligence" && "border-blue-500"
            )}
          >
            <Image
              src={card.image}
              alt={card.name}
              width={80}
              height={80}
              className="rounded-md"
            />
            <p className="mt-1 font-bold capitalize">{card.name}</p>
            <p className="text-sm text-gray-600">Rol: {card.activeRole}</p>
            <p className="text-sm font-semibold text-purple-600">
              Puntos: {card.points}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
