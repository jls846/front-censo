"use client";

import dynamic from "next/dynamic";

const AgregarEquipo = dynamic(() => import("@/components/AgregarEquipo"), {
  ssr: false,
});

export default function Page() {
  return <AgregarEquipo />;
}
