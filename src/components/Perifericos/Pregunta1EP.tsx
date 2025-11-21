"use client";
import React, { useState, useEffect } from "react";
import style from "./pregunta1EP.module.scss";
import axios from "axios";
import Cookies from "js-cookie";

interface EquiposImpresion {
  inyeccionTinta: string;
  laserPequenaBN: string;
  matrizPuntos: string;
  laserAltoVolumenBN: string;
  laserPequenaColor: string;
  multifuncionales: string;
  laserAltoVolumenColor: string;
  impresora3D: string;
  plotter: string;
  // credencial: string;
}

export default function Pregunta1EP() {
  const [equipos, setEquipos] = useState<EquiposImpresion>({
    inyeccionTinta: "0",
    laserPequenaBN: "0",
    matrizPuntos: "0",
    laserAltoVolumenBN: "0",
    laserPequenaColor: "0",
    multifuncionales: "0",
    laserAltoVolumenColor: "0",
    impresora3D: "0",
    plotter: "0",
    // credencial: "0",
  });

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(`${api_url}/equipos/reporte/equipos_impesion_group/impresoras`, {
        headers,
      })
      .then((res) => {
        const data = res.data;

        const valores = {
          inyeccionTinta: "0",
          laserPequenaBN: "0",
          matrizPuntos: "0",
          laserAltoVolumenBN: "0",
          laserPequenaColor: "0",
          multifuncionales: "0",
          laserAltoVolumenColor: "0",
          impresora3D: "0",
          plotter: "0",
          // credencial: "0",
        };

        data.forEach((item: any) => {
          const uso = item.periferico.toUpperCase().trim();
          const total = item.total ?? "0";

          switch (uso) {
            case "INYECCIÓN TINTA":
              valores.inyeccionTinta = total;
              break;

            case "LÁSER PEQUEÑA B/N":
              valores.laserPequenaBN = total;
              break;

            case "MATRIZ DE PUNTOS":
              valores.matrizPuntos = total;
              break;

            case "LÁSER DE ALTO VOLUMEN B/N":
              valores.laserAltoVolumenBN = total;
              break;

            case "LÁSER PEQUEÑA COLOR":
              valores.laserPequenaColor = total;
              break;

            case "MULTIFUNCIONALES":
              valores.multifuncionales = total;
              break;

            case "LÁSER DE ALTO VOLUMEN COLOR":
              valores.laserAltoVolumenColor = total;
              break;
            case "3D":
              valores.impresora3D = total;
              break;
            // case "IMPRESORA CREDENCIALES":
            //   valores.credencial = total;
            //   break;
            case "PLOTTER":
              valores.plotter = total;
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
        Censo de equipos periféricos - Equipo de Impresion
      </div>

      <div className="pregunta-cuadro">Equipos de impresión.</div>

      <div className={style.grid}>
        {/* Columna 1 */}
        <div className="item">
          <label htmlFor="inyeccionTinta">Inyección de tinta</label>
          <input
            type="text"
            id="inyeccionTinta"
            name="inyeccionTinta"
            value={equipos.inyeccionTinta}
            disabled
          />
        </div>

        {/* Columna 2 */}
        <div className="item">
          <label htmlFor="laserAltoVolumenBN">Láser de alto volumen B/N</label>
          <input
            type="text"
            id="laserAltoVolumenBN"
            name="laserAltoVolumenBN"
            value={equipos.laserAltoVolumenBN}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="laserAltoVolumenColor">
            Láser de alto volumen Color
          </label>
          <input
            type="text"
            id="laserAltoVolumenColor"
            name="laserAltoVolumenColor"
            value={equipos.laserAltoVolumenColor}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="laserPequenaBN">Láser pequeña B/N</label>
          <input
            type="text"
            id="laserPequenaBN"
            name="laserPequenaBN"
            value={equipos.laserPequenaBN}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="laserPequenaColor">Láser pequeña Color</label>
          <input
            type="text"
            id="laserPequenaColor"
            name="laserPequenaColor"
            value={equipos.laserPequenaColor}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="impresora3D">3D</label>
          <input
            type="text"
            id="impresora3D"
            name="impresora3D"
            value={equipos.impresora3D}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="matrizPuntos">Matriz de puntos</label>
          <input
            type="text"
            id="matrizPuntos"
            name="matrizPuntos"
            value={equipos.matrizPuntos}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="multifuncionales">Multifuncionales</label>
          <input
            type="text"
            id="multifuncionales"
            name="multifuncionales"
            value={equipos.multifuncionales}
            disabled
          />
        </div>

        <div className="item">
          <label htmlFor="plotter">Plotter</label>
          <input
            type="text"
            id="plotter"
            name="plotter"
            value={equipos.plotter}
            disabled
          />
        </div>

        {/* <div className="item">
          <label>Credencial</label>
          <input
            type="text"
            value={equipos.credencial}
            disabled
          />
        </div> */}
      </div>
    </div>
  );
}
