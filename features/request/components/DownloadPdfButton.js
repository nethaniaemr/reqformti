
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadRequestPdf } from "../pdf";

export default function DownloadPdfButton({ item }) {
  const [pdfBusy, setPdfBusy] = useState(false);

  const handleDownload = () => {
    if (pdfBusy) return;

    setPdfBusy(true);

    try {
      downloadRequestPdf(item);
      toast.success("File PDF berhasil diunduh.");
    } catch (err) {
      console.error("Gagal membuat PDF:", err);
      toast.error("Gagal mengunduh PDF. Silakan coba lagi.");
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="h-9 w-full gap-2 rounded-[6px] cursor-pointer"
      disabled={pdfBusy}
      onClick={handleDownload}
    >
      {pdfBusy ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {pdfBusy ? "Membuat PDF..." : "Download PDF"}
    </Button>
  );
}
