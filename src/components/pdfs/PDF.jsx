import jsPDF from "jspdf";
import "jspdf-autotable";

// Fungsi untuk mendapatkan nilai nested
const getNestedValue = (obj, key) => {
  return key.split(".").reduce((acc, part) => (acc ? acc[part] : ""), obj);
};

const exportToPDF = (columns, data) => {
  const doc = new jsPDF();

  // Tambahkan Judul
  doc.text("Laporan Kondisi Kamar", 14, 20);

  // Header kolom
  const headers = columns.map((col) => col.label);

  // Data untuk tabel
  const rows = data.map((row) =>
    columns.map((col) => {
      if (col.render) {
        // Jika kolom memiliki fungsi render
        return col.render(null, row) || "N/A";
      } else if (col.key.includes(".")) {
        // Jika kolom adalah nested key
        return getNestedValue(row, col.key) || "N/A";
      } else {
        return row[col.key] || "N/A";
      }
    })
  );

  // Tambahkan tabel ke PDF
  doc.autoTable({
    head: [headers], // Header tabel
    body: rows, // Isi tabel
    startY: 30,
    styles: { fontSize: 8, halign: "left", valign: "middle" },
    headStyles: { fillColor: [52, 73, 94], textColor: [255, 255, 255] },
  });

  // Unduh PDF
  doc.save("Laporan_Kamar.pdf");
};

export default exportToPDF;
