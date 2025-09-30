import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Users, Prisma } from "@prisma/client";
import { ErrorResponse, handleError } from "@/utils/handleError";

export async function GET(): Promise<NextResponse<Users[]>> {
  const data: Users[] = await prisma.users.findMany();
  return NextResponse.json<Users[]>(data);
}

export async function POST(
  request: Request
): Promise<NextResponse<Users | ErrorResponse>> {
  try {
    const body: Prisma.UsersCreateInput = await request.json();
    const data = await prisma.users.create({
      data: body,
    });
    return NextResponse.json<Users>(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
