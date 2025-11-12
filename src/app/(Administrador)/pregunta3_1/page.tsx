"use client";

import React from "react";
import Link from "next/link";
import "./page3.1.css";

export default function Pregunta3() {
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
      alumnos: "15",
      profesores: "16",
      tecnicos: "",
      investigadores: "",
      administrativos: "52",
      total: "97",
    },
    {
      tipo: "i7 o equivalentes (12a generación en adelante)",
      alumnos: "29",
      profesores: "16",
      tecnicos: "",
      investigadores: "",
      administrativos: "52",
      total: "97",
    },
    {
      tipo: "i5 o equivalentes (13a generación en adelante)",
      alumnos: "107",
      profesores: "3",
      tecnicos: "",
      investigadores: "",
      administrativos: "8",
      total: "118",
    },
    {
      tipo: "i5 o equivalentes (12a generación en adelante)",
      alumnos: "250",
      profesores: "59",
      tecnicos: "3",
      investigadores: "",
      administrativos: "904",
      total: "1216",
    },
    {
      tipo: "i3 o equivalentes (13a generación en adelante)",
      alumnos: "3",
      profesores: "1",
      tecnicos: "",
      investigadores: "",
      administrativos: "12",
      total: "16",
    },
    {
      tipo: "i3 o equivalentes (12a generación en adelante)",
      alumnos: "36",
      profesores: "19",
      tecnicos: "2",
      investigadores: "",
      administrativos: "78",
      total: "137",
    },
    {
      tipo: "i3 o equivalentes (11a generación en adelante)",
      alumnos: "264",
      profesores: "66",
      tecnicos: "",
      investigadores: "",
      administrativos: "410",
      total: "740",
    },
    {
      tipo: "Pentium Gold",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "Pentium Serie J, G",
      alumnos: "2",
      profesores: "3",
      tecnicos: "",
      investigadores: "",
      administrativos: "3",
      total: "8",
    },
    {
      tipo: "Celeron Dual Core, Pentium Dual Core o anteriores",
      alumnos: "25",
      profesores: "40",
      tecnicos: "",
      investigadores: "",
      administrativos: "56",
      total: "121",
    },
  ];

  const total = {
    alumnos: "774",
    profesores: "227",
    tecnicos: "5",
    investigadores: "0",
    administrativos: "838",
    total: "1844",
  };

  return (
    <main className="pregunta-page pregunta3">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 3 (1/5)</h1>

        <section className="pregunta-seccion">
          <p className="pregunta-texto">
            3. Desglose la cantidad de población beneficiada por plataforma y
            tipo de procesador: *
          </p>
          <p className="pregunta-subtexto">
            Presione cada pestaña para ingresar la información.
          </p>

          {/* Pestañas */}
          <div className="tab-container">
            <div className="tab active">
              Computadoras de escritorio Plataforma PC
            </div>
            <div className="tab inactive">
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

          {/* Tabla */}
          <div className="tabla-wrapper">
            <table className="tabla-pc">
              <thead>
                <tr>
                  <th rowSpan={2} className="header-procesador">
                    Plataforma PC <br /> Tipo de procesador
                  </th>
                  <th colSpan={5} className="header-poblacion">
                    Población Beneficiada
                  </th>
                  <th rowSpan={2} className="header-total">
                    Total
                  </th>
                </tr>
                <tr>
                  <th>Alumnos</th>
                  <th>Profesores</th>
                  <th>Técnicos Académicos</th>
                  <th>Investigadores</th>
                  <th>Administrativos</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td className="tipo-procesador">{item.tipo}</td>
                    <td>
                      <input value={item.alumnos} readOnly />
                    </td>
                    <td>
                      <input value={item.profesores} readOnly />
                    </td>
                    <td>
                      <input value={item.tecnicos} readOnly />
                    </td>
                    <td>
                      <input value={item.investigadores} readOnly />
                    </td>
                    <td>
                      <input value={item.administrativos} readOnly />
                    </td>
                    <td className="total-celda">{item.total}</td>
                  </tr>
                ))}
                <tr className="fila-total">
                  <td className="tipo-procesador">Total</td>
                  <td>
                    <input value={total.alumnos} readOnly />
                  </td>
                  <td>
                    <input value={total.profesores} readOnly />
                  </td>
                  <td>
                    <input value={total.tecnicos} readOnly />
                  </td>
                  <td>
                    <input value={total.investigadores} readOnly />
                  </td>
                  <td>
                    <input value={total.administrativos} readOnly />
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
          <Link href="/pregunta3.2" className="boton siguiente">
            Pregunta 3 (2/5) →
          </Link>
        </div>
      </div>
    </main>
  );
}
