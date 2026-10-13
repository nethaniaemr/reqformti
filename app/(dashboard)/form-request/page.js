"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderCode, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/layout/PageHeader";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import PaginationAll from "@/components/ui/PaginationAll";
import { ROUTES } from "@/config/routes";
import { mockRequests } from "@/features/request/data/mock-requests";
import { EMPTY_FILTERS, applyFilters } from "@/features/request/filters";
import RequestCard from "@/features/request/components/RequestCard";
import RequestRow from "@/features/request/components/RequestRow";
import FilterToolbar from "@/features/request/components/FilterToolbar";
import ExportDialog from "@/features/request/components/ExportDialog";

const PAGE_SIZE = 12;

export default function FormRequestPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const handleFiltersChange = (next) => {
    setFilters(next);
    setPage(1);
  };

  const filtered = applyFilters(mockRequests, filters);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="py-6 px-4 sm:px-8 w-full space-y-6">
      <PageHeader
        title="Form Request"
        description="Sistem Permintaan & Pengembangan Aplikasi TI - Ajukan dan kelola permintaan aplikasi TI unit kerja Anda"
        breadcrumb={<Breadcrumb items={[{ label: "Form Request" }]} />}
        action={
          <Button
            render={<Link href={ROUTES.requestCreate} />}
            nativeButton={false}
            className="w-full md:w-auto bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Create Request
          </Button>
        }
      />

      <h3 className="text-base font-semibold text-gray-900 mb-2">
        Your Requests
      </h3>

      <FilterToolbar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExportClick={() => setExportOpen(true)}
        showStatusFilter
      />

      {filtered.length === 0 ? (
        <Empty className="border border-gray-200 rounded-md bg-white py-16 shadow-sm">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="w-12 h-12">
              <FolderCode className="text-gray-500" />
            </EmptyMedia>

            <EmptyTitle>Belum Ada Request</EmptyTitle>

            <EmptyDescription>
              Anda belum mengajukan request aplikasi. Mulai dengan membuat
              request pertama Anda.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button
              render={<Link href={ROUTES.requestCreate} />}
              nativeButton={false}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Create Request
            </Button>
          </EmptyContent>
        </Empty>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paged.map((item) => (
            <RequestCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {paged.map((item) => (
            <RequestRow key={item.id} item={item} />
          ))}
        </div>
      )}

      <PaginationAll
        page={page}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />

      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        items={mockRequests}
      />
    </div>
  );
}
