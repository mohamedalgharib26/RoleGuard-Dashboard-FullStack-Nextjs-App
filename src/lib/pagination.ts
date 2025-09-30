/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PaginationResult<T> {
  data: T[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PaginationArgs {
  pageNumber?: number;
  limit?: number;
  orderBy?: Record<string, any>;
}
interface PaginateOptions {
  args?: PaginationArgs;
  include?: Record<string, any>;
  withPagination?: boolean;
}

export async function paginate<T>(
  req: Request,
  model: any,
  options: PaginateOptions = {}
): Promise<PaginationResult<T>> {
  const { args = {}, include, withPagination = true } = options;
  const { limit = 10, pageNumber = 1, orderBy } = args;

  //Without Pagination
  if (!withPagination) {
    const data = await model.findMany({
      orderBy,
      ...(include ? { include } : {}),
    });
    return {
      data,
      pagination: undefined,
    };
  }
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || pageNumber;
  const pageSize = Number(url.searchParams.get("pageSize")) || limit;
  const skip = (page - 1) * pageSize;

  const count = await model.count();
  const data = await model.findMany({
    skip,
    take: pageSize,
    orderBy,
    ...(include ? { include } : {}),
  });

  const totalPages = Math.ceil(count / pageSize);

  return {
    data,
    pagination: {
      limit: pageSize,
      page,
      total: count,
      totalPages,
    },
  };
}
