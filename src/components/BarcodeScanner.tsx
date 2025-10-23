"use client";

import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

type Props = { onDetected: (code: string) => void; };

export default function BarcodeScanner({ onDetected }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    if (!videoRef.current) return;

    // Obtener la cámara trasera si existe
    codeReader.listVideoInputDevices().then((devices) => {
      const backDevice = devices.find(d => d.label.toLowerCase().includes("back"));
      const deviceId = backDevice ? backDevice.deviceId : devices[0].deviceId;

      // Inicia la cámara inmediatamente
      codeReader.decodeFromVideoDevice(deviceId, videoRef.current!, (result) => {
        if (result) onDetected(result.getText());
      });
    }).catch(console.error);

    return () => { codeReader.reset(); };
  }, [onDetected]);

  return (
    <video
      ref={videoRef}
      style={{
        width: "100%",
        maxWidth: "600px", // Más grande
        border: "2px solid #004aad",
        borderRadius: "10px"
      }}
      autoPlay
      muted
    />
  );
}
