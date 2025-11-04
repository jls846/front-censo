import Header from "../components/header";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../app/styles/base/globales.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <Header />
        <Toaster position="top-left" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
