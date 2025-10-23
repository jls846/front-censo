import Header from "../components/header";
import { Inter, Montserrat } from "next/font/google";
import "../app/styles/base/_globales.scss"; // si tienes estilos globales

// Carga optimizada de fuentes
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
