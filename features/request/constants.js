export const JENIS_APLIKASI_BARU = "Aplikasi Baru";
export const JENIS_ENHANCEMENT = "Enhancement Aplikasi Eksisting";

export const JENIS_PENGEMBANGAN_OPTIONS = [
  { value: JENIS_APLIKASI_BARU, label: "Aplikasi Baru" },
  { value: JENIS_ENHANCEMENT, label: "Enhancement Aplikasi Eksisting" },
];

// daftar apk eksisting sementara
export const EXISTING_APPLICATIONS = [
  "ETOS (Engineering Task & Order System)",
  "BIOS (Barang Inventaris & Office Supplies)",
  "Toolbox",
  "Digital Asset (e-BIOS)",
  "Nutriku",
];

// tema ITMP 
export const ITMP_PILARS = [
  {
    id: 1,
    name: "Cost Leadership",
    items: [
      "Pengembangan Single Platform Pengadaan",
      "Pengembangan Sistem Perencanaan dan Analisis Harga Jual",
      "Pengembangan Material Management System",
      "Pengembangan Enterprise Project Management System",
      "Pengembangan Asset Performance Management",
      "Pengembangan Sales & Operation Planning",
      "Pengembangan Plant Maintenance System",
      "Pengembangan Single Platform Keuangan",
      "Pengembangan (Smart Production/Manufacturing 4.0)",
      "Pengembangan Sistem Logistik Terintegrasi",
      "Pengembangan Production Analytics Center",
      "Pengembangan Invoice Management",
      "Pengembangan Vessel Fleet Management",
      "Pengembangan EPC Excellence",
    ],
  },
  {
    id: 2,
    name: "New Revenue",
    items: [
      "Pengembangan Single Platform Penjualan",
      "Pengembangan Sistem Research and Development Support",
      "Pengembangan Sistem Trading Management System (TMS)",
      "Pengembangan Agriculture Geospasial",
      "Implementasi Precision Agriculture",
      "Pengembangan Sistem Operation & Maintenance",
      "Pengembangan Ekosistem Digital untuk Penyaluran Pupuk dan Layanan Pelanggan",
    ],
  },
  {
    id: 3,
    name: "World Class Company",
    items: [
      "Pengembangan Sistem K3 Terintegrasi",
      "Pengembangan Single Platform Governance, Risk & Compliance (GRC)",
      "Pengembangan Sistem Pengelolaan TJSL PI Grup Terintegrasi",
      "Pengembangan Portal TI",
      "Pengembangan ERP SAP PI Group",
      "Pengembangan IT Service Management",
      "Pengembangan ERP Small Enterprise",
      "Pengembangan Sistem Manajemen Kearsipan & Dokumen",
      "Pengembangan Asset Property Management",
      "Pengembangan Artificial Intelligence & Machine Learning",
      "Pengembangan Single Platform Corporate Service",
      "Pengembangan Sistem Carbon Accounting & Emission Management",
      "Pengembangan Single Platform Human Experience Management",
    ],
  },
];

export function getDiagramLines(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 0);
}

export const DEFAULT_REVIEWER = {
  name: "Ali Muharom",
  role: "AVP",
  badge: "12121212"
};

export const DEFAULT_APPROVER = {
  name: "Natasha Lestari",
  role: "Manager (Atasan)",
  badge: "22225555"
};