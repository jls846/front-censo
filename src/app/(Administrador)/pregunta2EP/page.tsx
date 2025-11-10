"use client";
import React, { useState, useEffect } from "react";
import "../../styles/layout/pregunta2EP.scss";

interface EquiposPoblacion {
  alumnos: string;
  profesores: string;
  tecnicosAcademicos: string;
  investigadores: string;
  administrativos: string;
  total: string;
}

export default function Pregunta2EPPage() {
  const [equipos, setEquipos] = useState<EquiposPoblacion>({
    alumnos: "35",
    profesores: "43",
    tecnicosAcademicos: "",
    investigadores: "",
    administrativos: "302",
    total: "380",
  });

  // 🔹 Preparado para conectarse al backend
  useEffect(() => {
    // Cuando tengas la API, descomenta esta parte 👇 y reemplaza la URL:
    /*
    fetch("https://tu-api-backend.com/api/equipos-poblacion")
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
      <div className="header">
        <span style={{ color: "#d9534f", fontWeight: "normal" }}>*</span>{" "}
        <small>(Requerido en el caso de contar con Equipo de impresión)</small>
      </div>

      <div className="row">
        <div className="item">
          <label htmlFor="alumnos">Alumnos</label>
          <input
            type="text"
            id="alumnos"
            name="alumnos"
            value={equipos.alumnos}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="profesores">
            Profesores <span className="help-icon">?</span>
          </label>
          <input
            type="text"
            id="profesores"
            name="profesores"
            value={equipos.profesores}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="tecnicosAcademicos">Técnicos Académicos</label>
          <input
            type="text"
            id="tecnicosAcademicos"
            name="tecnicosAcademicos"
            value={equipos.tecnicosAcademicos}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="investigadores">
            Investigadores <span className="help-icon">?</span>
          </label>
          <input
            type="text"
            id="investigadores"
            name="investigadores"
            value={equipos.investigadores}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="administrativos">
            Administrativos <span className="help-icon">?</span>
          </label>
          <input
            type="text"
            id="administrativos"
            name="administrativos"
            value={equipos.administrativos}
            onChange={handleChange}
          />
        </div>

        <div className="item">
          <label htmlFor="total">Total</label>
          <input
            type="text"
            id="total"
            name="total"
            value={equipos.total}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
