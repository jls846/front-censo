"use client";

import React from "react";
import Link from "next/link";
import "./page3.4.css";

export default function Pregunta3_4() {
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
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Familia M3",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
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
      administrativos: "",
      total: "0",
    },
    {
      tipo: "i7 o equivalentes (11a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "i5 o equivalentes (13a generación en adelante)",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
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
    {
      tipo: "i5 o equivalentes (11a generación en adelante)",
      alumnos: "",
      profesores: "9",
      tecnicos: "",
      investigadores: "",
      administrativos: "4",
      total: "13",
    },
    {
      tipo: "Core2 Mac, Quad Core o anteriores",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
  ];

  const total = {
    alumnos: "35",
    profesores: "31",
    tecnicos: "0",
    investigadores: "0",
    administrativos: "5",
    total: "71",
  };

  return (
    <main className="pregunta3-container">
      <h1 className="pregunta3-titulo">PREGUNTA 3 (4/5)</h1>

      <div className="pregunta3-descripcion">
        <p>
          <strong>3.</strong> Desglose la cantidad de población beneficiada por
          plataforma y tipo de procesador:
        </p>
        <span className="subtexto">
          Presione cada pestaña para ingresar la información.
        </span>
      </div>

      {/* === PESTAÑAS === */}
      <div className="tabs">
        <button className="tab inactive">
          Computadoras de escritorio Plataforma PC
        </button>
        <button className="tab inactive">
          Computadoras de escritorio Plataforma Apple
        </button>
        <button className="tab inactive">
          Computadoras portátiles Plataforma PC
        </button>
        <button className="tab active">
          Computadoras portátiles Plataforma Apple
        </button>
        <button className="tab inactive">Alto rendimiento Servidores</button>
      </div>

      {/* === TABLA === */}
      <div className="tabla-wrapper">
        <table className="tabla-pregunta3">
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
              <th>Alumnos</th>
              <th>Profesores</th>
              <th>Técnicos Académicos</th>
              <th>Investigadores</th>
              <th>Administrativos</th>
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
                  <input type="text" value={item.administrativos} readOnly />
                </td>
                <td className="celda-total">{item.total}</td>
              </tr>
            ))}
            <tr className="fila-total">
              <td>Total</td>
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
              <td className="celda-total final">{total.total}</td>
            </tr>
          </tbody>
        </table>

        <button className="boton-consultar">
          Consultar las equivalencias de procesadores
        </button>
      </div>

      <div className="boton-siguiente">
        <Link href="/pregunta3.5" className="next">
          Pregunta 3 (5/5) →
        </Link>
      </div>
    </main>
  );
}
