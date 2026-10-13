"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SelectFilter from "@/components/ui/SelectFilter";
import DateFilter from "@/components/ui/DateFilter";
import { STATUS_META } from "@/config/status";
import { JENIS_PENGEMBANGAN_OPTIONS } from "../constants";
import {
  applyExportFilters,
  EMPTY_EXPORT_FILTERS,
  hasActiveExportFilters,
} from "../filters";
import { exportRequestsToExcel } from "../export";

const STATUS_OPTIONS = Object.keys(STATUS_META).map((s) => ({
  value: s,
  label: s,
}));

export default function ExportDialog({ open, onOpenChange, items }) {
  const [exportFilters, setExportFilters] = useState(EMPTY_EXPORT_FILTERS);

  const setField = (key) => (value) =>
    setExportFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

  const matched = applyExportFilters(items, exportFilters);

  const handleExport = () => {
    if (matched.length === 0) {
      toast.error("Tidak ada data yang sesuai dengan filter.");
      return;
    }

    const success = exportRequestsToExcel(matched, "formrequest-export");

    if (success) {
      setTimeout(() => {
        toast.success("File berhasil di-export.");
        handleClose(false);
      }, 1000);
    } else {
      toast.error("Gagal melakukan export file. Silakan coba lagi.");
    }
  };

  const handleClose = (value) => {
    setExportFilters(EMPTY_EXPORT_FILTERS);
    onOpenChange(value);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Export Data Permintaan</DialogTitle>

          <DialogDescription>
            Pilih filter untuk menentukan data yang akan di-export ke Excel.
            Kosongkan semua filter untuk mengexport seluruh data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium tracking-wider text-gray-400">
              Filter
            </p>

            {hasActiveExportFilters(exportFilters) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExportFilters(EMPTY_EXPORT_FILTERS)}
                className="h-auto px-2 py-1 text-gray-500"
              >
                <X className="w-3.5 h-3.5" />
                Reset
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <SelectFilter
              label="Status"
              options={STATUS_OPTIONS}
              value={exportFilters.status}
              onChange={setField("status")}
            />

            <SelectFilter
              label="Jenis Pengembangan"
              options={JENIS_PENGEMBANGAN_OPTIONS}
              value={exportFilters.jenis}
              onChange={setField("jenis")}
              width="w-72"
            />

            <DateFilter
              label="Dari Tanggal"
              value={exportFilters.dateFrom}
              onChange={setField("dateFrom")}
            />

            <DateFilter
              label="Sampai Tanggal"
              value={exportFilters.dateTo}
              onChange={setField("dateTo")}
            />
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 bg-white">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            onClick={handleExport}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
