"use client";

import React, { useEffect, useRef } from "react";
import Quagga from "@ericblade/quagga2";

// Tipos para la configuración (opcional, pero mejora legibilidad)
interface QuaggaConfig {
  inputStream: {
    name: string;
    type: string;
    target: HTMLElement;
    constraints: MediaTrackConstraints;
  };
  decoder: {
    readers: string[];
  };
  locate: boolean;
}

interface BarcodeScannerProps {
  onScan: (code: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const config: QuaggaConfig = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerRef.current,
        constraints: {
          width: 640,
          height: 370,
          facingMode: "environment",
        },
      },
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "upc_reader",
        ],
      },
      locate: true,
    };

    // El callback de error: tipamos `err` como `unknown`
    const initCallback = (err: unknown) => {
      if (err) {
        console.error("Error al iniciar el escáner:", err);
        return;
      }
      Quagga.start();
    };

    Quagga.init(config as unknown as Record<string, unknown>, initCallback);

    // Handler de detección: `data` es `unknown`, lo validamos
    const handleDetected = (data: unknown) => {
      // Validación segura
      if (
        data != null &&
        typeof data === "object" &&
        "codeResult" in data &&
        data.codeResult != null &&
        typeof data.codeResult === "object" &&
        "code" in data.codeResult &&
        typeof data.codeResult.code === "string"
      ) {
        const code = data.codeResult.code.trim();
        if (code !== "") {
          onScan(code);
          Quagga.stop(); // Opcional
        }
      }
    };

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, [onScan]);

  return (
    <div
      ref={scannerRef}
      style={{
        width: "100%",
        maxWidth: "500px",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
        border: "2px solid #0056b3",
      }}
    />
  );
}
