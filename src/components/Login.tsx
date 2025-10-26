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
    // Autenticacion simulada
  };

  return (
    <section className="login-page">
      <div className="login-form-container">
        <h2>Inicio sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuario</label>
            <input
              type="email"
              placeholder="Ingresa tu usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Ingresa tu usuario"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
          <Link href="#" className="forgot-password">
            Olvidaste Contraseña?
          </Link>
          <Link href="#" className="create-account">
            Crear Cuenta
          </Link>
        </form>
      </div>

      <div className="image-collage">
        <div className="collage-item collage-1">
          <Image src="/Piedra.jpg" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="collage-item collage-2">
          <Image src="/image 1.png" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="collage-item collage-3">
          <Image src="/estrella.jpg" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="collage-item collage-4">
          <Image src="/sorjuana.jpg" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="collage-item collage-5">
          <Image src="/fes.jpg" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="collage-item collage-6">
          <Image src="/picachu.jpg" alt="UNAM Icatlán" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}