import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./Experience.tsx";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 16],
      }}
    >
      <Experience />
    </Canvas>
  </StrictMode>
);
