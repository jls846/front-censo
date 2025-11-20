"use client";

import React from "react";

import "./pregunta_4.css";

export default function Pregunta4() {
  return (
    <main className="pregunta-page">
      <header className="brand"></header>

      <section className="card">

        <label className="question-label">
          ¿Cuántos servidores son ocupados en producción?
        </label>

        <input type="number" className="single-input" />

      </section>
    </main>
  );
}
