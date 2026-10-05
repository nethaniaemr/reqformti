"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MAX_SIZE_MB = 10;
const MAX_FILES = 5;

export default function AttachmentDialog({
  open,
  onOpenChange,
  existingCount,
  onAdd,
}) {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const remainingSlots = MAX_FILES - existingCount - pending.length;

  const reset = () => {
    setPending([]);
    setError("");
    setIsDragging(false);
  };

  const handleClose = (nextOpen) => {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  const addFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const tooBig = files.find((f) => f.size > MAX_SIZE_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" melebihi ukuran maksimal ${MAX_SIZE_MB}MB.`);
      return;
    }

    if (files.length > remainingSlots) {
      setError(
        `Hanya tersisa ${remainingSlots} slot file. Pilih lebih sedikit file.`,
      );
      return;
    }

    setError("");
    setPending((prev) => [
      ...prev,
      ...files.map((file) => ({ title: file.name, file })),
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleRemovePending = (idx) => {
    setPending((prev) => prev.filter((_, i) => i !== idx));
    setError("");
  };

  const handleSave = () => {
    if (pending.length === 0) {
      setError("Pilih minimal satu file.");
      return;
    }
    onAdd(pending);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Attachment</DialogTitle>
          <DialogDescription>
            Pilih atau seret beberapa file sekaligus. Maksimal {MAX_FILES} file
            secara keseluruhan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {pending.length > 0 && (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {pending.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-2 border border-gray-200 rounded-md px-3 py-2.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(item.file.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePending(idx)}
                    className="p-2 rounded-sm shrink-0 cursor-pointer hover:bg-red-50 transition-colors"
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {remainingSlots > 0 && (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center gap-2 border border-dashed rounded-md p-6 cursor-pointer text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <ImagePlus className="w-6 h-6 text-gray-400" />
              <p className="text-sm text-gray-500">
                Klik atau seret file ke sini
              </p>
              <p className="text-xs text-gray-400">
                Format file: gambar, PDF, atau dokumen. Maks {MAX_SIZE_MB}MB per
                file. Sisa slot: {remainingSlots}.
              </p>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => addFiles(e.target.files)}
          />
          {error && <p className="text-xs text-rose-500">{error}</p>}
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={pending.length === 0}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
