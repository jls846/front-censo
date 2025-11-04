"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "../../styles/base/globales.scss"; // ajusta ruta si tu proyecto la tiene en otro sitio
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Ingresa un correo válido.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/forgot-password", { email });
      if (res.status === 200) {
        toast.success(
          "Si existe esa cuenta, recibirás un correo con instrucciones."
        );
        // Opcional: redirigir al login después de enviar
        setTimeout(() => router.push("/"), 1200);
      } else {
        toast.error("Ocurrió un error. Intenta de nuevo.");
      }
    } catch (error) {
      // manejar mensajes de error desde el servidor si vienen
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="forgot-password-page"
      style={{ maxWidth: 520, margin: "4rem auto", padding: "1.5rem" }}
    >
      <h1>¿Olvidaste tu contraseña?</h1>
      <p>
        Escribe el correo asociado a tu cuenta y te enviaremos instrucciones
        para restablecerla.
      </p>

      <form
        onSubmit={handleSubmit}
        className="forgot-form"
        style={{ display: "grid", gap: 12 }}
      >
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          required
          style={{
            padding: "0.6rem",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Enviando..." : "Enviar instrucciones"}
        </button>

        <div style={{ marginTop: 8 }}>
          <Link href="/">Recordé mi contraseña — Iniciar sesión</Link>
        </div>
      </form>
    </main>
  );
}
