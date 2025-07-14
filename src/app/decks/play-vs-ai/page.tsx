// "use client";

// import { useEffect, useState } from "react";
// import { createInitialDeck } from "@/utils/deck";
// import { HeroCard } from "@/models/heroCard";
// import Image from "next/image";
// import clsx from "clsx";

// type Battlefield = {
//   Strength: HeroCard[];
//   Agility: HeroCard[];
//   Intelligence: HeroCard[];
// };

// export default function PlayVsAI() {
//   const [playerDeck, setPlayerDeck] = useState<HeroCard[]>([]);
//   const [playerHand, setPlayerHand] = useState<HeroCard[]>([]);
//   const [playerField, setPlayerField] = useState<Battlefield>({
//     Strength: [],
//     Agility: [],
//     Intelligence: [],
//   });

//   const [aiDeck, setAIDeck] = useState<HeroCard[]>([]);
//   const [aiHand, setAIHand] = useState<HeroCard[]>([]);
//   const [aiField, setAIField] = useState<Battlefield>({
//     Strength: [],
//     Agility: [],
//     Intelligence: [],
//   });

//   useEffect(() => {
//     const myDeck = createInitialDeck();
//     const botDeck = createInitialDeck();
//     setPlayerDeck(myDeck.slice(5));
//     setPlayerHand(myDeck.slice(0, 5));
//     setAIDeck(botDeck.slice(5));
//     setAIHand(botDeck.slice(0, 5));
//   }, []);

//   const [playerTurn, setPlayerTurn] = useState(true);

//   function playCard(card: HeroCard) {
//     if (!playerTurn) return;

//     setPlayerHand((prev) => prev.filter((c) => c !== card));
//     setPlayerField((prev) => ({
//       ...prev,
//       [card.mainAttribute]: [...prev[card.mainAttribute], card],
//     }));

//     // Robar carta
//     if (playerDeck.length > 0) {
//       const [next, ...rest] = playerDeck;
//       setPlayerHand((prev) => [...prev, next]);
//       setPlayerDeck(rest);
//     }

//     // Esperar medio segundo y hacer jugar a la IA
//     setTimeout(() => aiPlay(), 500);
//     setPlayerTurn(false);
//   }

//   function aiPlay() {
//     if (aiHand.length === 0) return;

//     // IA elige la carta con más puntos
//     const cardToPlay = [...aiHand].sort((a, b) => b.points - a.points)[0];

//     setAIHand((prev) => prev.filter((c) => c !== cardToPlay));
//     setAIField((prev) => ({
//       ...prev,
//       [cardToPlay.mainAttribute]: [...prev[cardToPlay.mainAttribute], cardToPlay],
//     }));

//     if (aiDeck.length > 0) {
//       const [next, ...rest] = aiDeck;
//       setAIHand((prev) => [...prev, next]);
//       setAIDeck(rest);
//     }

//     setPlayerTurn(true);
//   }

//   function getTotalPoints(cards: HeroCard[]): number {
//     const roleCount: Record<string, number> = {};
//     cards.forEach((c) => {
//       roleCount[c.activeRole] = (roleCount[c.activeRole] || 0) + 1;
//     });

//     return cards.reduce((total, card) => {
//       const multiplier = roleCount[card.activeRole] >= 2 ? 2 : 1;
//       return total + card.points * multiplier;
//     }, 0);
//   }

//   function getFieldPoints(field: Battlefield): number {
//     return (
//       getTotalPoints(field.Strength) +
//       getTotalPoints(field.Agility) +
//       getTotalPoints(field.Intelligence)
//     );
//   }

//   return (
//     <main className="p-4 space-y-6">
//       <h1 className="text-2xl font-bold text-center">👤 Tú vs 🤖 IA</h1>

//       <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {(["Strength", "Agility", "Intelligence"] as const).map((attr) => (
//           <div key={attr} className="border p-3 rounded-lg shadow bg-white">
//             <h2 className="font-semibold text-lg mb-2">
//               {attr === "Strength" && "💪 Fuerza"}
//               {attr === "Agility" && "🗡️ Agilidad"}
//               {attr === "Intelligence" && "🧠 Inteligencia"}
//             </h2>

//             <div>
//               <p className="text-sm font-semibold text-gray-700 mb-1">IA:</p>
//               <div className="flex flex-wrap gap-2">
//                 {aiField[attr].map((card, i) => (
//                   <Card key={i + card.id} card={card} />
//                 ))}
//               </div>
//             </div>

//             <div className="mt-2">
//               <p className="text-sm font-semibold text-gray-700 mb-1">Tú:</p>
//               <div className="flex flex-wrap gap-2">
//                 {playerField[attr].map((card, i) => (
//                   <Card key={i + card.id} card={card} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       <section className="text-center space-y-1">
//         <h2 className="text-xl font-bold">Tu mano:</h2>
//         <div className="flex flex-wrap justify-center gap-4">
//           {playerHand.map((card, i) => (
//             <div key={i} onClick={() => playCard(card)} className="cursor-pointer">
//               <Card card={card} />
//             </div>
//           ))}
//         </div>
//         <p className="text-sm text-gray-500">
//           {playerTurn ? "Tu turno – Juega una carta" : "Esperando a la IA..."}
//         </p>
//       </section>

//       <section className="text-center mt-4">
//         <p className="text-lg font-semibold">
//           🧠 Puntos IA: {getFieldPoints(aiField)} | 👤 Tus puntos: {getFieldPoints(playerField)}
//         </p>
//       </section>
//     </main>
//   );
// }

// function Card({ card }: { card: HeroCard }) {
//   return (
//     <div
//       className={clsx(
//         "p-2 border rounded-md w-[100px] text-center shadow-sm",
//         card.mainAttribute === "Strength" && "border-red-500",
//         card.mainAttribute === "Agility" && "border-green-500",
//         card.mainAttribute === "Intelligence" && "border-blue-500"
//       )}
//     >
//       <Image src={card.image} alt={card.name} width={80} height={80} className="mx-auto rounded" />
//       <p className="text-sm capitalize font-bold">{card.name}</p>
//       <p className="text-xs text-gray-500">Rol: {card.activeRole}</p>
//       <p className="text-purple-700 font-semibold">Puntos: {card.points}</p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { generateRandomDeck } from "@/utils/deck";
import HeroCard from "@/components/HeroCard";
import { HeroCard as HeroCardType } from "@/types/HeroCard";
import GameResult from "@/components/GameResult";

export default function PlayVsAI() {
  const [playerDeck, setPlayerDeck] = useState<HeroCardType[]>([]);
  const [aiDeck, setAiDeck] = useState<HeroCardType[]>([]);
  const [gameResult, setGameResult] = useState<"win" | "lose" | "draw" | null>(null);

  useEffect(() => {
    const player = generateRandomDeck();
    const ai = generateRandomDeck();

    setPlayerDeck(player);
    setAiDeck(ai);

    const playerTotal = calculateTotal(player);
    const aiTotal = calculateTotal(ai);

    if (playerTotal > aiTotal) setGameResult("win");
    else if (playerTotal < aiTotal) setGameResult("lose");
    else setGameResult("draw");
  }, []);

  const calculateTotal = (deck: HeroCardType[]) => {
    return deck.reduce((total, card) => total + card.points, 0);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🤖 Juego contra IA</h1>

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {deck.map((card) => (
        <HeroCard key={card.id} hero={card} />
      ))}
    </div>
  );
}
