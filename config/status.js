export const STATUS_META = {
  "Draft": "bg-gray-100 text-gray-600 border-gray-200",
  "Menunggu Review": "bg-amber-50 text-amber-700 border-amber-200",
  "Menunggu Persetujuan": "bg-amber-50 text-amber-700 border-amber-200",
  "Perlu Revisi": "bg-rose-50 text-rose-800 border-rose-200",
  "Disetujui": "bg-blue-50 text-blue-600 border-blue-200",
  "Diproses": "bg-cyan-50 text-cyan-600 border-cyan-200",
  "Selesai": "bg-green-50 text-green-700 border-green-200",
  "Ditolak": "bg-red-50 text-red-600 border-red-200",
  "Dibatalkan": "bg-gray-100 text-gray-500 border-gray-300",
};

export function getStatusClass(status) {
  return STATUS_META[status] || "bg-gray-50 text-gray-600 border-gray-200";
}