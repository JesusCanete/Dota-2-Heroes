"use client";

import { useState } from "react";
import heroes from "@/data/heroes.json";

interface Hero {
  id: number;
  name: string;
  image: string;
  roles: string[];
  difficulty: number;
  attackType: string;
  mainAttribute: string;
}

export default function PlayVsAIPage() {
  // Asignamos dificultad aleatoria 1, 2 o 3 provisionalmente
  const heroesTyped: Hero[] = heroes.map(h => ({
    ...h,
    difficulty: Math.floor(Math.random() * 3) + 1,
  }));

  const [playerHero, setPlayerHero] = useState<Hero | null>(null);
  const [aiHero, setAiHero] = useState<Hero | null>(null);
  const [result, setResult] = useState<string>("");

  const randomHero = (): Hero => {
    return heroesTyped[Math.floor(Math.random() * heroesTyped.length)];
  };

  const startMatch = () => {
    const player = randomHero();
    const ai = randomHero();
    setPlayerHero(player);
    setAiHero(ai);
    setResult("");
  };

  const fight = () => {
    if (!playerHero || !aiHero) return;

    if (playerHero.difficulty > aiHero.difficulty) {
      setResult("¡Ganaste! 🎉");
    } else if (playerHero.difficulty < aiHero.difficulty) {
      setResult("Perdiste contra la IA 😞");
    } else {
      setResult("Empate 🤝");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Modo VS IA</h1>

      <div className="flex justify-center gap-20 mb-8">
        {[playerHero, aiHero].map((hero, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-xl p-4 w-48 text-center"
          >
            {hero ? (
              <>
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="mx-auto rounded"
                  width={100}
                  height={100}
                />
                <h2 className="capitalize mt-2 text-xl font-semibold">
                  {hero.name}
                </h2>
                <p>Atributo: {hero.mainAttribute}</p>
                <p>Dificultad: {hero.difficulty}</p>
                <p>Roles: {hero.roles.join(", ")}</p>
              </>
            ) : (
              <p className="text-gray-400">Héroe no seleccionado</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6">
        <button
          onClick={startMatch}
          className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Seleccionar héroes
        </button>
        <button
          onClick={fight}
          disabled={!playerHero || !aiHero}
          className={`px-6 py-2 rounded ${
            playerHero && aiHero
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          } transition`}
        >
          Pelear
        </button>
      </div>

      {result && (
        <p className="mt-6 text-center text-2xl font-bold">{result}</p>
      )}
    </div>
  );
}
