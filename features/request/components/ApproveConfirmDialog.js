"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ApproveConfirmDialog({
  open,
  onOpenChange,
  title = "Setujui permintaan ini?",
  description = "Permintaan akan disetujui dan dilanjutkan ke proses pengembangan.",
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto"
          >
            Setujui Permintaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
