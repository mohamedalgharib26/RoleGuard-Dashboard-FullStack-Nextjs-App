import { PaginationResult } from "@/lib/pagination";
import React, { ReactNode } from "react";

// الحالة الأولى: مع Pagination
type WithPaginationProps<T> = {
  withPagination: true;
  items: PaginationResult<T>;
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
  children: ReactNode;
};

type WithoutPaginationProps<T> = {
  withPagination?: false;
  items: { data: T[] };
  children: ReactNode;
};

type Props<T> = WithPaginationProps<T> | WithoutPaginationProps<T>;

function Pagination<T>(props: Props<T>) {
  if (props.withPagination) {
    const { items, totalPages, page, onPageChange, children } = props;
    return (
      <>
        {children}
        <div className="flex mt-4 flex-1 justify-center items-center ">
          {page != 1 && (
            <button
              className="bg-yellow-400 text-black px-3 py-1 rounded mx-4 hover:bg-yellow-600 cursor-pointer disabled:opacity-40"
              onClick={() => onPageChange(page - 1)}
            >
              Prev
            </button>
          )}
          {page < totalPages && (
            <button
              className="bg-green-600 text-white disabled:opacity-40 px-3 py-1 rounded mx-4 hover:bg-green-800 cursor-pointer"
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </button>
          )}
        </div>
      </>
    );
  }

  return <>{props.children}</>;
}

export default Pagination;
