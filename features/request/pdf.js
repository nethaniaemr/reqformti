export async function downloadRequestPdf(item) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const PW = 210;
  const PH = 297;
  const M = 18;
  const W = PW - M * 2;
  const LABEL_W = 62;
  const FS = 8;
  const LH = FS * 1.4 * 0.3528;

  doc.setLineHeightFactor(1.4);

  let y = 25;

  const font = (style = "normal", size = FS) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
  };

  // Garis hitam tipis
  const rule = () => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(M, y, PW - M, y);
  };

  // Pindah halaman jika ruang tidak cukup
  const ensure = (h) => {
    if (y + h > PH - 18) {
      doc.addPage();
      y = 22;
    }
  };

  // Mengubah nilai menjadi teks yang aman untuk PDF
  const toText = (value) => {
    if (value == null || value === "") return "-";

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }

    return "-";
  };

  // Baris label dan nilai
  const row = (label, value) => {
    font("normal");

    const lines = doc.splitTextToSize(`: ${toText(value)}`, W - LABEL_W);

    ensure(lines.length * LH + 2);

    font("bold");
    doc.text(label, M, y);

    font("normal");
    doc.text(lines, M + LABEL_W, y);

    y += lines.length * LH + 1.7;
  };

  // Bagian teks panjang
  const block = (label, value) => {
    const lines = doc.splitTextToSize(toText(value), W - 4);

    ensure(LH * 2 + 2);

    font("bold");
    doc.text(label, M, y);
    y += LH + 0.4;

    font("normal");

    lines.forEach((line) => {
      ensure(LH);
      doc.text(line, M + 4, y);
      y += LH;
    });

    y += 2.8;
  };

  // Bagian daftar, mendukung data array maupun teks biasa
  const list = (label, value) => {
    if (value == null || value === "") return;

    const items = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? [value]
        : [];

    if (items.length === 0) return;

    ensure(LH * 2);

    y -= 2;

    font("bold");
    doc.text(label, M, y);
    y += LH + 0.4;

    font("normal");

    items.forEach((entry, index) => {
      const text = toText(entry);
      const lines = doc.splitTextToSize(text, W - 12);

      ensure(lines.length * LH);

      doc.text(`${index + 1}.`, M + 4, y);

      lines.forEach((line, lineIndex) => {
        if (lineIndex > 0) ensure(LH);
        doc.text(line, M + 9, y);
        y += LH;
      });
    });

    y += 2.8;
  };

  // Judul dokumen
  font("bold", 12);
  doc.text("PERMINTAAN PENGEMBANGAN APLIKASI TI", PW / 2, y, {
    align: "center",
  });

  font("normal", 10);
  doc.text(`Nomor ${toText(item.id)}`, PW - M, y, {
    align: "right",
  });

  y += 11;
  rule();
  y += 6.5;

  // Informasi pengajuan
  row("Nomor Tiket", item.ticketNumber);
  row("Tanggal Pengajuan", item.date);
  row("Nama Pemohon", item.name);
  row("Unit Kerja / Departemen", item.dept);

  y += 0.2;
  rule();
  y += 4;

  // Detail pekerjaan
  row("Jenis Pengembangan", item.category);

  y += 0.5;
  rule();
  y += 4.5;

  block("Latar Belakang / Permasalahan", item.latarBelakang);
  block("Cost & Benefit", item.costBenefit);
  block("Risiko Jika Tidak Dibuat", item.risiko);

  // Tema IT Master Plan
  const temaIsi = Array.isArray(item.temaIsi)
    ? item.temaIsi
    : typeof item.temaIsi === "string" && item.temaIsi.trim()
      ? [item.temaIsi]
      : [];

  if (item.temaJudul || temaIsi.length > 0) {
    ensure(LH * 3);

    font("bold");
    doc.text("Tema IT Master Plan PI Grup 2025 - 2029", M, y);
    y += LH + 0.4;

    if (item.temaJudul) {
      font("normal");
      const judulLines = doc.splitTextToSize(String(item.temaJudul), W - 4);

      judulLines.forEach((line) => {
        ensure(LH);
        doc.text(line, M + 4, y);
        y += LH;
      });
    }

    font("normal");

    temaIsi.forEach((entry) => {
      const lines = doc.splitTextToSize(toText(entry), W - 4);

      lines.forEach((line) => {
        ensure(LH);
        doc.text(line, M + 4, y);
        y += LH;
      });
    });

    y += 2.8;
  }

  // Gambaran umum dan lingkup aplikasi
  list("Gambaran Umum & Lingkup Aplikasi", item.gambaranUmum);

  // Persetujuan di bagian paling akhir
  y += 0.5;
  ensure(42);

  rule();
  y += 3;

  font("bold");
  doc.text("Persetujuan", M, y);
  y += 7.5;

  const colW = W / 3;
  const cols = [
    ["Diajukan Oleh,", "(Pemohon)"],
    ["Ditinjau Oleh,", "(Reviewer)"],
    ["Disetujui Oleh,", "(Approver)"],
  ];

  font("normal");

  cols.forEach(([head], index) => {
    const cx = M + colW * index + colW / 2;

    doc.text(head, cx, y, {
      align: "center",
    });
  });

  y += 17;

  cols.forEach(([, role], index) => {
    const cx = M + colW * index + colW / 2;

    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.2);
    doc.line(cx - 17, y, cx + 17, y);

    doc.text(role, cx, y + 4, {
      align: "center",
    });
  });

  doc.save(`formrequest-${item.id}.pdf`);
}
