"use client";

export async function clientRequest(path: string, options?: RequestInit) {
  const res = await fetch("/api/proxy", {
    method: "POST",
    body: JSON.stringify({ path, options }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Client request failed.");
  return res.json();
}
