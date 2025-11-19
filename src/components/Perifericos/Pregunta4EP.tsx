"use client";
import React, { useState, useEffect } from "react";
import "@/app/styles/layout/pregunta4EP.scss";

interface EquiposDigitalizacion {
  digitalizadorCamaPlana: string;
  digitalizador3d: string;
  digitalizadorAlimentador: string;
  digitalizadorGranVolumen: string;
}

export default function Pregunta4EP() {
  const [equipos, setEquipos] = useState<EquiposDigitalizacion>({
    digitalizadorCamaPlana: "27",
    digitalizador3d: "",
    digitalizadorAlimentador: "108",
    digitalizadorGranVolumen: "1",
  });

  // 🔹 Preparado para conectar con el backend
  useEffect(() => {
    // Cuando tengas la API, descomenta y reemplaza la URL:
    /*
    fetch("https://tu-api-backend.com/api/equipos-digitalizacion")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("Error al obtener datos:", err));
    */
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEquipos({
      ...equipos,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="contenedor-censo">
        Censo de equipos periféricos - Equipo de digitalización
      </div>

      <div className="pregunta-cuadro">
        4. Desglose el número de equipos de digitalización con que cuenta el
        área universitaria.
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
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="digitalizador3d">3D</label>
          <input
            type="text"
            id="digitalizador3d"
            name="digitalizador3d"
            value={equipos.digitalizador3d}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
