import { NextResponse } from "next/server";
import { serverRequest } from "@/lib/serverRequest";

export async function POST(req: Request) {
  const { path, options } = await req.json();
  const data = await serverRequest(path, options);
  return NextResponse.json(data);
}