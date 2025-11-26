"use client";

import styles from "./style.module.css";
import Cookies from "js-cookie";

export default function DownloadReporteXLSX() {
  const handleDownload = async () => {
          const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await fetch(
        "https://venus.acatlan.unam.mx/censo_test/equipos/reporteXLSX",{headers}
      );

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "reporte.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al descargar el archivo.");
    }
  };

  return (
    <button className={styles.downloadBtn} onClick={handleDownload}>
      <span className={styles.icon}></span>
      Descargar XLSX
    </button>
  );
}
