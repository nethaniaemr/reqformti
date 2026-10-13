"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const IMAGE_TYPES = ["JPG", "JPEG", "PNG", "GIF", "WEBP"];

export default function AttachmentPreviewDialog({ open, onOpenChange, file }) {
  if (!file) return null;

  const type = file.type?.toUpperCase();
  const isImage = IMAGE_TYPES.includes(type);
  const isPdf = type === "PDF";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base">{file.name}</DialogTitle>
          <DialogDescription>
            {file.type} · pratinjau read-only
          </DialogDescription>
        </DialogHeader>

        {isImage ? (
          <div className="flex items-center justify-center bg-gray-50 border border-gray-100 rounded-md p-6 min-h-[200px]">
            <Image
              src={file.url}
              alt={file.name}
              width={1200}
              height={800}
              className="max-h-[60vh] max-w-full object-contain rounded"
            />
          </div>
        ) : isPdf ? (
          <div className="border border-gray-100 rounded-md overflow-hidden">
            <iframe
              src={file.url}
              title={file.name}
              className="w-full h-[60vh]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-50 border border-gray-100 rounded-md py-16">
            <FileText className="w-10 h-10" />
            <p className="text-sm">
              Pratinjau tidak tersedia untuk tipe file ini.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
