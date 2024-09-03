import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json({ error: "Store id is required" }, { status: 400 });
    }

    // Parse and validate the request body
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required and must be a string" }, { status: 400 });
    }

    // Update the store with the new name
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    if (store.count === 0) {
      return NextResponse.json({ error: "Store not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.error("[STORE_PATCH]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!params.storeId) {
      return NextResponse.json({ error: "Store id is required" }, { status: 400 });
    }

    // Delete the store based on storeId and userId
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (store.count === 0) {
      return NextResponse.json({ error: "Store not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Store deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("[STORE_DELETE]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}