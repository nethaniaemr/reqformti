"use client";

import { Search, LayoutGrid, List, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectFilter from "@/components/ui/SelectFilter";
import DateFilter from "@/components/ui/DateFilter";
import { STATUS_META } from "@/config/status";
import { JENIS_PENGEMBANGAN_OPTIONS } from "../constants";
import { EMPTY_FILTERS, hasActiveFilters } from "../filters";

const STATUS_OPTIONS = Object.keys(STATUS_META).map((s) => ({
  value: s,
  label: s,
}));

export default function FilterToolbar({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  onExportClick,
  showStatusFilter,
  hideExport = false,
}) {
  const setField = (key) => (value) =>
    onFiltersChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setField("search")(e.target.value)}
            className="pl-9"
          />
        </div>

        <DateFilter
          label="Tanggal Inisiasi"
          from={filters.dateFrom}
          to={filters.dateTo}
          onChange={({ from, to }) =>
            onFiltersChange({
              ...filters,
              dateFrom: from,
              dateTo: to,
            })
          }
        />

        {showStatusFilter && (
          <SelectFilter
            label="Status"
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={setField("status")}
          />
        )}

        <SelectFilter
          label="Jenis Pengembangan"
          options={JENIS_PENGEMBANGAN_OPTIONS}
          value={filters.jenis}
          onChange={setField("jenis")}
          width="w-72"
        />

        {hasActiveFilters(filters) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(EMPTY_FILTERS)}
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <div className="flex items-center border border-gray-200 rounded-md p-1 bg-white h-9">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        {!hideExport && (
          <Button variant="outline" onClick={onExportClick}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        )}
      </div>
    </div>
  );
}
