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

export default function SaveDraftDialog({
  open,
  onOpenChange,
  onDiscard,
  onSaveDraft,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Simpan sebagai draft?</DialogTitle>

          <DialogDescription>
            Anda telah melakukan perubahan pada form. Apakah Anda ingin
            menyimpan perubahan sebagai draft agar dapat dilanjutkan nanti?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2 bg-white">
          <Button
            variant="outline"
            onClick={onDiscard}
            className="w-full sm:w-auto"
          >
            Discard
          </Button>

          <Button
            onClick={onSaveDraft}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            Save Draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
