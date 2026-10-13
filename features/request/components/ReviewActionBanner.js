"use client";

import { CheckCircle2, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewActionBanner({
  title = "Menunggu Review Anda",
  description = "Tinjau detail order di bawah, lalu setujui untuk diteruskan ke approver, minta revisi, atau tolak.",
  onReject,
  onRevision,
  onApprove,
  approveLabel = "Setujui",
}) {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Informasi */}
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            {description}
          </p>
        </div>

        {/* Tombol aksi */}
        <Button
          type="button"
          onClick={onReject}
          className="w-full cursor-pointer bg-rose-50 text-rose-700 hover:bg-red-100 hover:text-rose-800 sm:w-auto"
        >
          <X className=" size-4 shrink-0" />
          Tolak
        </Button>

        <Button
          type="button"
          onClick={onRevision}
          className="w-full cursor-pointer bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 sm:w-auto"
        >
          <Pencil className="size-4 shrink-0" />
          Minta Revisi
        </Button>

        <Button
          type="button"
          onClick={onApprove}
          className="w-full cursor-pointer bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 sm:w-auto"
        >
          <CheckCircle2 className="size-4 shrink-0" />
          {approveLabel}
        </Button>
      </div>
    </div>
  );
}
