"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Frontend + Backend</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Backend says:{" "}
          <span className="font-mono font-bold text-black dark:text-white">
            {message || "Loading..."}
          </span>
        </p>
      </main>
    </div>
  );
}
