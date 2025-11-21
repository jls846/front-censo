"use client";
import React, { useState, useEffect } from "react";
import style from "./pregunta1EP.module.scss";

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
  });

  // 🔹 Preparado para conectar con API del backend
  useEffect(() => {
    // Cuando te den la API, descomenta y edita la URL 👇
    /*
    fetch("https://tu-api-backend.com/api/equipos-impresion")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("Error al obtener datos:", err));
    */
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEquipos({
      ...equipos,
      [e.target.name]: e.target.value,
    });
  };

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
      </div>
    </div>
  );
}
