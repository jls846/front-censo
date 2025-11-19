"use client";

import { useState } from "react";
import styles from "./pregunta3.module.scss";

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

// Datos: solo "apple-desktop" tiene información en este caso
const MOCK_DATA: PlatformData = {
  "pc-desktop": [],
  "apple-desktop": [
    {
      tipo: "Core Ultra (i3, i5, i7) Serie 2",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Core Ultra (i3, i5, i7) Serie 1",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Familia M4",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "2",
      total: "2",
    },
    {
      tipo: "Familia M3",
      alumnos: "",
      profesores: "1",
      tecnicos: "",
      investigadores: "",
      administrativos: "1",
      total: "2",
    },
    {
      tipo: "Familia M2",
      alumnos: "",
      profesores: "2",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "2",
    },
    {
      tipo: "Familia M1",
      alumnos: "51",
      profesores: "1",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "52",
    },
    {
      tipo: "i9 o equivalentes (13a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "i7 o equivalentes (13a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "i7 o equivalentes (12a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "i5 o equivalentes (13a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "i5 o equivalentes (12a generación en adelante)",
      alumnos: "11",
      profesores: "1",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "12",
    },
    {
      tipo: "i3 o equivalentes (13a generación en adelante)",
      alumnos: "175",
      profesores: "5",
      tecnicos: "",
      investigadores: "",
      administrativos: "26",
      total: "206",
    },
    {
      tipo: "i3 o equivalentes (12a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "i3 o equivalentes (11a generación en adelante)",
      alumnos: "",
      profesores: "2",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "2",
    },
    {
      tipo: "Core2 Mac, Quad Core o anteriores",
      alumnos: "12",
      profesores: "3",
      tecnicos: "3",
      investigadores: "",
      administrativos: "3",
      total: "21",
    },
    {
      tipo: "Total",
      alumnos: "249",
      profesores: "14",
      tecnicos: "3",
      investigadores: "0",
      administrativos: "37",
      total: "303",
      isTotal: true,
    },
  ],
  "pc-laptop": [],
  "apple-laptop": [],
  servers: [],
};

const PLATFORM_LABELS: Record<PlatformKey, string> = {
  "pc-desktop": "Computadoras de escritorio Plataforma PC",
  "apple-desktop": "Computadoras de escritorio Plataforma Apple",
  "pc-laptop": "Computadoras portátiles Plataforma PC",
  "apple-laptop": "Computadoras portátiles Plataforma Apple",
  servers: "Alto rendimiento Servidores",
};

export default function Pregunta3_2() {
  const [activeTab, setActiveTab] = useState<PlatformKey>("apple-desktop");

  const currentData = MOCK_DATA[activeTab];

  return (
    <div className={styles.scanView_P3}>
      <div className={styles.container_P3}>
        <div className={styles.header_P3}>
          <h1 className={styles.titulo}>PREGUNTA 3 (2/5)</h1>
          <p className={styles.texto}>
            3. Desglose la cantidad de población beneficiada por plataforma y tipo de procesador: *
          </p>
          <p className={styles.subtexto}>
            Presione cada pestaña para ingresar la información.
          </p>
        </div>

        {/* Contenido principal con pestañas a la izquierda */}
        <div className={styles.mainContent_P3}>
          {/* Pestañas verticales (izquierda) */}
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

          {/* Contenido de la tabla (derecha) */}
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
                        <th className={styles.subHeader}>Técnicos Académicos</th>
                        <th className={styles.subHeader}>Investigadores</th>
                        <th className={styles.subHeader}>Administrativos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            item.isTotal ? styles.totalRow_P3 : styles.dataRow_P3
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
                <button className={styles.consultarBtn_P3}>
                  Consultar las equivalencias de procesadores
                </button>
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