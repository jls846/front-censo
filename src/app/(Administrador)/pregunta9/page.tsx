"use client";
import React, { useState } from "react";
import "./pregunta9.css";

export default function Pregunta9() {
  // Estado para Pregunta 9
  const [datos, setDatos] = useState([
    { nombre: "Computadoras de Escritorio", valores: ["", "", "", ""] },
    { nombre: "Computadoras Portátiles", valores: ["", "", "", ""] },
    { nombre: "Alto Rendimiento", valores: ["", "", "", ""] },
  ]);

  // Estado para Pregunta 10
  const [garantia, setGarantia] = useState({
    escritorio: "",
    portatil: "",
    altoRendimiento: "",
  });

  // Función para actualizar datos de Pregunta 9
  const handleChange = (filaIndex: number, colIndex: number, value: string) => {
    const nuevosDatos = [...datos];
    nuevosDatos[filaIndex].valores[colIndex] = value;
    setDatos(nuevosDatos);
  };

  // Función para calcular total de cada fila en Pregunta 9
  const calcularTotal = (valores: string[]) =>
    valores.reduce((acc, val) => acc + (Number(val) || 0), 0);

  return (
    <div className="contenedor-pregunta">
      {/* Pregunta 9 */}
     

      <div className="pregunta-cuadro">
        9. Calcule porcentualmente (%) la antigüedad que tienen los equipos de
        cómputo del área universitaria. *
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
                          onChange={(e) =>
                            handleChange(filaIndex, colIndex, e.target.value)
                          }
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

      {/* Pregunta 10 */}
      <div className="pregunta-cuadro" style={{ marginTop: "30px" }}>
        10. ¿Cuántos equipos de cómputo tienen garantía de proveedor?. *
      </div>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th className="azul-marino">Computadoras de Escritorio (247)</th>
              <th className="azul-marino">Computadoras Portátiles (767)</th>
              <th className="azul-marino">Alto Rendimiento (17)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="input-contenedor input-sin-porcentaje">
                  <input
                    type="number"
                    value={garantia.escritorio}
                    onChange={(e) =>
                      setGarantia({ ...garantia, escritorio: e.target.value })
                    }
                  />
                </div>
              </td>
              <td>
                <div className="input-contenedor input-sin-porcentaje">
                  <input
                    type="number"
                    value={garantia.portatil}
                    onChange={(e) =>
                      setGarantia({ ...garantia, portatil: e.target.value })
                    }
                  />
                </div>
              </td>
              <td>
                <div className="input-contenedor input-sin-porcentaje">
                  <input
                    type="number"
                    value={garantia.altoRendimiento}
                    onChange={(e) =>
                      setGarantia({ ...garantia, altoRendimiento: e.target.value })
                    }
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
