import * as XLSX from "xlsx-js-style";

function formatTheme(theme) {
  if (!theme) return "";
  return theme;
}

const COLUMNS = [
  { key: "id", header: "ID" },
  {
    key: "ticketNumber",
    header: "Nomor Tiket",
    format: (v) => (v ? `#${v}` : ""),
  },
  { key: "name", header: "Pengusul" },
  { key: "date", header: "Tanggal Inisiasi" },
  { key: "status", header: "Status" },
  { key: "category", header: "Jenis Pengembangan" },
  { key: "title", header: "Nama Aplikasi" },
  { key: "latarBelakang", header: "Latar Belakang" },
  {
    key: "gambaranUmum",
    header: "Gambaran Umum/Lingkup Aplikasi",
  },
  { key: "costBenefit", header: "Cost & Benefit" },
  {
    key: "risiko",
    header: "Risiko Jika Aplikasi Tidak Dibuat",
  },
  {
    key: "itmp",
    header: "Kesesuaian dengan ITMP",
    format: formatTheme,
  },
];

const HEADER_STYLE = {
  font: {
    bold: true,
    color: { rgb: "FFFFFF" },
    sz: 11,
  },
  fill: {
    fgColor: { rgb: "00875A" },
  },
  alignment: {
    vertical: "center",
    horizontal: "center",
    wrapText: true,
  },
  border: {
    top: {
      style: "thin",
      color: { rgb: "006B47" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "006B47" },
    },
    left: {
      style: "thin",
      color: { rgb: "006B47" },
    },
    right: {
      style: "thin",
      color: { rgb: "006B47" },
    },
  },
};

const BODY_STYLE = {
  alignment: {
    vertical: "top",
    horizontal: "left",
    wrapText: true,
  },
  border: {
    top: {
      style: "thin",
      color: { rgb: "D9D9D9" },
    },
    bottom: {
      style: "thin",
      color: { rgb: "D9D9D9" },
    },
    left: {
      style: "thin",
      color: { rgb: "D9D9D9" },
    },
    right: {
      style: "thin",
      color: { rgb: "D9D9D9" },
    },
  },
};

export function exportRequestsToExcel(items, fileName = "formrequest-export") {
  try {
    const rows = items.map((item) =>
      Object.fromEntries(
        COLUMNS.map((column) => {
          const rawValue = item[column.key] ?? "";

          const value = column.format ? column.format(rawValue) : rawValue;

          return [column.header, value];
        }),
      ),
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [
      { wch: 16 },
      { wch: 18 },
      { wch: 25 },
      { wch: 18 },
      { wch: 20 },
      { wch: 25 },
      { wch: 30 },
      { wch: 40 },
      { wch: 40 },
      { wch: 35 },
      { wch: 40 },
      { wch: 45 },
    ];

    worksheet["!rows"] = [{ hpt: 30 }];

    // Style header
    COLUMNS.forEach((_, columnIndex) => {
      const cellRef = XLSX.utils.encode_cell({
        r: 0,
        c: columnIndex,
      });

      if (worksheet[cellRef]) {
        worksheet[cellRef].s = HEADER_STYLE;
      }
    });

    // Style data
    for (let rowIndex = 1; rowIndex <= rows.length; rowIndex++) {
      COLUMNS.forEach((_, columnIndex) => {
        const cellRef = XLSX.utils.encode_cell({
          r: rowIndex,
          c: columnIndex,
        });

        if (worksheet[cellRef]) {
          worksheet[cellRef].s = BODY_STYLE;
        }
      });
    }

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Permintaan");

    const today = new Date().toISOString().slice(0, 10);

    const finalFileName = `${fileName}-${today}.xlsx`;

    // Generate file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Buat file blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Trigger download
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = finalFileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Bersihkan URL setelah download 
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (error) {
    console.error("Failed to export Excel:", error);

    return false;
  }
}
