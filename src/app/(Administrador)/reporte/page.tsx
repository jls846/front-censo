"use client";

import React, { useState } from "react";
import Pregunta1 from "@/components/Preguanta1"; // Asegúrate que el nombre del archivo sea correcto
import Pregunta2 from "@/components/Pregunta2";
import Pregunta9 from "@/components/Pregunta9";
import "../../styles/layout/reporte.scss";

export default function Reporte() {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen9, setIsOpen9] = useState(true);

  return (
    <div className="reporte-container">
      <h1 className="titulo-reporte">Reporte General de Preguntas</h1>

      <div className="reporte-contenido">
        {/* Pregunta 1 */}
        <div className="bloque-pregunta">
          <div className="accordion-header-wrapper">
            <button
              className="accordion-header"
              onClick={() => setIsOpen1(!isOpen1)}
              aria-expanded={isOpen1}
              aria-controls="accordion-pregunta1"
            >
              <span>Estadísticas de Plataformas</span>
              <span className={`toggle-icon ${isOpen1 ? "open" : ""}`}>▼</span>
            </button>
          </div>
          <div
            id="accordion-pregunta1"
            className={`accordion-content ${isOpen1 ? "open" : ""}`}
            aria-hidden={!isOpen1}
          >
            <Pregunta1 />
          </div>
        </div>

        {/* Pregunta 2 */}
        <div className="bloque-pregunta">
          <div className="accordion-header-wrapper">
            <button
              className="accordion-header"
              onClick={() => setIsOpen2(!isOpen2)}
              aria-expanded={isOpen2}
              aria-controls="accordion-pregunta2"
            >
              <span>Pregunta 2</span> {/* ← Cambia el título */}
              <span className={`toggle-icon ${isOpen2 ? "open" : ""}`}>▼</span>
            </button>
          </div>
          <div
            id="accordion-pregunta2" 
            className={`accordion-content ${isOpen2 ? "open" : ""}`}
            aria-hidden={!isOpen2}
          >
            <Pregunta2 />
          </div>
        </div>

        {/* Pregunta 9 */}
        <div className="bloque-pregunta">
          <div className="accordion-header-wrapper">
            <button
              className="accordion-header"
              onClick={() => setIsOpen9(!isOpen9)}
              aria-expanded={isOpen9}
              aria-controls="accordion-pregunta9" 
            >
              <span>9. Calcule porcentualmente (%) la antigüedad que tienen los equipos de cómputo del área universitaria. *</span> {/* ← Título correcto */}
              <span className={`toggle-icon ${isOpen9 ? "open" : ""}`}>▼</span>
            </button>
          </div>
          <div
            id="accordion-pregunta9"
            className={`accordion-content ${isOpen9 ? "open" : ""}`}
            aria-hidden={!isOpen9}
          >
            <Pregunta9 />
          </div>
        </div>
      </div>
    </div>
  );
}