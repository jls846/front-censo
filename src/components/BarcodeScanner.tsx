"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";

interface BarcodeScannerProps {
  onScan: (code: string) => void;
}

export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScan = useRef<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrame: number;
    let zxingReader: BrowserMultiFormatReader | null = null;
    let detector: any = null;

    /** 🚀 Intentar usar BarcodeDetector API (moderno) */
    const startBarcodeDetector = async () => {
      const supported = "BarcodeDetector" in window;
      if (!supported) {
        console.warn("BarcodeDetector no soportado, usando ZXing...");
        return startZXing();
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } }, // 👈 fuerza cámara trasera
        });

        if (!videoRef.current) return;
        videoRef.current.srcObject = stream;

        await new Promise<void>((resolve) => {
          videoRef.current!.onloadedmetadata = async () => {
            try {
              await videoRef.current!.play();
              resolve();
            } catch {
              resolve();
            }
          };
        });

        detector = new (window as any).BarcodeDetector({
          formats: ["code_128", "ean_13", "qr_code"],
        });

        const detect = async () => {
          if (!videoRef.current) return;

          if (videoRef.current.readyState < 2) {
            animationFrame = requestAnimationFrame(detect);
            return;
          }

          try {
            const barcodes = await detector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const raw = barcodes[0].rawValue.trim();
              if (raw && raw !== lastScan.current) {
                lastScan.current = raw;
                const processed = raw.startsWith("0") ? raw.slice(1) : raw;
                onScan(processed);
              }
            }
          } catch (err: any) {
            if (
              err.message?.includes("Invalid element") ||
              err.name === "InvalidStateError"
            ) {
              // ignorar mientras no haya frame válido
            } else {
              console.error("Error detectando código:", err);
            }
          }

          animationFrame = requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error("Error con BarcodeDetector:", err);
        toast.error("No se pudo acceder a la cámara");
        startZXing();
      }
    };

    const startZXing = async () => {
      try {
        zxingReader = new BrowserMultiFormatReader();
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        if (devices.length === 0) {
          toast.error("No se detectó cámara disponible");
          return;
        }

        // 🔍 Intentar encontrar la cámara trasera
        const backCamera =
          devices.find((d) =>
            d.label.toLowerCase().includes("back")
          ) || devices.find((d) =>
            d.label.toLowerCase().includes("rear")
          ) || devices[devices.length - 1]; // fallback

        const selectedDeviceId = backCamera.deviceId;

        console.log("Usando cámara:", backCamera.label || selectedDeviceId);

        await zxingReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              const code = result.getText().trim();
              if (code && code !== lastScan.current) {
                lastScan.current = code;
                const processed = code.startsWith("0") ? code.slice(1) : code;
                onScan(processed);
              }
            } else if (err && !(err instanceof NotFoundException)) {
              console.error("Error ZXing:", err);
            }
          }
        );
      } catch (error) {
        console.error("Error al iniciar ZXing:", error);
        toast.error("Error al iniciar escáner");
      }
    };

    startBarcodeDetector();


    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (stream) stream.getTracks().forEach((t) => t.stop());

      if (zxingReader) {
        if (typeof (zxingReader as any).stopContinuousDecode === "function") {
          (zxingReader as any).stopContinuousDecode();
        } else if (typeof (zxingReader as any).reset === "function") {
          (zxingReader as any).reset();
        }
      }
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
      muted
      playsInline
    />
  );
}
//Chatgpt
//Gemini