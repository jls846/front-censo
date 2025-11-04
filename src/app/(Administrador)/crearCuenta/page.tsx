"use client";

import { useState } from "react";
import "../../styles/layout/login.scss";
import "../../styles/base/globales.scss";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      //   {
      //     nombre,
      //     correo,
      //     contraseña: password,
      //   }
      // );

      toast.success("Cuenta creada correctamente");
      router.push("/"); // redirige al login
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(err.response.data?.message || "Error al crear la cuenta");
        } else if (err.request) {
          toast.error("No se pudo conectar con el servidor");
        } else {
          toast.error("Ocurrió un error inesperado");
        }
      } else {
        toast.error("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="containerGrid">
      <div className="login-container">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre de usuario</label>
            <input
              type="text"
              placeholder="Escribe tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="Tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

          <Link href="/">¿Ya tienes cuenta? Inicia sesión</Link>
        </form>
      </div>
    </section>
  );
}
