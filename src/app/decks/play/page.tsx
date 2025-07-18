"use client";

import { useEffect, useState } from "react";
import { createInitialDeck } from "@/utils/deck";
import { HeroCard } from "@/models/heroCard";
import Image from "next/image";
import clsx from "clsx";

type Battlefield = {
  Strength: HeroCard[];
  Agility: HeroCard[];
  Intelligence: HeroCard[];
};

export default function PlayGame() {
  const [deck, setDeck] = useState<HeroCard[]>([]);
  const [hand, setHand] = useState<HeroCard[]>([]);
  const [battlefield, setBattlefield] = useState<Battlefield>({
    Strength: [],
    Agility: [],
    Intelligence: [],
  });

  useEffect(() => {
    const initialDeck = createInitialDeck();
    setDeck(initialDeck.slice(5)); // mazo
    setHand(initialDeck.slice(0, 5)); // mano inicial
  }, []);

  function playCard(card: HeroCard) {
    setHand((prev) => prev.filter((c) => c !== card));
    setBattlefield((prev) => ({
      ...prev,
      [card.mainAttribute]: [...prev[card.mainAttribute], card],
    }));
    if (deck.length > 0) {
      const [nextCard, ...rest] = deck;
      setHand((prev) => [...prev, nextCard]);
      setDeck(rest);
    }
  }

  function getTotalPoints(cards: HeroCard[]): number {
    const roleCount: Record<string, number> = {};
    cards.forEach((c) => {
      roleCount[c.activeRole] = (roleCount[c.activeRole] || 0) + 1;
    });
    return cards.reduce((total, card) => {
      const multiplier = roleCount[card.activeRole] >= 2 ? 2 : 1;
      return total + card.points * multiplier;
    }, 0);
  }

  return (
    <main className="p-4 space-y-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold text-center">🃏 Juego de Cartas Dota</h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["Strength", "Agility", "Intelligence"] as const).map((attr) => (
          <div key={attr} className="border p-3 rounded-lg shadow bg-white text-black">
            <h2 className="font-semibold text-lg mb-2">
              {attr === "Strength" && "💪 Fuerza"}
              {attr === "Agility" && "🗡️ Agilidad"}
              {attr === "Intelligence" && "🧠 Inteligencia"}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {battlefield[attr].map((card, idx) => (
                <Card key={`${card.id}-${idx}`} card={card} />
              ))}
            </div>
            <p className="mt-2 font-bold">
              Total: {getTotalPoints(battlefield[attr])} puntos
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tu mano:</h2>
        <div className="flex flex-wrap gap-4">
          {hand.map((card) => (
            <div
              key={card.id}
              onClick={() => playCard(card)}
              className="cursor-pointer"
              title="Haz clic para jugar esta carta"
            >
              <Card card={card} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Haz clic en una carta para jugarla
        </p>
      </section>
    </main>
  );
}

function Card({ card }: { card: HeroCard }) {
  return (
    <div
      className={clsx(
        "p-2 border rounded-md w-[100px] text-center shadow-sm bg-white",
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
        className="mx-auto rounded"
      />
      <p className="text-sm capitalize font-bold">{card.name}</p>
      <p className="text-xs text-gray-600">Rol: {card.activeRole}</p>
      <p className="text-purple-700 font-semibold">Puntos: {card.points}</p>
    </div>
  );
}
