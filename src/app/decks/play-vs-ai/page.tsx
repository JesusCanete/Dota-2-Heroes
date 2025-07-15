"use client";

import { useEffect, useState } from "react";
import { createInitialDeck } from "@/utils/deck";
import { HeroCard as HeroCardType } from "@/types/HeroCard";
import { HeroCard } from "@/components/HeroCard";
import GameResult from "@/components/GameResult";

export default function PlayVsAI() {
  const [playerDeck, setPlayerDeck] = useState<HeroCardType[]>([]);
  const [aiDeck, setAiDeck] = useState<HeroCardType[]>([]);
  const [gameResult, setGameResult] = useState<"win" | "lose" | "draw" | null>(null);

  useEffect(() => {
    const player = createInitialDeck();
    const ai = createInitialDeck();

    setPlayerDeck(player);
    setAiDeck(ai);

    const playerTotal = calculateTotal(player);
    const aiTotal = calculateTotal(ai);

    if (playerTotal > aiTotal) setGameResult("win");
    else if (playerTotal < aiTotal) setGameResult("lose");
    else setGameResult("draw");
  }, []);

  function calculateTotal(deck: HeroCardType[]) {
    return deck.reduce((total, card) => total + card.points, 0);
  }

  function handleRestart() {
    window.location.reload();
  }

  return (
    <main className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">🤖 Juego contra IA</h1>

      {gameResult && <GameResult result={gameResult} onRestart={handleRestart} />}

      <div className="grid grid-cols-2 gap-4 mt-10">
        <div>
          <h2 className="text-xl font-semibold text-center mb-2">🧑 Tú</h2>
          <DeckDisplay deck={playerDeck} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center mb-2">🤖 IA</h2>
          <DeckDisplay deck={aiDeck} />
        </div>
      </div>
    </main>
  );
}

function DeckDisplay({ deck }: { deck: HeroCardType[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {deck.map((card, index) => (
        <HeroCard key={`${card.id}-${card.activeRole}-${index}`} hero={card} />
      ))}
    </div>
  );
}
