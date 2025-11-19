"use client";
import React, { useState } from "react";
import "./pregunta1.1.css";

export default function Pregunta1() {
  const [datos, setDatos] = useState([
    { nombre: "Windows", valores: ["", "", "", "", ""] },
    { nombre: "Linux", valores: ["", "", "", "", ""] },
    { nombre: "Mac OS", valores: ["", "", "", "", ""] },
    { nombre: "Total", valores: ["", "", "", "", ""] },
  ]);

  const handleChange = (filaIndex: number, colIndex: number, value: string) => {
    const nuevosDatos = [...datos];
    nuevosDatos[filaIndex].valores[colIndex] = value;
    setDatos(nuevosDatos);
  };

  const calcularTotalFila = (valores: string[]) =>
    valores.reduce((acc, val) => acc + (Number(val) || 0), 0);

  const calcularTotalesColumnas = () => {
    const numColumnas = datos[0].valores.length;
    const totales = Array(numColumnas).fill(0);
    datos.slice(0, -1).forEach((fila) => {
      fila.valores.forEach((valor, colIndex) => {
        totales[colIndex] += Number(valor) || 0;
      });
    });
    return totales;
  };

  const totalesColumnas = calcularTotalesColumnas();

  // Títulos de las tablas
  const tablas = [
    "Computadoras de escritorio",
    "Tabletas",
    "Computadoras portátiles",
    "Alto rendimiento",
  ];

  // Función para renderizar una tabla
  const renderTabla = (titulo: string) => (
    <div className="tabla-contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th className="azul-marino">{titulo}</th>
            <th className="rosa-fuerte">Alumnos</th>
            <th className="rosa-fuerte">Profesores</th>
            <th className="rosa-fuerte">Técnicos Académicos</th>
            <th className="rosa-fuerte">Investigadores</th>
            <th className="rosa-fuerte">Administrativos</th>
            <th className="azul-marino">Total</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((fila, filaIndex) => {
            if (fila.nombre === "Total") {
              const totalGeneral = calcularTotalFila(
                totalesColumnas.map(String)
              );
              return (
                <tr key={filaIndex} className="fila-total">
                  <td className="negrita">{fila.nombre}</td>
                  {totalesColumnas.map((colTotal, i) => (
                    <td key={i}>{colTotal}</td>
                  ))}
                  <td className="negrita">{totalGeneral}</td>
                </tr>
              );
            }

            const totalFila = calcularTotalFila(fila.valores);
            return (
              <tr key={filaIndex}>
                <td>{fila.nombre}</td>
                {fila.valores.map((valor, colIndex) => (
                  <td key={colIndex}>
                    <div className="input-contenedor">
                      <input
                        type="number"
                        value={valor}
                        onChange={(e) =>
                          handleChange(filaIndex, colIndex, e.target.value)
                        }
                      />
                    </div>
                  </td>
                ))}
                <td
                  className={`total-celda ${
                    totalFila > 100 ? "total-error" : ""
                  }`}
                >
                  {totalFila}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="contenedor-pregunta">
      <div className="contenedor-censo">Censo de equipos de cómputo</div>

      <div className="pregunta-cuadro">
        1. Desglose en cada renglón, el número de equipos de cómputo dedicado por cada categoría
        enlistada, de acuerdo con el perfil de usuario al que se destina su uso primordialmente. *
      </div>

      {/* FILA SUPERIOR */}
      <div className="contenedor-tablas">
        {renderTabla(tablas[0])}
        {renderTabla(tablas[1])}
      </div>

      {/* FILA INFERIOR */}
      <div className="contenedor-tablas">
        {renderTabla(tablas[2])}
        {renderTabla(tablas[3])}
      </div>
    </div>
  );
}
