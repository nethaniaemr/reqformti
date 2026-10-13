"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Download, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/layout/PageHeader";
import { ROUTES } from "@/config/routes";
import { getMockRequestById } from "@/features/request/data/mock-requests";
import TicketInfoCard from "@/features/request/components/TicketInfoCard";
import ProposalCard from "@/features/request/components/ProposalCard";
import AssessmentCard from "@/features/request/components/AssessmentCard";
import AttachmentList from "@/features/request/components/AttachmentList";
import RequestActions from "@/features/request/components/RequestActions";
import ActivityTimeline from "@/features/request/components/ActivityTimeline";

export default function RequestDetailPage() {
  const { id } = useParams();

  const item = getMockRequestById(id);

  if (!item) return notFound();

  return (
    <div className="py-6 px-4 sm:px-8 w-full space-y-6">
      <PageHeader
        title="Detail Request"
        description="Lihat informasi lengkap dan status permintaan pengembangan aplikasi TI"
        breadcrumb={<Breadcrumb detailLabel={item.title} />}
        action={
          <Button
            render={<Link href={ROUTES.request} />}
            nativeButton={false}
            variant="outline"
            className="w-full md:w-auto font-normal text-gray-900 hover:bg-gray-100 hover:border-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm divide-y divide-gray-300">
            <TicketInfoCard item={item} />
            <ProposalCard item={item} />
            <AssessmentCard item={item} />
            <AttachmentList files={item.attachments || []} />
          </div>
        </div>

        <div className="w-full lg:w-[300px] lg:shrink-0 space-y-4">
          <RequestActions item={item} />
          <ActivityTimeline activities={item.activities || []} />
        </div>
      </div>
    </div>
  );
}
