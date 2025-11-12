"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/layout/ForgotPasswordPage.scss";
import Link from "next/link";

export default function Page() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (nombre.trim().length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (contraseña.trim().length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/admin/change-password", {
        nombre,
        contraseña,
      });

      if (res.status === 200) {
        toast.success("Contraseña actualizada correctamente.");
        setNombre("");
        setContraseña("");
      } else {
        toast.error("No se pudo cambiar la contraseña.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al cambiar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot-password-page">
      <div>

        <h1>Cambiar contraseña  de operador</h1>
        <p>Ingresa el nombre del usuario y su nueva contraseña.</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <label htmlFor="nombre">Nombre de usuario</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de usuario"
            required
          />

          <label htmlFor="contraseña">Nueva contraseña</label>
          <input
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Nueva contraseña"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Cambiar contraseña"}
          </button>

        </form>
      </div>
    </section>
  );
}
