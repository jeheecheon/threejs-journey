import { OrbitControls } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useRef } from "react";

function Experience() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const torus = useRef<any>(null!);

  const cubeJump = () => {
    torus.current.applyImpulse({
      x: 0,
      y: 50,
      z: 0,
    });
    torus.current.applyTorqueImpulse({ x: 0, y: 2000, z: 0 });
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug gravity={[-1.6, 0, 0]}>
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={(t) => {
            torus.current = t;
          }}
          colliders={false}
          position={[0, 4, -0.25]}
          rotation={[Math.PI * 0.1, 0, 0]}
        >
          <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <mesh castShadow onClick={cubeJump}>
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}

export default Experience;
