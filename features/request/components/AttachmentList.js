"use client";

import { useState } from "react";
import { FileText, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttachmentPreviewDialog from "./AttachmentPreviewDialog";

export default function AttachmentList({ files = [] }) {
  const [previewFile, setPreviewFile] = useState(null);

  if (files.length === 0) return null;

  return (
    <div className="p-5 sm:p-6 space-y-3">
      <h3 className="text-sm font-bold text-gray-900">Lampiran</h3>

      <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-gray-800 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{file.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => setPreviewFile(file)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                render={<a href={file.url} download={file.name} />}
                nativeButton={false}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AttachmentPreviewDialog
        open={!!previewFile}
        onOpenChange={(open) => !open && setPreviewFile(null)}
        file={previewFile}
      />
    </div>
  );
}