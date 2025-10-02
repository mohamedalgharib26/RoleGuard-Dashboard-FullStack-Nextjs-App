import prisma from "@/lib/prisma";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { User, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(
  request: Request,
  { params }: Props
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const body: Prisma.UserUpdateInput = await request.json();
    const { id } = params;
    if (!id) throw new Error("ID missing");
    const data = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: Props
): Promise<NextResponse<User | ErrorResponse>> {
  const { id } = params;
  if (!id) throw new Error("ID missing");
  try {
    const data = await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
