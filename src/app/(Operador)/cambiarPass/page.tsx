"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import "../../styles/layout/ForgotPasswordPage.scss";

export default function UpdateUserPage() {
  const [nombre, setNombre] = useState("");
  const [contrasenaN, setContrasenaN] = useState("");
  const [contrasenaV, setContrasenaV] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || nombre.trim().length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!contrasenaN || contrasenaN.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (!contrasenaV || contrasenaV.length < 6) {
      toast.error("La contraseña actual debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
        {
          nombre,
          contrasenaN,
          contrasenaV,
        },
        { headers }
      );

      toast.success("Usuario actualizado correctamente");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="forgot-password-page">
      <div className="forgot-form-container">
        <h1>Actualizar contraseña</h1>
        <form onSubmit={handleSubmit} className="forgot-form">
          
          <div>
            <label>Nombre (opcional)</label>
            <input
              type="text"
              placeholder="Nuevo nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label>Nueva contraseña (opcional)</label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={contrasenaN}
              onChange={(e) => setContrasenaN(e.target.value)}
            />
          </div>

          <div>
            <label>Contraseña actual (opcional)</label>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={contrasenaV}
              onChange={(e) => setContrasenaV(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </section>
  );
}
