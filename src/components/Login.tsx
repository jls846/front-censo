"use client";

import { useState } from "react";

import "../app/styles/layout/login.scss";
import "../app/styles/base/globales.scss"; 
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="containerGrid">
      <div className="login-container">
        <h2>Inicio sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
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
      <div className="imageContainer">
        <Image src="/Piedra.jpg" alt="Logo FES" width={250} height={150} />
        <Image src="/image 1.png" alt="Logo FES" width={250} height={150} />
        <Image src="/estrella.jpg" alt="Logo FES" width={250} height={150} />
        <Image src="/sorjuana.jpg" alt="Logo FES" width={250} height={150} />
        <Image src="/fes.jpg" alt="Logo FES" width={250} height={150} />
        <Image src="/picachu.jpg" alt="Logo FES" width={250} height={150} />
      </div>
    </section>
  );
}
