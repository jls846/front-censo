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
    inyeccionTinta: "7",
    laserPequenaBN: "186",
    matrizPuntos: "",
    laserAltoVolumenBN: "28",
    laserPequenaColor: "20",
    multifuncionales: "108",
    laserAltoVolumenColor: "18",
    impresora3D: "2",
    plotter: "11",
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

      <div className="pregunta-cuadro">
        Desglose el número de equipos de impresión con que cuenta el área
        universitaria.
      </div>

      <div className={style.grid}>
        {/* Columna 1 */}
        <div className="item">
          <label htmlFor="inyeccionTinta">Inyección de tinta</label>
          <input
            type="text"
            id="inyeccionTinta"
            name="inyeccionTinta"
            value={equipos.inyeccionTinta}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="laserPequenaBN">Láser pequeña B/N</label>
          <input
            type="text"
            id="laserPequenaBN"
            name="laserPequenaBN"
            value={equipos.laserPequenaBN}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="matrizPuntos">Matriz de puntos</label>
          <input
            type="text"
            id="matrizPuntos"
            name="matrizPuntos"
            value={equipos.matrizPuntos}
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="laserPequenaColor">Láser pequeña Color</label>
          <input
            type="text"
            id="laserPequenaColor"
            name="laserPequenaColor"
            value={equipos.laserPequenaColor}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="multifuncionales">Multifuncionales</label>
          <input
            type="text"
            id="multifuncionales"
            name="multifuncionales"
            value={equipos.multifuncionales}
            onChange={handleChange}
          />
        </div>

        {/* Columna 3 */}
        <div className="item">
          <label htmlFor="laserAltoVolumenColor">
            Láser de alto volumen Color
          </label>
          <input
            type="text"
            id="laserAltoVolumenColor"
            name="laserAltoVolumenColor"
            value={equipos.laserAltoVolumenColor}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="impresora3D">3D</label>
          <input
            type="text"
            id="impresora3D"
            name="impresora3D"
            value={equipos.impresora3D}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="plotter">Plotter</label>
          <input
            type="text"
            id="plotter"
            name="plotter"
            value={equipos.plotter}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
