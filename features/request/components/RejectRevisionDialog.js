"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function RejectRevisionDialog({
  open,
  onOpenChange,
  variant = "tolak",
  onSubmit,
  item,
}) {
  const [note, setNote] = useState("");

  const isRevision = variant === "revisi";

  const title = isRevision ? "Minta Revisi Permintaan?" : "Tolak Review";

  const description = isRevision
    ? "Tuliskan catatan perbaikan yang perlu dilakukan oleh pemohon."
    : `Request Order #${item.id}`;

  const handleSubmit = () => {
    const trimmedNote = note.trim();

    if (!trimmedNote) return;

    onSubmit(trimmedNote);
    setNote("");
  };

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) setNote("");
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="review-note"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Alasan Penolakan
          </label>

          <Textarea
            id="review-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={
              isRevision
                ? "Tuliskan bagian yang perlu diperbaiki..."
                : "Tuliskan alasan penolakan..."
            }
            rows={4}
            className="resize-none"
          />
        </div>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!note.trim()}
            className={`w-full cursor-pointer sm:w-auto ${
              isRevision
                ? ""
                : "bg-rose-50 text-rose-700 hover:bg-red-100 hover:text-rose-800 disabled:opacity-100"
            }`}
          >
            {isRevision ? "Kirim Revisi" : "Tolak"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
