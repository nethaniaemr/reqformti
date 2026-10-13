"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import FormStepIndicator from "@/features/request/components/FormStepIndicator";
import FormStep1 from "@/features/request/components/FormStep1";
import FormStep2 from "@/features/request/components/FormStep2";
import SaveDraft from "@/features/request/components/SaveDraft";
import AttachmentDialog from "@/features/request/components/AttachmentDialog";
import ConfirmSubmitDialog from "@/features/request/components/ConfirmSubmitDialog";
import { getMockRequestById } from "@/features/request/data/mock-requests";
import { ROUTES } from "@/config/routes";

const EMPTY_VALUES = {
  jenisPengembangan: "",
  namaAplikasi: "",
  latarBelakang: "",
  gambaranUmumText: "",
  costBenefit: "",
  risiko: "",
};

export default function CreateRequestPage() {
  return (
    <Suspense fallback={null}>
      <CreateRequestForm />
    </Suspense>
  );
}

function CreateRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = Boolean(editId);

  const existingItem = editId ? getMockRequestById(editId) : null;

  const [step, setStep] = useState(1);
  const [values, setValues] = useState(() => {
    if (!existingItem) return EMPTY_VALUES;
    return {
      jenisPengembangan: existingItem.category || "",
      namaAplikasi: existingItem.title || "",
      latarBelakang: existingItem.latarBelakang || "",
      gambaranUmumText: existingItem.gambaranUmum || "",
      costBenefit: existingItem.costBenefit || "",
      risiko: existingItem.risiko || "",
    };
  });
  const [selectedThemes, setSelectedThemes] = useState(() => {
    if (!existingItem?.theme) return {};
    const [, ...programs] = existingItem.theme.split("\n");
    return Object.fromEntries(programs.map((p) => [p, true]));
  });
  const [noItmpMatch, setNoItmpMatch] = useState(() => {
    if (!existingItem) return false;
    return !existingItem.theme;
  });
  const [showSaveDraft, setShowSaveDraft] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const isStep1Valid = Object.values(values).every((v) => v.trim() !== "");

  const hasChanges =
    Object.values(values).some((value) => value.trim() !== "") ||
    attachments.length > 0 ||
    Object.keys(selectedThemes).some((key) => selectedThemes[key]) ||
    noItmpMatch;

  const handleBack = () => {
    if (hasChanges) {
      setShowSaveDraft(true);
      return;
    }
    router.push(ROUTES.request);
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAttachment = (newItems) => {
    setAttachments((prev) => [...prev, ...newItems]);
  };

  const handleRemoveAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleToggleTheme = (themeName) => {
    if (noItmpMatch) return;
    setSelectedThemes((prev) => ({ ...prev, [themeName]: !prev[themeName] }));
  };

  const handleToggleNoMatch = (checked) => {
    setNoItmpMatch(checked);
    if (checked) setSelectedThemes({});
  };

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleConfirmSubmit = () => {
    console.log(isEditMode ? "update" : "submit", {
      editId,
      ...values,
      attachments,
      selectedThemes,
      noItmpMatch,
    });
    setConfirmOpen(false);
    toast.success(
      isEditMode ? "Perubahan berhasil disimpan!" : "Request berhasil dibuat!",
    );
    router.push(ROUTES.request);
  };

  return (
    <div className="py-6 px-4 sm:px-8 w-full space-y-6">
      <PageHeader
        title={isEditMode ? "Edit Request" : "Create Request"}
        description={
          isEditMode
            ? "Perbaiki data permintaan sesuai catatan reviewer"
            : "Ajukan permintaan pengembangan aplikasi TI baru"
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Form Request", href: ROUTES.request },
              {
                label: isEditMode
                  ? existingItem?.title || "Edit Request"
                  : "Create Request",
              },
            ]}
          />
        }
        action={
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-full md:w-auto font-normal text-gray-900 hover:bg-gray-100 hover:border-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Button>
        }
      />

      <div className="mt-3 md:mt-4">
        <SaveDraft
          open={showSaveDraft}
          onOpenChange={setShowSaveDraft}
          onDiscard={() => {
            setShowSaveDraft(false);
            router.push(ROUTES.request);
          }}
          onSaveDraft={() => {
            console.log("save draft", {
              editId,
              ...values,
              attachments,
              selectedThemes,
              noItmpMatch,
            });
            setShowSaveDraft(false);
            toast.success("Request disimpan sebagai Draft.");
            router.push(ROUTES.request);
          }}
        />
      </div>

      <FormStepIndicator currentStep={step} />

      {step === 1 ? (
        <FormStep1
          values={values}
          onChange={handleChange}
          attachments={attachments}
          onAddAttachmentClick={() => setAttachmentDialogOpen(true)}
          onRemoveAttachment={handleRemoveAttachment}
          isValid={isStep1Valid}
          onCancel={() => router.push(ROUTES.request)}
          onNext={() => setStep(2)}
        />
      ) : (
        <FormStep2
          selectedThemes={selectedThemes}
          onToggleTheme={handleToggleTheme}
          noItmpMatch={noItmpMatch}
          onToggleNoMatch={handleToggleNoMatch}
          onBack={() => setStep(1)}
          onSubmit={handleOpenConfirm}
        />
      )}
      <ConfirmSubmitDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmSubmit}
      />
      <AttachmentDialog
        open={attachmentDialogOpen}
        onOpenChange={setAttachmentDialogOpen}
        existingCount={attachments.length}
        onAdd={handleAddAttachment}
      />
    </div>
  );
}
