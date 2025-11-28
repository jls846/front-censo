"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./pregunta9.css";
import Pregunta10 from "./pregunta10";
import ToggleButton from "../Toggle/ToggleButton";

type AntiguedadItem = {
  antiguedad: string | null;
  total: string;
  porcentaje: string; 
};

type ApiResponse = {
  escritorios: AntiguedadItem[];
  portatiles: AntiguedadItem[];
  altoRendimiento: AntiguedadItem[];
};

export default function Pregunta9() {
  const [datos, setDatos] = useState([
    { nombre: "Computadoras de Escritorio", valores: ["0.00", "0.00", "0.00", "0.00","0.00"] },
    { nombre: "Computadoras Portátiles", valores: ["0.00", "0.00", "0.00", "0.00","0.00"] },
    { nombre: "Alto Rendimiento", valores: ["0.00", "0.00", "0.00", "0.00","0.00"] },
  ]);

  const [loading, setLoading] = useState(true);

  // Transforma los datos del backend al formato de 4 columnas con % calculados
  const transformarDatos = (items: AntiguedadItem[]): string[] => {

    let menores2 = 0;
    let entre2_3 = 0;
    let entre4_6 = 0;

    let mayores6 = 0;
    let notfound = 0;

    for (const item of items) {
      const total = Number(item.total) || 0;

      switch (item.antiguedad) {
        case "MENORES DE 2":
          menores2 += total;
          break;
        case "ENTRE 2 Y 3":
          entre2_3 += total;
          break;
        case "ENTRE 4 Y 5":
          entre4_6 += total;
          break;
        case "ENTRE 6 Y MAYORES":
          mayores6 += total;
          break;
                // Cualquier otro valor (aunque no debería haber) lo meteríamos en mayores6
        default:notfound += total; break;
      }
    }

    const totalEquipo = menores2 + mayores6+ entre2_3 + entre4_6 + notfound;

    if (totalEquipo === 0) {
      return ["0.00", "0.00", "0.00", "0.00","0.00"];
    }

    const pct = (valor: number) => ((valor / totalEquipo) * 100).toFixed(2);

    return [pct(menores2), pct(entre2_3), pct(entre4_6), pct(mayores6),pct(notfound)];
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token no encontrado");
      setLoading(false);
      return;
    }

    axios
      .get<ApiResponse>("https://venus.acatlan.unam.mx/censo_test/equipos/reporte/tipoEquipos_antiguedad", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { escritorios, portatiles, altoRendimiento } = res.data;

        setDatos([
          {
            nombre: "Computadoras de Escritorio",
            valores: transformarDatos(escritorios),
          },
          {
            nombre: "Computadoras Portátiles",
            valores: transformarDatos(portatiles),
          },
          {
            nombre: "Alto Rendimiento",
            valores: transformarDatos(altoRendimiento),
          },
        ]);
      })
      .catch((err) => {
        console.error("Error al cargar datos de antigüedad", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const calcularTotalFila = (valores: string[]) =>
    valores.reduce((sum, val) => sum + parseFloat(val), 0);

  if (loading) {
    return <div className="contenedor-pregunta">Cargando datos...</div>;
  }

  return (
    <div className="contenedor-pregunta">
      <div className="contenedor-censo">Censo de equipos de cómputo - Generales</div>
      {/* Pregunta intro (servidores) */}
      {/* <div className="pregunta-cuadro" style={{ marginTop: "30px" }}>
        Indique cuantos servidores son utilizados en ambientes productivos y si en ellos se almacenan datos personales.
      </div>
      
      <Pregunta4/> */}

      {/* Pregunta 9: Antigüedad */}
      <div className="pregunta-cuadro">
        Antigüedad que tienen los equipos de cómputo del área universitaria.<ToggleButton/>
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
                  {fila.valores.map((valor, colIdx) => (
                    <td key={colIdx}>
                      <div className="input-contenedor">
                        <input
                          type="number"
                          step="0.01"
                          value={valor}
                          readOnly
                        />
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

      <Pregunta10/>

    </div>
  );
}