export const mockRequests = [
  {
    id: "31",
    ticketNumber: "202600019",
    status: "Perlu Revisi",
    title: "Database Portofolio Bisnis PT Pupuk Kujang",
    category: "Aplikasi Baru",
    name: "Yuki Kusuma",
    badge: "12345678",
    profilePic: null,
    dept: "Departemen Portofolio Bisnis",
    date: "2026-09-21",
    latarBelakang:
      "Dept. Portofolio Bisnis melakukan pengelolaan terhadap 2 anak perusahaan dan 7 perusahaan patungan yang salah satu kegiatan rutinnya yaitu melakukan rekapitulasi laporan dari 9 entitas setiap bulannya.",
    costBenefit:
      "Dept PB mendapatkan output sesuai kebutuhan tanpa melakukan entry data manual di excel.",
    risiko:
      "Database tidak update dan risiko keterlambatan penyampaian laporan.",
    itmp: {
      pilar: "New Revenue",
      programs: ["Pengembangan Single Platform Penjualan", "Implementasi Precision Agriculture"],
    },
    gambaranUmum:
      "1. Entitas entry data keuangan dan operasional\n2. Data masuk sebagai database\n3. Dept PB menarik data sesuai kebutuhan dan format tertentu\n4. Dept PB dapat menarik data series",
    attachments: [
      {
        name: "suket selesai proyek.pdf",
        type: "PDF",
        url: "/sample-attachments/suket selesai proyek.pdf",
      },
      { name: "tis.jpg", type: "JPG", url: "/sample-attachments/tis.jpg" },
    ],
    activities: [
      {
        label: "Order dibuat",
        actor: "12231149",
        time: "19 Mei 2026, 09.59",
        tone: "default",
      },
      {
        label: "Review disetujui",
        actor: "1140122",
        time: "19 Mei 2026, 10.02",
        tone: "info",
        changes: [
          {
            field: "Status",
            from: "Menunggu Review",
            to: "Menunggu Persetujuan",
          },
          { field: "Reviewer", value: "Jojok Satriadi" },
          { field: "Komentar Reviewer", value: "ok" },
        ],
        reviewerComment: "Mohon perbaiki bagian latar belakang, kurang detail.",
      },
      {
        label: "Order disetujui",
        actor: "1140122",
        time: "19 Mei 2026, 10.03",
        tone: "info",
        changes: [
          { field: "Status", from: "Menunggu Persetujuan", to: "Disetujui" },
          { field: "Komentar Approver", value: "ok" },
        ],
      },
      {
        label: "Order diproses",
        actor: "12231149",
        time: "19 Mei 2026, 10.03",
        tone: "success",
        changes: [{ field: "Status", from: "Disetujui", to: "Diproses" }],
      },
      {
        label: "Order selesai",
        actor: "3082625",
        time: "19 Mei 2026, 10.13",
        tone: "success",
        changes: [{ field: "Status", from: "Diproses", to: "Selesai" }],
      },
    ],
  },
  {
    id: "30",
    ticketNumber: "202600018",
    status: "Menunggu Review",
    title: "Enhancement Modul Plant Maintenance",
    category: "Enhancement Aplikasi Eksisting",
    name: "Ni Putu Kusuma",
    badge: "11223344",
    profilePic: null,
    dept: "Departemen Plant Maintenance",
    date: "2026-05-21",
    latarBelakang:
      "Perlunya penambahan fitur pelaporan otomatis pada modul plant maintenance.",
    costBenefit: "Mempercepat proses pelaporan teknis lapangan.",
    risiko: "Keterlambatan penanganan maintenance mesin.",
    theme: "COST LEADERSHIP\nPengembangan Plant Maintenance System",
    gambaranUmum:
      "1. Teknisi melakukan input laporan harian\n2. Sistem merekap data kerusakan mesin\n3. Supervisor memvalidasi laporan",
  },
  {
    id: "28",
    ticketNumber: "202600017",
    status: "Menunggu Persetujuan",
    title: "Sistem Monitoring Emisi & Limbah",
    category: "Aplikasi Baru",
    name: "Steven Kuri",
    badge: "12233445",
    profilePic: null,
    dept: "Departemen Lingkungan Hidup",
    date: "2026-05-20",
    latarBelakang:
      "Kepatuhan terhadap regulasi lingkungan terkait pemantauan emisi gas buang.",
    costBenefit:
      "Menghindari denda lingkungan dan memantau emisi secara real-time.",
    risiko: "Sanksi hukum dan pencemaran lingkungan tak terpantau.",
    theme: "WORLD CLASS COMPANY\nPengembangan Sistem K3 Terintegrasi",
    gambaranUmum:
      "1. Sensor IoT mengirim data emisi\n2. Dashboard menampilkan grafik real-time\n3. Notifikasi otomatis jika melebihi ambang batas",
  },
  {
    id: "34",
    ticketNumber: "202600021",
    status: "Selesai",
    title: "Enhancement Toolbox",
    category: "Enhancement Aplikasi Eksisting",
    name: "Kusuma Dwi",
    badge: "11122233",
    profilePic: null,
    dept: "Departemen Sumber Daya Manusia",
    date: "2026-10-02",
    latarBelakang:
      "Perlunya penambahan fitur pelaporan otomatis pada modul plant maintenance.",
    costBenefit: "Mempercepat proses pelaporan teknis lapangan.",
    risiko: "Keterlambatan penanganan maintenance mesin.",
    theme: "COST LEADERSHIP\nPengembangan Plant Maintenance System",
    gambaranUmum:
      "1. Teknisi melakukan input laporan harian\n2. Sistem merekap data kerusakan mesin\n3. Supervisor memvalidasi laporan",
  },
];

export function getMockRequestById(id) {
  return mockRequests.find((item) => item.id === id) || null;
}
