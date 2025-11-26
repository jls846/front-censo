"use client";

import { useState } from "react";
import "../styles/layout/login.scss";
import "../styles/base/globales.scss";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          nombre,
          contraseña: password,
        }
      );
      const { token } = response.data;

      document.cookie = `token=${token}; path=/; SameSite=Strict`;

      const decoded: any = jwtDecode(token);
      const tipo = decoded?.tipoUsuario;

      if (tipo === 2) {
        router.push("/escaner");
      } else if (tipo === 1) {
        router.push("/equipoComputo");
      } else {
        toast.error("Tipo de usuario no válido");
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(
            err.response.data?.message || "Usuario o contraseña incorrectos"
          );
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
        <h2>Sistema de censo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              placeholder="Coloca tu nombre de usuario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Coloca tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>

      <div className="image-collage">
        <div className="collage-item collage-1">
          <Image
            src="/Piedra.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="collage-item collage-2">
          <Image
            src="/image 1.png"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="collage-item collage-3">
          <Image
            src="/estrella.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="collage-item collage-4">
          <Image
            src="/sorjuana.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="collage-item collage-5">
          <Image
            src="/fes.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="collage-item collage-6">
          <Image
            src="/Picachu.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
