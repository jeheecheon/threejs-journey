import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Experience() {
  const cubeRef = useRef<THREE.Mesh>(null!);
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 10]} intensity={1} />

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
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh
        ref={cubeRef}
        position={[-1, 0.5, 0]}
        onRight={(e) => {
          console.log(e.x, e.y);
          cubeRef.current.material.color.set(
            `hsl(${Math.random() * 360}, 100%, 75%)`
          );
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    </>
  );
}

export default Experience;
