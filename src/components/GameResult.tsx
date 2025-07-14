"use client";

import { Button } from "@/components/ui/button";

interface GameResultProps {
  result: "win" | "lose" | "draw";
  onRestart: () => void;
}

export default function GameResult({ result, onRestart }: GameResultProps) {
  const getMessage = () => {
    switch (result) {
      case "win":
        return "🎉 ¡Ganaste!";
      case "lose":
        return "😢 Perdiste contra la IA";
      case "draw":
        return "🤝 Empate";
    }
  };

  return (
    <div className="text-center space-y-4 bg-white p-6 rounded-xl shadow max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold">{getMessage()}</h2>
      <Button onClick={onRestart}>Volver a jugar</Button>
    </div>
  );
}
