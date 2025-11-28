"use client";
import { useState, useEffect } from "react";
import "@/app/styles/layout/pregunta4EP.scss";
import Cookies from "js-cookie";
import axios from "axios";
import ToggleButton from "../Toggle/ToggleButton";

interface EquiposDigitalizacion {
  digitalizadorCamaPlana: string;
  d3D: string;
  digitalizadorAlimentador: string;
  digitalizadorGranVolumen: string;
}

export default function Pregunta4EP() {
  const [equipos, setEquipos] = useState<EquiposDigitalizacion>({
    digitalizadorCamaPlana: "0",
    d3D: "0",
    digitalizadorAlimentador: "0",
    digitalizadorGranVolumen: "0",
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .post(
        `${api_url}/equipos/reporte/equipos_impesion_group/dijitales`,
        ["EN DESUSO", "EN USO"],
        {
          headers,
        }
      )
      .then((res) => {
        const data = res.data;

        const valores = {
          digitalizadorCamaPlana: "0",
          d3D: "0",
          digitalizadorAlimentador: "0",
          digitalizadorGranVolumen: "0",
        };

        data.forEach((item: any) => {
          const periferico = item.periferico.toUpperCase().trim();
          const total = item.total ?? "0";

          switch (periferico) {
            case "DIGITALIZADOR DE CAMA PLANA PARA OFICINA":
              valores.digitalizadorCamaPlana = total;
              break;

            case "3D":
              valores.d3D = total;
              break;

            case "DIGITALIZADOR CON ALIMENTADOR DE HOJAS PARA OFICINA":
              valores.digitalizadorAlimentador = total;
              break;

            case "DIGITALIZADOR DE GRAN VOLUMEN":
              valores.digitalizadorGranVolumen = total;
              break;
          }
        });

        setEquipos(valores);
      })

      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div className="container">
      <div className="contenedor-censo">
        Censo de equipos periféricos - Equipo de digitalización
      </div>

      <div className="pregunta-cuadro">
        Número de equipos de digitalización.
        <ToggleButton />
      </div>

      <div className="grid">
        <div className="item">
          <label htmlFor="digitalizadorCamaPlana">
            Digitalizador de cama plana para oficina
          </label>
          <input
            type="text"
            id="digitalizadorCamaPlana"
            name="digitalizadorCamaPlana"
            value={equipos.digitalizadorCamaPlana}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="digitalizador3d">3D</label>
          <input
            type="text"
            id="digitalizador3d"
            name="digitalizador3d"
            value={equipos.d3D}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="digitalizadorAlimentador">
            Digitalizador con alimentador de hojas para oficina
          </label>
          <input
            type="text"
            id="digitalizadorAlimentador"
            name="digitalizadorAlimentador"
            value={equipos.digitalizadorAlimentador}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="digitalizadorGranVolumen">
            Digitalizador de gran volumen
          </label>
          <input
            type="text"
            id="digitalizadorGranVolumen"
            name="digitalizadorGranVolumen"
            value={equipos.digitalizadorGranVolumen}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
