const BASE_URL = process.env.BASE_URL;

export async function serverRequest(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
  });
  if (!res.ok) {
    throw new Error("Request failed.");
  }

  return res.json();
}
