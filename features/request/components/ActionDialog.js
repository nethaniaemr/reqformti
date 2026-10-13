
"use client";

import { useState } from "react";
import {
  XCircle,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

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

const ACTION_CONFIG = {
  tolak: {
    title: "Tolak Review",
    description: (item) => `Request Order #${item?.id ?? ""}`,
    fieldLabel: "Alasan Penolakan",
    placeholder: "Tuliskan alasan penolakan...",
    buttonLabel: "Tolak",
    Icon: XCircle,
    buttonClass:
      "bg-rose-50 text-rose-700 hover:bg-red-100 hover:text-rose-800 disabled:opacity-100",
    requiresNote: true,
  },
  revisi: {
    title: "Minta Revisi Permintaan?",
    description: () =>
      "Tuliskan catatan perbaikan yang perlu dilakukan oleh pemohon.",
    fieldLabel: "Catatan Revisi (Wajib)",
    placeholder: "Tuliskan catatan revisi yang perlu diperbaiki...",
    buttonLabel: "Kirim Revisi",
    Icon: MessageSquare,
    buttonClass: "",
    requiresNote: true,
  },
  setuju: {
    title: "Setujui permintaan ini?",
    description: () =>
      "Permintaan akan disetujui dan dilanjutkan ke proses berikutnya.",
    buttonLabel: "Setujui",
    Icon: CheckCircle2,
    buttonClass:
      "bg-green-600 text-white hover:bg-green-700",
    requiresNote: false,
  },
};

export default function RequestActionDialog({
  open,
  onOpenChange,
  variant = "tolak",
  item,
  onSubmit,
  onConfirm,
}) {
  const [note, setNote] = useState("");

  const config = ACTION_CONFIG[variant] ?? ACTION_CONFIG.tolak;
  const {
    title,
    description,
    fieldLabel,
    placeholder,
    buttonLabel,
    Icon,
    buttonClass,
    requiresNote,
  } = config;

  const handleOpenChange = (nextOpen) => {
    if (!nextOpen) setNote("");
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    const trimmedNote = note.trim();

    if (requiresNote && !trimmedNote) return;

    if (variant === "setuju") {
      onConfirm?.();
    } else {
      onSubmit?.(trimmedNote);
    }

    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description(item)}
          </DialogDescription>
        </DialogHeader>

        {requiresNote && (
          <div className="space-y-2">
            <label
              htmlFor="request-action-note"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              {fieldLabel}
            </label>

            <Textarea
              id="request-action-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={placeholder}
              rows={4}
              className="resize-none"
            />
          </div>
        )}

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="w-full cursor-pointer sm:w-auto"
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={requiresNote && !note.trim()}
            className={`w-full cursor-pointer gap-2 sm:w-auto ${buttonClass}`}
          >
            <Icon className="size-4 shrink-0" />
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
