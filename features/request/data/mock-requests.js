export const mockRequests = [
  {
    id: "202600017",
    status: "Perlu Revisi",
    title: "Databes Portofolio Bisnis PT Pupuk Kujang",
    category: "Aplikasi Baru",
    name: "Yuki Kusuma",
    badge: "12345678",
    profilePic: "null",
    dept: "Departemen Portofolio Bisnis",
    date: "2026-09-21",
    latarBelakang:
      "Dept. Portofolio Bisnis melakukan pengelolaan terhadap 2 anak perusahaan dan 7 perusahaan patungan yang salah satu kegiatan rutinnya yaitu melakukan rekapitulasi laporan dari 9 entitas setiap bulannya.",
    costBenefit:
      "Dept PB mendapatkan output sesuai kebutuhan tanpa melakukan entry data manual di excel.",
    risiko: "Database tidak update dan risiko keterlambatan penyampaian laporan.",
    theme: "COST LEADERSHIP\nLearning Development Management System (LDSM)",
    gambaranUmum:
      "1. Entitas entry data keuangan dan operasional\n2. Data masuk sebagai database\n3. Dept PB menarik data sesuai kebutuhan dan format tertentu\n4. Dept PB dapat menarik data series",
  },
  {
    id: "202600018",
    status: "Ditolak",
    title: "Enhancement Modul Plant Maintenance",
    category: "Enhancement Aplikasi Eksisting",
    name: "Ni Putu Kusuma",
    badge: "11223344",
    dept: "Departemen Plant Maintenance",
    date: "2026-05-20",
    latarBelakang: "Perlunya penambahan fitur pelaporan otomatis pada modul plant maintenance.",
    costBenefit: "Mempercepat proses pelaporan teknis lapangan.",
    risiko: "Keterlambatan penanganan maintenance mesin.",
    theme: "COST LEADERSHIP\nPengembangan Plant Maintenance System",
    gambaranUmum:
      "1. Teknisi melakukan input laporan harian\n2. Sistem merekap data kerusakan mesin\n3. Supervisor memvalidasi laporan",
  },
  {
    id: "202600019",
    status: "Disetujui",
    title: "Sistem Monitoring Emisi & Limbah",
    category: "Aplikasi Baru",
    name: "Steven Kuri",
    badge: "12233445",
    dept: "Departemen Lingkungan Hidup",
    date: "2026-05-20",
    latarBelakang: "Kepatuhan terhadap regulasi lingkungan terkait pemantauan emisi gas buang.",
    costBenefit: "Menghindari denda lingkungan dan memantau emisi secara real-time.",
    risiko: "Sanksi hukum dan pencemaran lingkungan tak terpantau.",
    theme: "WORLD CLASS COMPANY\nPengembangan Sistem K3 Terintegrasi",
    gambaranUmum:
      "1. Sensor IoT mengirim data emisi\n2. Dashboard menampilkan grafik real-time\n3. Notifikasi otomatis jika melebihi ambang batas",
  },
];

export function getMockRequestById(id) {
  return mockRequests.find((item) => item.id === id) || null;
}