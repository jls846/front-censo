"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./pregunta3.module.scss";
import ToggleButton from "../Toggle/ToggleButton";

type ProcessorEntry = {
  tipo: string;
  alumnos: string;
  profesores: string;
  tecnicos: string;
  investigadores: string;
  administrativos: string;
  total: string;
  isTotal?: boolean;
};

type PlatformKey =
  | "pc-desktop"
  | "apple-desktop"
  | "pc-laptop"
  | "apple-laptop"
  | "servers";

type PlatformData = Record<PlatformKey, ProcessorEntry[]>;

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  "pc-desktop": "Computadoras de escritorio Plataforma PC",
  "apple-desktop": "Computadoras de escritorio Plataforma Apple",
  "pc-laptop": "Computadoras portátiles Plataforma PC",
  "apple-laptop": "Computadoras portátiles Plataforma Apple",
  servers: "Alto rendimiento Servidores",
};

// Mapeo de "uso" del JSON a campos en ProcessorEntry
const USO_TO_FIELD: Record<
  string,
  keyof Omit<ProcessorEntry, "tipo" | "total" | "isTotal">
> = {
  ALUMNO: "alumnos",
  PROFESOR: "profesores",
  "TÉCNICO ACADEMICO": "tecnicos",
  INVESTIGADOR: "investigadores",
  ADMINISTRATIVO: "administrativos",
};

// Transforma un array plano del tipo [{procesador, uso, total}] en ProcessorEntry[]
function transformProcessorData(
  rawArray: { procesador: string; uso: string; total: string }[]
): ProcessorEntry[] {
  const map = new Map<string, ProcessorEntry>();

  for (const item of rawArray) {
    const { procesador, uso, total } = item;
    if (!map.has(procesador)) {
      map.set(procesador, {
        tipo: procesador,
        alumnos: "0",
        profesores: "0",
        tecnicos: "0",
        investigadores: "0",
        administrativos: "0",
        total: "0",
      });
    }

    const entry = map.get(procesador)!;
    const field = USO_TO_FIELD[uso];
    if (field) {
      entry[field] = total;
    }
  }

  // Convertimos a array y calculamos el total por fila
  const rows = Array.from(map.values()).map((entry) => {
    const totalNum =
      parseInt(entry.alumnos || "0") +
      parseInt(entry.profesores || "0") +
      parseInt(entry.tecnicos || "0") +
      parseInt(entry.investigadores || "0") +
      parseInt(entry.administrativos || "0");
    return {
      ...entry,
      total: totalNum.toString(),
    };
  });

  // Calculamos los totales generales
  const grandTotal: ProcessorEntry = {
    tipo: "Total",
    alumnos: rows
      .reduce((sum, r) => sum + parseInt(r.alumnos || "0"), 0)
      .toString(),
    profesores: rows
      .reduce((sum, r) => sum + parseInt(r.profesores || "0"), 0)
      .toString(),
    tecnicos: rows
      .reduce((sum, r) => sum + parseInt(r.tecnicos || "0"), 0)
      .toString(),
    investigadores: rows
      .reduce((sum, r) => sum + parseInt(r.investigadores || "0"), 0)
      .toString(),
    administrativos: rows
      .reduce((sum, r) => sum + parseInt(r.administrativos || "0"), 0)
      .toString(),
    total: rows
      .reduce((sum, r) => sum + parseInt(r.total || "0"), 0)
      .toString(),
    isTotal: true,
  };

  return [...rows, grandTotal];
}

export default function Pregunta3_2() {
  const [activeTab, setActiveTab] = useState<PlatformKey>("pc-desktop");
  const [data, setData] = useState<PlatformData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token no encontrado");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/equipos/reporte/tipoEquipos_procesador`,
        ["EN DESUSO", "EN USO"],
        { headers }
      )
      .then((res) => {
        const json = res.data; // array de 5 arreglos

        const formatted: PlatformData = {
          "pc-desktop": transformProcessorData(json[0] || []),
          "apple-desktop": transformProcessorData(json[1] || []),
          "pc-laptop": transformProcessorData(json[2] || []),
          "apple-laptop": transformProcessorData(json[3] || []),
          servers: transformProcessorData(json[4] || []),
        };

        setData(formatted);
      })
      .catch((err) => {
        console.error("Error cargando datos de procesadores", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className={styles.scanView_P3}>Cargando datos...</div>;

  if (!data)
    return <div className={styles.scanView_P3}>Error al cargar los datos.</div>;

  const currentData = data[activeTab];

  return (
    <div className={styles.container_P3}>
      <div className={styles["contenedor-censo_P3"]}>
        Censo de equipos de cómputo - Plataforma y tipo procesador
      </div>

      <div className={styles["pregunta-cuadro_P3"]}>
        Cantidad de población beneficiada por plataforma y tipo de procesador.
        <ToggleButton />
      </div>
      <div className={styles.scanView_P3}>
        <div className={styles.mainContent_P3}>
          {/* Pestañas verticales */}
          <div className={styles.tabs_P3}>
            {Object.entries(PLATFORM_LABELS).map(([key, label]) => (
              <button
                key={key}
                className={`${styles.tab_P3} ${
                  activeTab === key ? styles.active_P3 : ""
                }`}
                onClick={() => setActiveTab(key as PlatformKey)}
                aria-selected={activeTab === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contenido */}
          <div className={styles.content_P3}>
            {currentData.length > 0 ? (
              <>
                <div className={styles.tableWrapper_P3}>
                  <table className={styles.table_P3}>
                    <thead>
                      <tr>
                        <th rowSpan={2} className={styles.headerProcesador}>
                          {activeTab.includes("apple")
                            ? "Plataforma Apple"
                            : "Plataforma PC"}{" "}
                          <br />
                          Tipo de procesador
                        </th>
                        <th colSpan={5} className={styles.headerPoblacion}>
                          Población Beneficiada
                        </th>
                        <th rowSpan={2} className={styles.headerTotal}>
                          Total
                        </th>
                      </tr>
                      <tr>
                        <th className={styles.subHeader}>Alumnos</th>
                        <th className={styles.subHeader}>Profesores</th>
                        <th className={styles.subHeader}>
                          Técnicos Académicos
                        </th>
                        <th className={styles.subHeader}>Investigadores</th>
                        <th className={styles.subHeader}>Administrativos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            item.isTotal
                              ? styles.totalRow_P3
                              : styles.dataRow_P3
                          }
                        >
                          <td className={styles.processor_P3}>{item.tipo}</td>
                          <td>
                            <input
                              type="text"
                              value={item.alumnos}
                              readOnly
                              className={styles.inputBox_P3}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.profesores}
                              readOnly
                              className={styles.inputBox_P3}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.tecnicos}
                              readOnly
                              className={styles.inputBox_P3}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.investigadores}
                              readOnly
                              className={styles.inputBox_P3}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              value={item.administrativos}
                              readOnly
                              className={styles.inputBox_P3}
                            />
                          </td>
                          <td className={styles.totalCell_P3}>{item.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className={styles.emptyState_P3}>
                No hay datos disponibles para esta plataforma.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
