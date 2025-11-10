"use client";

import React from "react";
import Link from "next/link";
import "./page3.css"; // Asegúrate de que los estilos están en este archivo

export default function Pregunta3() {
  // Datos de ejemplo basados en las imágenes (especialmente la de la tabla final)
  const data = [
    {
      tipo: "Xeon 6",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "0",
      total: "0",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 5a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 4a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "6",
      total: "6",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 3a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "1",
      total: "1",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 2a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "0",
      total: "0",
    },
    {
      tipo: "Xeon Bronce, Plata, Oro 1a generación",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "0",
      total: "0",
    },
    {
      tipo: "Xeon E3, E5, E7",
      alumnos: "19",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "16",
      total: "35",
    },
    {
      tipo: "Xeon Phi",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "0",
      total: "0",
    },
    {
      tipo: "Xeon's anteriores",
      alumnos: "",
      profesores: "",
      tecnicos: "",
      investigadores: "0",
      administrativos: "1",
      total: "1",
    },
  ];

  const total = {
    alumnos: "19",
    profesores: "0",
    tecnicos: "0",
    investigadores: "0",
    administrativos: "24", // Suma de los valores de ejemplo
    total: "43", // Suma de los totales de ejemplo
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

          {/* === Pestañas de Plataforma (Simulación) === */}
          <div className="tab-container">
            {/* Solo se muestra la pestaña 'Alto rendimiento Servidores' activa */}
            <div className="tab active">Alto rendimiento Servidores</div>
            <div className="tab inactive">
              Computadoras portátiles Plataforma Apple
            </div>
            {/* ... otras pestañas que no son visibles en la imagen de la tabla ... */}
          </div>

          {/* === Contenido de la Tabla === */}
          <div className="tabla-servidores-container">
            <table className="tabla-servidores">
              <thead>
                <tr>
                  <th rowSpan={2} className="header-servidores">
                    Servidores
                    <br />
                    Tipo de procesador
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
              Consultar el equivalente del procesador
            </button>
          </div>
        </section>

        <div className="boton-contenedor">
          {/* Se asume que este sería el botón de navegación final o de guardar */}
          <Link href="/siguiente-seccion" className="boton siguiente">
            Pregunta 4 →
          </Link>
        </div>
      </div>
    </main>
  );
}
