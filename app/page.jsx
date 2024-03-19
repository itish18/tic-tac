"use client";

import { TicTacToe } from "@/components/tic-tac-toe";

export default function Home() {
  return (
    <div className="max-w-[60%] mx-auto space-y-20 pt-20 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Tic-Tac-Toe</h1>
      <TicTacToe />
    </div>
  );
}
