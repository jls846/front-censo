"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./page3.css";

export default function Pregunta3() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Computadoras de escritorio Plataforma PC",
    "Computadoras de escritorio Plataforma Apple",
    "Computadoras portátiles Plataforma PC",
    "Computadoras portátiles Plataforma Apple",
    "Alto rendimiento Servidores",
  ];

  // === DATOS DE CADA TABLA ===
  const data = [
    // === 1. PC Escritorio ===
    {
      color: "#16a34a",
      headerColor: "#15803d",
      rows: [
        {
          tipo: "Core i9 / Ryzen 9",
          alumnos: "",
          profesores: "",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "0",
        },
        {
          tipo: "Core i7 / Ryzen 7",
          alumnos: "15",
          profesores: "8",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "23",
        },
        {
          tipo: "Core i5 / Ryzen 5",
          alumnos: "10",
          profesores: "5",
          tecnicos: "",
          investigadores: "",
          administrativos: "2",
          total: "17",
        },
      ],
      total: {
        alumnos: "25",
        profesores: "13",
        tecnicos: "0",
        investigadores: "0",
        administrativos: "2",
        total: "40",
      },
    },
    // === 2. Apple Escritorio ===
    {
      color: "#a855f7",
      headerColor: "#7e22ce",
      rows: [
        {
          tipo: "Familia M3",
          alumnos: "10",
          profesores: "2",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "12",
        },
        {
          tipo: "Familia M2",
          alumnos: "5",
          profesores: "3",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "8",
        },
      ],
      total: {
        alumnos: "15",
        profesores: "5",
        tecnicos: "0",
        investigadores: "0",
        administrativos: "0",
        total: "20",
      },
    },
    // === 3. PC Portátiles ===
    {
      color: "#22c55e",
      headerColor: "#15803d",
      rows: [
        {
          tipo: "Core i5 (12a generación)",
          alumnos: "12",
          profesores: "5",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "17",
        },
        {
          tipo: "Core i7 (13a generación)",
          alumnos: "6",
          profesores: "4",
          tecnicos: "",
          investigadores: "",
          administrativos: "1",
          total: "11",
        },
      ],
      total: {
        alumnos: "18",
        profesores: "9",
        tecnicos: "0",
        investigadores: "0",
        administrativos: "1",
        total: "28",
      },
    },
    // === 4. Apple Portátiles ===
    {
      color: "#9333ea",
      headerColor: "#7e22ce",
      rows: [
        {
          tipo: "Familia M2",
          alumnos: "35",
          profesores: "3",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "38",
        },
        {
          tipo: "Familia M1",
          alumnos: "",
          profesores: "5",
          tecnicos: "",
          investigadores: "",
          administrativos: "1",
          total: "6",
        },
        {
          tipo: "i5 o equivalentes (12a generación en adelante)",
          alumnos: "",
          profesores: "14",
          tecnicos: "",
          investigadores: "",
          administrativos: "",
          total: "14",
        },
      ],
      total: {
        alumnos: "35",
        profesores: "31",
        tecnicos: "0",
        investigadores: "0",
        administrativos: "5",
        total: "71",
      },
    },
    // === 5. Servidores ===
    {
      color: "#2563eb",
      headerColor: "#1e40af",
      rows: [
        {
          tipo: "Xeon E3, E5, E7",
          alumnos: "19",
          profesores: "",
          tecnicos: "",
          investigadores: "16",
          administrativos: "",
          total: "35",
        },
        {
          tipo: "Xeon Bronce, Plata, Oro 6a generación",
          alumnos: "",
          profesores: "",
          tecnicos: "",
          investigadores: "",
          administrativos: "1",
          total: "1",
        },
        {
          tipo: "Xeon Phi",
          alumnos: "",
          profesores: "",
          tecnicos: "",
          investigadores: "",
          administrativos: "1",
          total: "1",
        },
      ],
      total: {
        alumnos: "19",
        profesores: "0",
        tecnicos: "0",
        investigadores: "16",
        administrativos: "2",
        total: "37",
      },
    },
  ];

  return (
    <main className="pregunta-page">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 3 (1/5 - 5/5)</h1>

        <section className="pregunta-seccion">
          <p className="pregunta-texto">
            3. Desglose la cantidad de población beneficiada por plataforma y
            tipo de procesador: *
          </p>
          <p className="pregunta-subtexto">
            Presione cada pestaña para ingresar la información.
          </p>

          {/* === PESTAÑAS === */}
          <div className="tab-container">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab ${activeTab === index ? "active" : "inactive"}`}
                style={
                  activeTab === index
                    ? {
                        borderBottomColor: data[index].color,
                        color: data[index].color,
                      }
                    : {}
                }
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* === TABLA === */}
          <div className="tabla-container">
            <table className="tabla">
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className="header-procesador"
                    style={{ backgroundColor: data[activeTab].color }}
                  >
                    Tipo de procesador
                  </th>
                  <th
                    colSpan={5}
                    className="header-poblacion"
                    style={{ backgroundColor: data[activeTab].headerColor }}
                  >
                    Población Beneficiada
                  </th>
                  <th
                    rowSpan={2}
                    className="header-total"
                    style={{ backgroundColor: data[activeTab].color }}
                  >
                    Total
                  </th>
                </tr>
                <tr>
                  <th className="sub-header">Alumnos</th>
                  <th className="sub-header">Profesores</th>
                  <th className="sub-header">Técnicos</th>
                  <th className="sub-header">Investigadores</th>
                  <th className="sub-header">Administrativos</th>
                </tr>
              </thead>
              <tbody>
                {data[activeTab].rows.map((item, i) => (
                  <tr key={i}>
                    <td className="tipo-procesador">{item.tipo}</td>
                    <td>
                      <input type="text" value={item.alumnos} readOnly />
                    </td>
                    <td>
                      <input type="text" value={item.profesores} readOnly />
                    </td>
                    <td>
                      <input type="text" value={item.tecnicos} readOnly />
                    </td>
                    <td>
                      <input type="text" value={item.investigadores} readOnly />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.administrativos}
                        readOnly
                      />
                    </td>
                    <td className="total-celda">{item.total}</td>
                  </tr>
                ))}
                <tr className="fila-total">
                  <td className="tipo-procesador">Total</td>
                  <td>
                    <input
                      type="text"
                      value={data[activeTab].total.alumnos}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[activeTab].total.profesores}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[activeTab].total.tecnicos}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[activeTab].total.investigadores}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data[activeTab].total.administrativos}
                      readOnly
                    />
                  </td>
                  <td className="total-celda">{data[activeTab].total.total}</td>
                </tr>
              </tbody>
            </table>

            <button className="boton-consultar">
              Consultar las equivalencias de procesadores
            </button>
          </div>
        </section>

        <div className="boton-contenedor">
          <Link href="/" className="boton volver">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
