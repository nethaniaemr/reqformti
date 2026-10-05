import { Checkbox } from "@/components/ui/checkbox";
import DetailField from "./DetailField";
import { JENIS_PENGEMBANGAN_OPTIONS } from "../constants";

export default function ProposalCard({ item }) {
  const [pilar, ...program] = (item.theme || "").split("\n");

  return (
    <div>
      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Detail Pekerjaan
        </h3>
      </div>

      <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-5 text-sm">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 block">
            Jenis Pengembangan
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-fit max-w-full">
            {JENIS_PENGEMBANGAN_OPTIONS.map((opt) => {
              const isSelected = item.category === opt.value;

              return (
                <div
                  key={opt.value}
                  className={`flex items-center gap-3 p-2.5 rounded-sm border font-normal ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200"
                  }`}
                >
                  <Checkbox checked={isSelected} disabled />

                  <span className="text-sm text-gray-800">
                    {opt.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <DetailField
          label="Nama Usulan Aplikasi"
          value={item.title}
          valueClassName="font-semibold text-gray-900"
        />

        <DetailField
          label="Latar Belakang / Permasalahan"
          value={item.latarBelakang}
          valueClassName="text-gray-900"
        />

        <DetailField
          label="Cost & Benefit"
          value={item.costBenefit}
          valueClassName="text-gray-900"
        />

        <DetailField
          label="Risiko Jika Tidak Dibuat"
          value={item.risiko}
          valueClassName="text-gray-900"
        />

        {pilar && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 block">
              Tema IT Master Plan PI Grup 2025 - 2029 Yang Dipilih
            </label>

            <div className="p-3.5 bg-gray-50 rounded text-sm space-y-1">
              <div className="font-bold text-primary text-xs">
                {pilar}
              </div>

              {program.map((name) => (
                <div key={name} className="text-gray-700 font-medium">
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}