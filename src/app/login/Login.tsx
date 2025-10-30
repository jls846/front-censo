"use client";

import { useState } from "react";
import "../styles/layout/login.scss";
import "../styles/base/globales.scss";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      router.push("/Escaner");
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
    }
  };

  return (
    <section className="containerGrid">
      <div className="login-container">
        <h2>Inicio de sesión</h2>
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
          <Link href={"/forgotPassword"}>Olvidaste Contraseña?</Link>
          <Link href={"/crearCuenta"}>Crear Cuenta</Link>
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
