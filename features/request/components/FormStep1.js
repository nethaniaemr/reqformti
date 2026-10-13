import { X, ArrowRight, Plus, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ComboboxField from "@/components/ui/ComboboxField";
import {
  JENIS_PENGEMBANGAN_OPTIONS,
  JENIS_ENHANCEMENT,
  EXISTING_APPLICATIONS,
} from "../constants";

export default function FormStep1({
  values,
  onChange,
  attachments,
  onAddAttachmentClick,
  onRemoveAttachment,
  isValid,
  onCancel,
  onNext,
}) {
  const {
    jenisPengembangan,
    namaAplikasi,
    latarBelakang,
    gambaranUmumText,
    costBenefit,
    risiko,
  } = values;

  const handleSelectJenis = (value) => {
    if (value === jenisPengembangan) return;
    onChange("jenisPengembangan", value);
    onChange("namaAplikasi", "");
  };

  const applicationOptions = EXISTING_APPLICATIONS.map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-md p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Form Permintaan Pengembangan Aplikasi
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ajukan kebutuhan sistem baru atau enhancement sistem eksisting.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Jenis Pengembangan</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-fit max-w-full">
          {JENIS_PENGEMBANGAN_OPTIONS.map((opt) => {
            const isSelected = jenisPengembangan === opt.value;
            return (
              <Label
                key={opt.value}
                htmlFor={opt.value}
                className={`flex items-center gap-3 p-2.5 rounded-sm border cursor-pointer transition-colors font-normal ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Checkbox
                  id={opt.value}
                  checked={isSelected}
                  onCheckedChange={() =>
                    handleSelectJenis(isSelected ? "" : opt.value)
                  }
                />
                <span className="text-sm text-gray-800">{opt.label}</span>
              </Label>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="namaAplikasi">Nama Aplikasi</Label>

        {jenisPengembangan === "" ? (
          <>
            <p className="text-sm text-gray-500">
              Pilih jenis pengembangan terlebih dahulu.
            </p>
            <Input disabled placeholder="" />
          </>
        ) : jenisPengembangan === JENIS_ENHANCEMENT ? (
          <>
            <p className="text-sm text-gray-500">
              Pilih aplikasi eksisting yang akan dikembangkan.
            </p>
            <ComboboxField
              options={applicationOptions}
              value={namaAplikasi}
              onChange={(val) => onChange("namaAplikasi", val)}
              placeholder="Pilih Aplikasi"
            />
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">
              Tuliskan nama sistem baru yang akan dikembangkan.
            </p>
            <div className="relative">
              <Input
                id="namaAplikasi"
                placeholder="Contoh: ETOS (Engineering Task & Order System)"
                value={namaAplikasi}
                onChange={(e) => onChange("namaAplikasi", e.target.value)}
                className="pl-2.5"
              />
            </div>
          </>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="latarBelakang">Latar Belakang</Label>
        <p className="text-sm text-gray-500">
          Jelaskan permasalahan, urgensi operasional, dan dasar perlunya sistem
          aplikasi ini dibuat.
        </p>
        <Textarea
          id="latarBelakang"
          rows={3}
          placeholder="Deskripsikan latar belakang masalah."
          value={latarBelakang}
          onChange={(e) => onChange("latarBelakang", e.target.value)}
          className="text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gambaranUmum">Gambaran Umum / Lingkup Aplikasi </Label>
        <p className="text-sm text-gray-500">
          Jelaskan alur proses utama yang akan dilakukan dalam aplikasi.
        </p>
        <Textarea
          id="gambaranUmum"
          rows={4}
          value={gambaranUmumText}
          onChange={(e) => onChange("gambaranUmumText", e.target.value)}
          placeholder="Jelaskan gambaran umum aplikasi, tujuan pengembangan, dan ruang lingkup proses yang akan ditangani oleh aplikasi."
          className="text-xs"
        />

        <div className="space-y-2">
          {attachments.length > 0 && (
            <ul className="space-y-2">
              {attachments.map((att, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between gap-2 border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate text-gray-700">{att.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveAttachment(idx)}
                    className="text-gray-400 hover:text-rose-500 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddAttachmentClick}
            disabled={attachments.length >= 5}
            className="border-solid w-full justify-center rounded-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Upload Attachment
          </Button>
          {attachments.length >= 5 && (
            <p className="text-xs text-gray-400">Maksimal 5 file.</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="costBenefit">Cost & Benefit</Label>
        <p className="text-sm text-gray-500">
          Jelaskan estimasi biaya serta efisiensi dan manfaat yang diperoleh
          perusahaan.
        </p>
        <Textarea
          id="costBenefit"
          rows={2}
          placeholder="Contoh: Mengurangi durasi verifikasi dokumen manual hingga 40% dan mencegah duplikasi data."
          value={costBenefit}
          onChange={(e) => onChange("costBenefit", e.target.value)}
          className="text-xs"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="risiko">Risiko Jika Aplikasi Tidak Dibuat </Label>
        <p className="text-sm text-gray-500">
          Jelaskan risiko atau dampak yang mungkin terjadi jika aplikasi tidak
          dikembangkan.
        </p>
        <Textarea
          id="risiko"
          rows={2}
          placeholder="Contoh: Keterlambatan respon maintenance plant dan ketidaksesuaian catatan riwayat audit teknis."
          value={risiko}
          onChange={(e) => onChange("risiko", e.target.value)}
          className="text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={onCancel}
          className="text-primary border-primary"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>

        <Button
          disabled={!isValid}
          onClick={onNext}
          className="bg-primary hover:bg-primary/90"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
