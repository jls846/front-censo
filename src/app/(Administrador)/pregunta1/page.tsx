"use client";

import React from "react";
import Link from "next/link";
import "./page1.css"; //  Importamos los estilos

export default function Pregunta1() {
  return (
    <main className="pregunta-page pregunta1">
      <div className="pregunta-container">
        <h1 className="pregunta-titulo">PREGUNTA 1</h1>

        <section className="pregunta-seccion">
          <p className="pregunta-texto">
            1. Desglose el número de equipos de impresión con que cuenta el área
            universitaria.
          </p>

          <div className="pregunta-grid">
            <div>
              <label>Inyección de tinta</label>
              <input value="7" readOnly />
            </div>
            <div>
              <label>Láser pequeña B/N</label>
              <input value="186" readOnly />
            </div>
            <div>
              <label>Láser de alto volumen B/N</label>
              <input value="28" readOnly />
            </div>
            <div>
              <label>Láser de alto volumen Color</label>
              <input value="18" readOnly />
            </div>
            <div>
              <label>Láser pequeña Color</label>
              <input value="20" readOnly />
            </div>
            <div>
              <label>Multifuncionales</label>
              <input value="108" readOnly />
            </div>
            <div>
              <label>Matriz de puntos</label>
              <input value="" readOnly />
            </div>
            <div>
              <label>3D</label>
              <input value="2" readOnly />
            </div>
            <div>
              <label>Plotter</label>
              <input value="11" readOnly />
            </div>
          </div>
        </section>

        <div className="boton-contenedor">
          <Link href="/pregunta2" className="boton siguiente">
            Ir a Pregunta 2 →
          </Link>
        </div>
      </div>
    </main>
  );
}
