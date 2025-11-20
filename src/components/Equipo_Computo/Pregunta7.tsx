"use client";
import React, { useState } from "react";
import "./pregunta7.css";

export default function Pregunta7() {
  const [datos, setDatos] = useState([
    { nombre: "Impresión", valores: ["", "", "", ""] },
    { nombre: "Digitalización", valores: ["", "", "", ""] },
  ]);

  // Función para calcular total de cada fila en Pregunta 7
  const calcularTotal = (valores: string[]) =>
    valores.reduce((acc, val) => acc + (Number(val) || 0), 0);

  return (
    <div className="contenedor-pregunta">
      {/* Pregunta 7 */}
      <div className="contenedor-censo">
        Censo de equipos periféricos - Estado del equipo periférico (impresión y
        digitalización.)
      </div>

      <div className="pregunta-cuadro">
        Antiguedad que tienen los equipos
        periféricos del área universitaria.
      </div>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th className="azul-marino">% Antiguedad de los equipos</th>
              <th className="rosa-fuerte">Menor a 2 años</th>
              <th className="rosa-fuerte">Entre 2 y 3 años</th>
              <th className="rosa-fuerte">Entre 4 y 5 años</th>
              <th className="rosa-fuerte">Mayor a 6 años</th>
              <th className="azul-marino">Total</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, filaIndex) => {
              const total = calcularTotal(fila.valores);
              return (
                <tr key={filaIndex}>
                  <td>{fila.nombre}</td>
                  {fila.valores.map((valor, colIndex) => (
                    <td key={colIndex}>
                      <div className="input-contenedor">
                        <input
                          type="number"
                          value={valor}
                          disabled             
                        />
                        <span className="porcentaje">%</span>
                      </div>
                    </td>
                  ))}
                  <td
                    className={`total-celda ${
                      total > 100 ? "total-error" : ""
                    }`}
                  >
                    {total.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
