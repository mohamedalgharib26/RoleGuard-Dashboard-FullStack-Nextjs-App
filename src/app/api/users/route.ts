import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { User, Prisma } from "@prisma/client";
import { ErrorResponse, handleError } from "@/utils/handleError";
import { paginate, PaginationResult } from "@/lib/pagination";

// export async function GET(): Promise<NextResponse<User[]>> {
//   const data: User[] = await prisma.user.findMany();
//   return NextResponse.json<User[]>(data);
// }

export async function GET(
  req: Request
): Promise<NextResponse<PaginationResult<User> | ErrorResponse>> {
  try {
    const data = await paginate<User>(req, prisma.user, {
      withPagination: false,
    });
    return NextResponse.json<PaginationResult<User>>(data);
  } catch (err: unknown) {
    return handleError(err);
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<User | ErrorResponse>> {
  try {
    const body: Prisma.UserCreateInput = await request.json();
    const data = await prisma.user.create({
      data: body,
    });
    return NextResponse.json<User>(data);
  } catch (error: unknown) {
    return handleError(error);
  }
}
