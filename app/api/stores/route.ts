import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Authenticate user
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { name } = body;

    // Validate input
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }

    // Create a new store in the database
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("[STORES_POST]", error);
    // Return a general error for unexpected errors
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}