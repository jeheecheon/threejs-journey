import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import Drunk from "./Drunk";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

function Experience() {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const drunkRef = useRef<THREE.Mesh>(null!);

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 10, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      <color args={["#ffffff"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <EffectComposer multisampling={0}>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.SOFT_LIGHT}
        /> */}
        {/* <Glitch
          delay={new THREE.Vector2(0.5, 1)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.2, 0.4)}
          mode={GlitchMode.SPORADIC}
        /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Bloom luminanceThreshold={0.5} mipmapBlur /> */}
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk
          ref={drunkRef}
          {...drunkProps}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>

      <mesh rotation-x={Math.PI / -2}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <mesh
        position={[1, 0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          console.log("Cliked");
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cubeRef} position={[-1, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}

export default Experience;
