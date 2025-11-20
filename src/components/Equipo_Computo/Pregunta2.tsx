"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./pregunta2.module.scss";
import Cookies from "js-cookie";
type OsEntry = {
  os: string;
  count: number;
  isTotal?: boolean;
};

type PlatformKey =
  | "pc-desktop"
  | "apple-desktop"
  | "pc-laptop"
  | "apple-laptop"
  | "servers";

type PlatformData = Record<PlatformKey, OsEntry[]>;

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  "pc-desktop": "Computadoras de escritorio Plataforma PC",
  "apple-desktop": "Computadoras de escritorio Plataforma Apple",
  "pc-laptop": "Computadoras portátiles Plataforma PC",
  "apple-laptop": "Computadoras portátiles Plataforma Apple",
  servers: "Servidores de alto rendimiento",
};
interface RawOsEntry {
  sistema_operativo: string;
  total: string;
}
// ✔ Función profesional para transformar tu JSON a OsEntry[]
function transformPlatform(raw: RawOsEntry[]): OsEntry[] {
  const rows: OsEntry[] = raw.map((item) => ({
    os: item.sistema_operativo,
    count: Number(item.total), // Convierte string a número
  }));

  const total = rows.reduce((acc, r) => acc + r.count, 0);

  rows.push({
    os: "Total",
    count: total,
    isTotal: true,
  });

  return rows;
}

export default function Pregunta2() {
  const [activeTab, setActiveTab] = useState<PlatformKey>("pc-desktop");
  const [data, setData] = useState<PlatformData | null>(null);

  // ✔ GET AXIOS PROFESIONAL
  useEffect(() => {
    const token = Cookies.get("token");
    const headers = {Authorization: `Bearer ${token}`};
    axios
      .get("https://venus.acatlan.unam.mx/censo_test/equipos/reporte/tipoEquipos_sistemasOperativos",{headers}) // ← TU API AQUI
      .then((res) => {
        const json = res.data; // Tu JSON con 5 arreglos

        const formatted: PlatformData = {
          "pc-desktop": transformPlatform(json[0]),
          "apple-desktop": transformPlatform(json[1]),
          "pc-laptop": transformPlatform(json[2]),
          "apple-laptop": transformPlatform(json[3]),
          servers: transformPlatform(json[4]),
        };

        setData(formatted);
      })
      .catch((err) => console.error("Error cargando datos", err));
  }, []);

  if (!data) return <div>Cargando datos...</div>;

  const currentData = data[activeTab];

  return (
    <div className={styles.scanView_P1}>
      <div className={styles.container_P1}>
        <div className="contenedor-censo">
          Censo de equipos — Sistemas Operativos
        </div>

        <div className={styles.header_P1}>
          Presione cada pestaña para ver la información de las plataformas.
        </div>

        <div className={styles["main-content_P1"]}>
          {/* Tabs */}
          <div className={styles.tabs_P1}>
            {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.tab_P1} ${
                  activeTab === key ? styles.active_P1 : ""
                }`}
                onClick={() => setActiveTab(key as PlatformKey)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tabla */}
          <div className={styles["data-table_P1"]}>
            {currentData.map((item, index) => (
              <div
                key={index}
                className={`${styles["data-row_P1"]} ${
                  item.isTotal ? styles["total-row_P1"] : ""
                }`}
              >
                <div className={styles["os-name_P1"]}>{item.os}</div>
                <div className={styles["count-box_P1"]}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
