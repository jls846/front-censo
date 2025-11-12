"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

// 👇 Declaraciones globales para BarcodeDetector
declare global {
  interface BarcodeDetectorOptions {
    formats?: string[];
  }

  interface DetectedBarcode {
    rawValue: string;
    format: string;
    cornerPoints?: DOMPoint[];
    boundingBox?: DOMRectReadOnly;
  }

  class BarcodeDetector {
    constructor(options?: BarcodeDetectorOptions);
    detect(source: ImageBitmapSource): Promise<DetectedBarcode[]>;
    static getSupportedFormats(): Promise<string[]>;
  }
}
export {};

interface BarcodeScannerProps {
  onScan: (code: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScan = useRef<string | null>(null);

  // 🔹 Verifica soporte antes de montar el componente
  if (typeof window !== "undefined" && !("BarcodeDetector" in window)) {
    toast.error("BarcodeDetector API no soportada en este navegador");
    return null;
  }

  useEffect(() => {
    let stream: MediaStream | null = null;
    let detector: BarcodeDetector | null = null;
    let animationFrame: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;

        // Esperar a que el video esté listo antes de reproducirlo
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = () => resolve(true);
        });

        await videoRef.current.play().catch((err) => {
          console.warn("No se pudo reproducir automáticamente:", err);
        });

        if (!("BarcodeDetector" in window)) {
          console.error("BarcodeDetector API no soportada en este navegador");
          return;
        }

        detector = new BarcodeDetector({ formats: ["code_128", "ean_13"] });

        const detect = async () => {
          if (!videoRef.current || !detector) return;
          try {
            const barcodes = await detector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const rawValue = barcodes[0].rawValue.trim();
              if (rawValue && rawValue !== lastScan.current) {
                lastScan.current = rawValue;
                const processed = rawValue.startsWith("0")
                  ? rawValue.slice(1)
                  : rawValue;
                onScan(processed);
              }
            }
          } catch (err) {
            console.error(err);
          }
          animationFrame = requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error("Error al iniciar cámara:", err);
        toast.error("No se pudo acceder a la cámara");
      }
    };

    startCamera();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [onScan]);

  return (
    <video
      ref={videoRef}
      style={{
        width: "100%",
        maxWidth: "480px",
        height: "300px",
        border: "2px solid #0056b3",
        borderRadius: "12px",
        objectFit: "cover",
      }}
    />
  );
}
