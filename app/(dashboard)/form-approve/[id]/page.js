"use client";

import { useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { getMockRequestById } from "@/features/request/data/mock-requests";
import { transitionRequest } from "@/features/request/data/storage";
import TicketInfoCard from "@/features/request/components/TicketInfoCard";
import ProposalCard from "@/features/request/components/ProposalCard";
import AssessmentCard from "@/features/request/components/AssessmentCard";
import AttachmentList from "@/features/request/components/AttachmentList";
import ActivityTimeline from "@/features/request/components/ActivityTimeline";
import ReviewActionBanner from "@/features/request/components/ReviewActionBanner";
import RejectRevisionDialog from "@/features/request/components/RejectRevisionDialog";
import ApproveConfirmDialog from "@/features/request/components/ApproveConfirmDialog";
import { ROUTES } from "@/config/routes";
import DownloadPdfButton from "@/features/request/components/DownloadPdfButton";

export default function ApproveDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const item = getMockRequestById(id);

  const [dialog, setDialog] = useState(null);

  if (!item) return notFound();

  const isPending = item.status === "Menunggu Persetujuan";

  const finish = (status, activityLabel, tone, note) => {
    transitionRequest(item.id, {
      status,
      activityLabel,
      tone,
      note,
      noteField: "approverComment",
    });
    setDialog(null);
    toast.success(`Permintaan berhasil di-${activityLabel.toLowerCase()}`);
    router.push(ROUTES.approve);
  };

  return (
    <div className="py-6 px-4 sm:px-8 w-full space-y-6">
      <PageHeader
        title="Detail Approval"
        description="Tinjau dan berikan persetujuan pada permintaan pengembangan aplikasi"
        breadcrumb={<Breadcrumb detailLabel={item.title} />}
        action={
          <Button
            render={<Link href={ROUTES.approve} />}
            nativeButton={false}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        }
      />

      {isPending && (
        <ReviewActionBanner
          title="Menunggu Persetujuan Anda"
          description="Silahkan tinjau detail permintaan di bawah, kemudian pilih untuk menyetujui atau menolak."
          onReject={() => setDialog("tolak")}
          onRevision={() => setDialog("revisi")}
          onApprove={() => setDialog("setuju")}
          approveLabel="Setujui"
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm divide-y divide-gray-100">
            <TicketInfoCard item={item} />
            <ProposalCard item={item} />
            <AssessmentCard item={item} />
            <AttachmentList files={item.attachments || []} />
          </div>
        </div>

        <div className="w-full lg:w-[280px] lg:shrink-0 space-y-4">
          <DownloadPdfButton item={item} />
          <ActivityTimeline activities={item.activities || []} />
        </div>
      </div>

      <RejectRevisionDialog
        open={dialog === "tolak" || dialog === "revisi"}
        onOpenChange={(open) => !open && setDialog(null)}
        variant={dialog === "revisi" ? "revisi" : "tolak"}
        onSubmit={(note) => {
          if (dialog === "tolak") finish("Ditolak", "Ditolak", "info", note);
          else finish("Perlu Revisi", "Perlu Revisi", "info", note);
        }}
      />

      <ApproveConfirmDialog
        open={dialog === "setuju"}
        onOpenChange={(open) => !open && setDialog(null)}
        title="Setujui permintaan ini?"
        description="Permintaan akan disetujui dan dilanjutkan ke proses pengembangan."
        onConfirm={() => finish("Disetujui", "Order disetujui", "info")}
      />
    </div>
  );
}
