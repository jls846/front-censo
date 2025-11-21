"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./pregunta10.css";

export default function Pregunta10() {
  const [garantia, setGarantia] = useState({
    escritorio: "",
    portatil: "",
    altoRendimiento: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Token no encontrado");
      setLoading(false);
      return;
    }

    axios
      .get<number[]>("https://venus.acatlan.unam.mx/censo_test/equipos/reporte/garantia", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const [escritorio, portatil, altoRendimiento] = res.data;

        setGarantia({
          escritorio: escritorio?.toString() || "0",
          portatil: portatil?.toString() || "0",
          altoRendimiento: altoRendimiento?.toString() || "0",
        });
      })
      .catch((err) => {
        console.error("Error al cargar datos de garantía", err);
        setGarantia({ escritorio: "0", portatil: "0", altoRendimiento: "0" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pregunta-cuadro" style={{ marginTop: "30px" }}>
        Cargando datos de garantía...
      </div>
    );
  }

  return (
    <>
      <div className="pregunta-cuadro" style={{ marginTop: "30px" }}>
        Equipos de cómputo que tienen garantía de proveedor
      </div>

      <div className="tabla-contenedor">
        <table className="tabla">
          <thead>
            <tr>
              <th className="azul-marino">Computadoras de Escritorio</th>
              <th className="azul-marino">Computadoras Portátiles</th>
              <th className="azul-marino">Alto Rendimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="input-contenedor input-sp">
                  <input
                    type="number"
                    value={garantia.escritorio}
                    readOnly 
                  />
                </div>
              </td>
              <td>
                <div className="input-contenedor input-sp">
                  <input
                    type="number"
                    value={garantia.portatil}
                    readOnly
                  />
                </div>
              </td>
              <td>
                <div className="input-contenedor input-sp">
                  <input
                    type="number"
                    value={garantia.altoRendimiento}
                    readOnly
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}