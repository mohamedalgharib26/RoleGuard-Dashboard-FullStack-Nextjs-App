import prisma from "@/lib/prisma";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { Users, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PUT(
  request: Request,
  { params }: Props
): Promise<NextResponse<Users | ErrorResponse>> {
  try {
    const body: Prisma.UsersUpdateInput = await request.json();
    const { id } = params;
    if (!id) throw new Error("ID missing");
    const data = await prisma.users.update({
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
): Promise<NextResponse<Users | ErrorResponse>> {
  const { id } = params;
  if (!id) throw new Error("ID missing");
  try {
    const data = await prisma.users.delete({
      where: { id },
    });
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
