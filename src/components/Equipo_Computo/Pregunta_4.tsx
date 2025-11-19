"use client";

import React from "react";

import "./pregunta_4.css";

export default function Pregunta4() {
  return (
    <main className="pregunta-page">
      <header className="brand"></header>

      <section className="card">
        <h2>Generales</h2>

        <label className="question-label">
          ¿Cuántos servidores son ocupados en producción?
        </label>

        <input type="number" defaultValue={34} className="single-input" />

        <p className="hint">Servidor y Uso</p>
      </section>
    </main>
  );
}
