"use client";

import { useState } from "react";
import { FolderCode } from "lucide-react";
import { ROUTES } from "@/config/routes"; 
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/layout/PageHeader";
import FilterToolbar from "@/features/request/components/FilterToolbar";
import RequestCard from "@/features/request/components/RequestCard";
import RequestRow from "@/features/request/components/RequestRow";
import PaginationAll from "@/components/ui/PaginationAll";
import { mockRequests } from "@/features/request/data/mock-requests";
import { EMPTY_FILTERS, applyFilters } from "@/features/request/filters";
import ExportDialog from "@/features/request/components/ExportDialog";

const PAGE_SIZE = 12;

export default function FormApprovewPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("queue");

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
        title="Form Approve"
        description="Approver Dashboard untuk Permintaan Pengembangan Aplikasi TI - Tinjau dan berikan persetujuan pada permintaan pengembangan aplikasi"
        breadcrumb={<Breadcrumb items={[{ label: "Form Approve" }]} />}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="queue">Antrian</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
        </TabsList>
      </Tabs>

      <h3 className="text-base font-semibold text-gray-900 mb-3">
        {activeTab === "queue"
          ? "Antrian Persetujuan Saya"
          : "Riwayat Persetujuan Saya"}
      </h3>

      <FilterToolbar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onExportClick={() => setExportOpen(true)}
        showStatusFilter={activeTab === "history"}
      />

      {filtered.length === 0 ? (
        <Empty className="border border-gray-200 rounded-md bg-white py-16 shadow-sm">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="w-12 h-12">
              <FolderCode className="text-gray-500" />
            </EmptyMedia>

            <EmptyTitle>Tidak Ada Antrian Persetujuan</EmptyTitle>

            <EmptyDescription>
              Belum ada request yang menunggu persetujuan Anda. Request yang
              sudah direview akan muncul disini jikaa Anda ditugaskan sebagai
              Approver.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paged.map((item) => (
            <RequestCard key={item.id} item={item} basePath={ROUTES.approve} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {paged.map((item) => (
            <RequestRow key={item.id} item={item} basePath={ROUTES.approve} />
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
