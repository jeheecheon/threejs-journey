import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./Experience.tsx";

import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas
      className="r3f"
      shadows
      flat
      dpr={[1, 2]}
      gl={{
        antialias: true,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 30,
        position: [0, 0, 6],
      }}
    >
      <Experience />
    </Canvas>
  </StrictMode>
);
