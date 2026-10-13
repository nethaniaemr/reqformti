"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X, Pencil, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CancelRequestDialog from "./CancelRequestDialog";
import { ROUTES } from "@/config/routes";
import DownloadPdfButton from "./DownloadPdfButton";

const CANCELABLE_STATUSES = [
  "Menunggu Review",
  "Menunggu Persetujuan",
  "Perlu Revisi",
];

<DownloadPdfButton item={item} />

export default function RequestActions({ item }) {
  const router = useRouter();
  const [cancelOpen, setCancelOpen] = useState(false);

  const isRevision = item.status === "Perlu Revisi";
  const canCancel = CANCELABLE_STATUSES.includes(item.status);

  const handleCancel = () => {
    setCancelOpen(false);
    toast.success("Permintaan dibatalkan");
    router.push(ROUTES.request);
  };

  const handleResubmit = () => {
    toast.success("Permintaan berhasil dikirim ulang untuk direview");
    router.push(ROUTES.request);
  };

  return (
    <>
      <div className="space-y-3">
        <DownloadPdfButton item={item} />

        {isRevision && (
          <>
            <div className="rounded-sm border border-red-200 bg-red-50 p-3">
              <p className="mb-1 text-xs font-medium text-red-700">
                Catatan Reviewer
              </p>
              <p className="whitespace-pre-wrap text-xs text-red-600">
                {item.reviewerComment || "Belum ada catatan reviewer."}
              </p>
            </div>

            <Button
              render={<Link href={`${ROUTES.requestCreate}?edit=${item.id}`} />}
              nativeButton={false}
              variant="outline"
              className="w-full cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Button>

            <Button
              onClick={handleResubmit}
              className="w-full cursor-pointer bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
            >
              <Send className="w-4 h-4" />
              Submit Ulang
            </Button>
          </>
        )}

        {canCancel && (
          <Button
            onClick={() => setCancelOpen(true)}
            className="w-full cursor-pointer bg-rose-50 text-rose-500 hover:bg-rose-100"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        )}
      </div>

      <CancelRequestDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        onConfirm={handleCancel}
      />
    </>
  );
}
