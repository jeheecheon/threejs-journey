import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { Suspense } from "react";
import Placeholder from "./Placeholder";
import Fox from "./Fox";

function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        position={[0, 2, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
        shadow-camera-near={0.1}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      <mesh
        receiveShadow
        position={[0, -1, 0]}
        scale={20}
        rotation-x={[Math.PI / -2]}
      >
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 4]} />}>
        <Model position-x={5}/>
        <Fox />
      </Suspense>
    </>
  );
}

export default Experience;
