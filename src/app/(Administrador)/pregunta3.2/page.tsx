"use client";

import React from "react";
import Link from "next/link";
import "./page3.2.css";

export default function Pregunta3_2() {
  const data = [
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
  ];

  const total = {
    alumnos: "249",
    profesores: "14",
    tecnicos: "3",
    investigadores: "0",
    administrativos: "37",
    total: "303",
  };

  return (
    <main className="pregunta-page pregunta3">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 3 (2/5)</h1>

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
            <div className="tab inactive">
              Computadoras de escritorio Plataforma PC
            </div>
            <div className="tab active">
              Computadoras de escritorio Plataforma Apple
            </div>
            <div className="tab inactive">
              Computadoras portátiles Plataforma PC
            </div>
            <div className="tab inactive">
              Computadoras portátiles Plataforma Apple
            </div>
            <div className="tab inactive">Alto rendimiento Servidores</div>
          </div>

          {/* === TABLA === */}
          <div className="tabla-apple-container">
            <table className="tabla-apple">
              <thead>
                <tr>
                  <th rowSpan={2} className="header-procesador">
                    Plataforma Apple <br /> Tipo de procesador
                  </th>
                  <th colSpan={5} className="header-poblacion">
                    Población Beneficiada
                  </th>
                  <th rowSpan={2} className="header-total">
                    Total
                  </th>
                </tr>
                <tr>
                  <th className="sub-header">Alumnos</th>
                  <th className="sub-header">Profesores</th>
                  <th className="sub-header">Técnicos Académicos</th>
                  <th className="sub-header">Investigadores</th>
                  <th className="sub-header">Administrativos</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
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
                    <input type="text" value={total.alumnos} readOnly />
                  </td>
                  <td>
                    <input type="text" value={total.profesores} readOnly />
                  </td>
                  <td>
                    <input type="text" value={total.tecnicos} readOnly />
                  </td>
                  <td>
                    <input type="text" value={total.investigadores} readOnly />
                  </td>
                  <td>
                    <input type="text" value={total.administrativos} readOnly />
                  </td>
                  <td className="total-celda final-total">{total.total}</td>
                </tr>
              </tbody>
            </table>
            <button className="boton-consultar">
              Consultar las equivalencias de procesadores
            </button>
          </div>
        </section>

        <div className="boton-contenedor">
          <Link href="/pregunta3-3" className="boton siguiente">
            Pregunta 3 (3/5) →
          </Link>
        </div>
      </div>
    </main>
  );
}
