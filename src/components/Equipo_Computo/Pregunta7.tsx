"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./pregunta7.css";

interface AntiguedadItem {
  antiguedad: string;
  total: number;
  porcentaje?: string;
}

interface RespuestaAntiguedad {
  impresion: AntiguedadItem[];
  digitalizacion: AntiguedadItem[];
}

export default function Pregunta7() {
  const [datos, setDatos] = useState([
    { nombre: "Impresión", valores: ["0.00", "0.00", "0.00", "0.00"] },
    { nombre: "Digitalización", valores: ["0.00", "0.00", "0.00", "0.00"] },
  ]);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const calcularTotal = (valores: string[]) =>
    valores.reduce((acc, val) => acc + (Number(val) || 0), 0);

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(`${api_url}/equipos/reporte/contar_perifericos_antiguedad`, {
        headers,
      })
      .then((res) => {
        const data: RespuestaAntiguedad = res.data;

        const orden = [
          "MENORES DE 2",
          "ENTRE 2 Y 3",
          "ENTRE 4 Y 5",
          "MAYOR A 6",
        ];

        const nuevaTabla = [
          { nombre: "Impresión", totales: [0, 0, 0, 0] },
          { nombre: "Digitalización", totales: [0, 0, 0, 0] },
        ];

        if (Array.isArray(data.impresion)) {
          data.impresion.forEach((item) => {
            const antig = item.antiguedad.toUpperCase().trim();
            const i = orden.indexOf(antig);
            if (i !== -1) nuevaTabla[0].totales[i] = Number(item.total) || 0;
          });
        }

        if (Array.isArray(data.digitalizacion)) {
          data.digitalizacion.forEach((item) => {
            const antig = item.antiguedad.toUpperCase().trim();
            const i = orden.indexOf(antig);
            if (i !== -1) nuevaTabla[1].totales[i] = Number(item.total) || 0;
          });
        }

        const tablaConPorcentajes = nuevaTabla.map((fila) => {
          const totalFila = fila.totales.reduce((a, b) => a + b, 0);

          let valores = ["0", "0", "0", "0"];

          if (totalFila > 0) {
            valores = fila.totales.map((v) =>
              ((v / totalFila) * 100).toFixed(2)
            );
          }

          return { nombre: fila.nombre, valores };
        });

        setDatos(tablaConPorcentajes);
      })
      .catch((err) => {
        console.error("Error cargando datos:", err);
      });
  }, []);

  return (
    <div className="contenedor-pregunta">
      <div className="contenedor-censo">
        Censo de equipos periféricos - Estado del equipo periférico (impresión y
        digitalización.)
      </div>

      <div className="pregunta-cuadro">
        Antigüedad que tienen los equipos periféricos del área universitaria.
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
                        <input type="number" value={valor} disabled />
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
