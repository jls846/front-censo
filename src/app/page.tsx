"use client"; // <-- OBLIGATORIO

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/styles/layout/login.scss";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockUsers = [
    { email: "admin@escuela.com", password: "1234" },
    { email: "usuario@escuela.com", password: "abcd" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}