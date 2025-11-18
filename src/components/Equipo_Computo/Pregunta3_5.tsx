"use client";

import React from "react";
import Link from "next/link";
import "./pregunta3_5.css";

export default function Pregunta3_5() {
  const data = [
    {
      tipo: "Xeon 6",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 3a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 4a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 5a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
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
      tipo: "Xeon E3, E5, E7",
      alumnos: "19",
      profesores: "",
      tecnicos: "",
      investigadores: "16",
      administrativos: "",
      total: "35",
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
    {
      tipo: "Xeon o anteriores",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "",
      administrativos: "",
      total: "0",
    },
  ];

  const total = {
    alumnos: "19",
    profesores: "0",
    tecnicos: "0",
    investigadores: "16",
    administrativos: "2",
    total: "37",
  };

  return (
    <main className="pregunta-page pregunta3">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 3 (5/5)</h1>

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
            <div className="tab inactive">
              Computadoras de escritorio Plataforma Apple
            </div>
            <div className="tab inactive">
              Computadoras portátiles Plataforma PC
            </div>
            <div className="tab inactive">
              Computadoras portátiles Plataforma Apple
            </div>
            <div className="tab active">Alto rendimiento Servidores</div>
          </div>

          {/* === TABLA === */}
          <div className="tabla-servidores-container">
            <table className="tabla-servidores">
              <thead>
                <tr>
                  <th rowSpan={2} className="header-procesador">
                    Servidores <br /> Tipo de procesador
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
                  <tr key={index} className="tabla-fila">
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
          <Link href="/" className="boton volver">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
