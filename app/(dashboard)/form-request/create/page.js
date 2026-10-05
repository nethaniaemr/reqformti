"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import FormStepIndicator from "@/features/request/components/FormStepIndicator";
import FormStep1 from "@/features/request/components/FormStep1";
import FormStep2 from "@/features/request/components/FormStep2";
import SaveDraft from "@/features/request/components/SaveDraft";
import AttachmentDialog from "@/features/request/components/AttachmentDialog";
import ConfirmSubmitDialog from "@/features/request/components/ConfirmSubmitDialog";
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
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [values, setValues] = useState(EMPTY_VALUES);
  const [selectedThemes, setSelectedThemes] = useState({});
  const [noItmpMatch, setNoItmpMatch] = useState(false);
  const [showSaveDraft, setShowSaveDraft] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);

  const isStep1Valid = Object.values(values).every((v) => v.trim() !== "");

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
    console.log("submit", {
      ...values,
      attachments,
      selectedThemes,
      noItmpMatch,
    });
    setConfirmOpen(false);
    router.push(ROUTES.request);
  };

  return (
    <div className="py-6 px-4 sm:px-8 w-full space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Create Request
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Ajukan permintaan pengembangan aplikasi TI baru
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowSaveDraft(true)}
          className="w-auto shrink-0 font-normal text-gray-900 hover:bg-gray-100 hover:border-gray-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </Button>
      </div>

      <div className="mt-3 md:mt-5">
        <Breadcrumb
          items={[
            { label: "Form Request", href: ROUTES.request },
            { label: "Create" },
          ]}
        />
        <SaveDraft
          open={showSaveDraft}
          onOpenChange={setShowSaveDraft}
          onDiscard={() => {
            setShowSaveDraft(false);
            router.push(ROUTES.request);
          }}
          onSaveDraft={() => {
            console.log("save draft", {
              ...values,
              fileName,
              selectedThemes,
              noItmpMatch,
            });

            setShowSaveDraft(false);
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
