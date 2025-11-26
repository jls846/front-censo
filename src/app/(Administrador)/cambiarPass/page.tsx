"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/layout/ForgotPasswordPage.scss";

export default function UpdateUserPage() {
  const [id_User, setId_User] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [loading, setLoading] = useState(false);

  const userIdList = [1, 2, 3, 10, 11, 12, 100, 101, 150];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id_User || isNaN(Number(id_User))) {
      toast.error("El ID de usuario es obligatorio y debe ser un número.");
      return;
    }

    if (nombre && nombre.trim().length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (contrasena && contrasena.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (tipoUsuario && isNaN(Number(tipoUsuario))) {
      toast.error("El tipo de usuario debe ser un número.");
      return;
    }

    // 🔒 Tu backend (dejado comentado)
    /*
    setLoading(true);

    try {
      const body = { id_User: Number(id_User) };
      if (nombre) body.nombre = nombre;
      if (contrasena) body.contrasena = contrasena;
      if (tipoUsuario) body.tipoUsuario = Number(tipoUsuario);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rauth/update`,
        body
      );

      toast.success("Usuario actualizado correctamente.");
      setId_User("");
      setNombre("");
      setContrasena("");
      setTipoUsuario("");
    } catch (err) {
      ...
    } finally {
      setLoading(false);
    }
    */

    toast.success("✅ Listo para enviar. Backend aún en desarrollo.");
  };

  return (
    <section className="forgot-password-page">
      <div className="forgot-form-container">
        <h1>Actualizar contraseña</h1>
        <p>Ingresa el ID y los campos que deseas modificar.</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          {/* Input con autocompletar */}
          <div>
            <label>ID de usuario *</label>
            <input
              type="text"
              list="id_suggestions"
              placeholder="ID del usuario"
              value={id_User}
              onChange={(e) => setId_User(e.target.value)}
              required
            />
          </div>

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
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div>
            <label>Tipo de usuario (opcional)</label>
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="">Seleccionar tipo</option>
              <option value="1">1 - Administrador</option>
              <option value="2">2 - Operador</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </section>
  );
}
