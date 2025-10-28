"use client";

import { useState } from "react";
import "../app/styles/layout/login.scss";
import "../app/styles/base/globales.scss";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, {
        nombre,
        contraseña: password,
      });
      const token = response.data;

      document.cookie = `token=${token}; path=/; SameSite=Strict`;
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      router.push("/Escaner");
    }
  };

  return (
    <section className="containerGrid">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
        {error && <p className="error">{error}</p>}
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
          <button type="submit">Iniciar sesión</button>
          <Link href={"#"}>Olvidaste Contraseña?</Link>
          <Link href={"#"}>Crear Cuenta</Link>
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
            src="/picachu.jpg"
            alt="UNAM Icatlán"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
