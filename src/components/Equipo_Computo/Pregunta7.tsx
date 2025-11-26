"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./pregunta7.css";

type AntiguedadItem = {
  antiguedad: string | null;
  total: number | string;
};

type RespuestaAntiguedad = {
  impresion: AntiguedadItem[];
  digitalizacion: AntiguedadItem[];
};

export default function Pregunta7() {
  const [datos, setDatos] = useState([
    { nombre: "Impresión", valores: ["0.00", "0.00", "0.00", "0.00", "0.00"] },
    {
      nombre: "Digitalización",
      valores: ["0.00", "0.00", "0.00", "0.00", "0.00"],
    },
  ]);

  const [loading, setLoading] = useState(true);

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  // ------------------------------
  // TRANSFORMADOR (maneja null)
  // ------------------------------
  const transformarDatos = (items: AntiguedadItem[]): string[] => {
    let menores2 = 0;
    let entre2_3 = 0;
    let entre4_5 = 0;
    let mayores6 = 0;
    let notfound = 0;

    for (const item of items) {
      const total = Number(item.total) || 0;
      const antig = item.antiguedad ? item.antiguedad.toUpperCase().trim() : null;

      switch (antig) {
        case "MENORES DE 2":
          menores2 += total;
          break;
        case "ENTRE 2 Y 3":
          entre2_3 += total;
          break;
        case "ENTRE 4 Y 5":
          entre4_5 += total;
          break;
        case "ENTRE 6 Y MAYORES":
          mayores6 += total;
          break;
        default:
          notfound += total; // incluye null
      }
    }

    const total = menores2 + entre2_3 + entre4_5 + mayores6 + notfound;

    if (total === 0) return ["0.00", "0.00", "0.00", "0.00", "0.00"];

    const pct = (v: number) => ((v / total) * 100).toFixed(2);

    return [
      pct(menores2),
      pct(entre2_3),
      pct(entre4_5),
      pct(mayores6),
      pct(notfound),
    ];
  };

  // ------------------------------
  // CARGA DE DATOS
  // ------------------------------
  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .get<RespuestaAntiguedad>(
        `${api_url}/equipos/reporte/contar_perifericos_antiguedad`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const { impresion, digitalizacion } = res.data;

        setDatos([
          { nombre: "Impresión", valores: transformarDatos(impresion) },
          { nombre: "Digitalización", valores: transformarDatos(digitalizacion) },
        ]);
      })
      .catch((err) => console.error("Error cargando datos:", err))
      .finally(() => setLoading(false));
  }, []);

  const calcularTotalFila = (valores: string[]) =>
    valores.reduce((t, v) => t + Number(v), 0);

  if (loading) return <div className="contenedor-pregunta">Cargando datos...</div>;

  return (
    <div className="contenedor-pregunta">
      <div className="pregunta-cuadro" style={{ marginTop: "30px" }}>
        Antigüedad que tienen los equipos periféricos del área universitaria.
      </div>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th className="azul-marino">% Antigüedad de los equipos</th>
              <th className="rosa-fuerte">Menor a 2 años</th>
              <th className="rosa-fuerte">Entre 2 y 3 años</th>
              <th className="rosa-fuerte">Entre 4 y 5 años</th>
              <th className="rosa-fuerte">Mayor a 6 años</th>
              <th className="rosa-fuerte">No registrados</th>
              <th className="azul-marino">Total</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((fila, idx) => {
              const total = calcularTotalFila(fila.valores);

              return (
                <tr key={idx}>
                  <td>{fila.nombre}</td>

                  {fila.valores.map((v, c) => (
                    <td key={c}>
                      <div className="input-contenedor">
                        <input type="number" value={v} readOnly />
                        <span className="porcentaje">%</span>
                      </div>
                    </td>
                  ))}

                  <td className={`total-celda ${total > 100.1 ? "total-error" : ""}`}>
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
