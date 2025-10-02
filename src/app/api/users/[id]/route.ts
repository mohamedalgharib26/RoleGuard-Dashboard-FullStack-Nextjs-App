// src/app/api/users/[id]/route.ts

import prisma from "@/lib/prisma";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { User, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// ✅ Get User by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const { id } = await context.params; // ✅ لازم await
    if (!id) throw new Error("ID missing");

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    return handleError(error);
  }
}

// ✅ Update User by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const { id } = await context.params; // ✅ await
    if (!id) throw new Error("ID missing");

    const body: Prisma.UserUpdateInput = await request.json();

    const data = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}

// ✅ Delete User by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const { id } = await context.params; // ✅ await
    if (!id) throw new Error("ID missing");

    const data = await prisma.user.delete({ where: { id } });

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
