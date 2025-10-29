"use client";

import dynamic from "next/dynamic";

const Editar = dynamic(() => import("@/components/Editar"), {
  ssr: false,
});

export default function Page() {
  return <Editar />;
}
