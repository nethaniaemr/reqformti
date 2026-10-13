"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export default function PaginationAll({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalItems === 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const goTo = (p) => {
    onPageChange(Math.min(Math.max(p, 1), totalPages));
  };

  return (
    <div className="flex items-center justify-end gap-2 pt-4 text-xs sm:text-sm text-gray-400">
      <span className="text-xs sm:text-sm text-center sm:text-left">
        Showing {start}-{end} of {totalItems}
      </span>

      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent className="gap-1">
          {/* First Page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => page > 1 && goTo(1)}
              className={`h-8 w-8 p-0 flex text-gray-900 items-center justify-center rounded-md border border-gray-300 cursor-pointer ${
                page === 1
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            >
              <ChevronsLeft className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Previous */}
          <PaginationItem>
            <PaginationLink
              onClick={() => page > 1 && goTo(page - 1)}
              className={`h-8 w-8 p-0 flex text-gray-900 items-center justify-center rounded-md ${
                page === 1
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Current Page */}
          <PaginationItem>
            <PaginationLink
              isActive
              className="h-8 min-w-8 px-2 text-sm text-gray-700 rounded-md pointer-events-none"
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* Next */}
          <PaginationItem>
            <PaginationLink
              onClick={() => page < totalPages && goTo(page + 1)}
              className={`h-8 w-8 p-0 text-gray-900 flex items-center justify-center rounded-md ${
                page === totalPages
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>

          {/* Last Page */}
          <PaginationItem>
            <PaginationLink
              onClick={() => page < totalPages && goTo(totalPages)}
              className={`h-8 w-8 p-0 flex text-gray-900 items-center justify-center rounded-md border border-gray-300 cursor-pointer ${
                page === totalPages
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            >
              <ChevronsRight className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}