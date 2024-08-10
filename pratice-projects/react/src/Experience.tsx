import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei";

import CustomObject from "./CustomObject";

function Experience() {
  const cube = useRef<Mesh>(null!);
  const group = useRef<Group>(null!);
  const sphere = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    // const camera = state.camera;
    // const angle = state.clock.elapsedTime;
    // camera.position.x = Math.sin(angle) * 10;
    // camera.position.z = Math.cos(angle) * 10;
    // camera.lookAt(0, 0, 0);

    cube.current.rotation.y += delta;
    // group.current.rotation.y += delta;
  });

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.4} />

      <CustomObject />

      <group ref={group}>
        <mesh position={[0, -1, 0]} scale={20} rotation-x={[Math.PI / -2]}>
          <planeGeometry />
          {/* <meshStandardMaterial color={0x0ff0ff} /> */}
          <MeshReflectorMaterial resolution={1024} mirror={0.1} />
        </mesh>

        <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        >
          <mesh ref={sphere} position-x={-3.5}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label"
              center
              distanceFactor={10}
              occlude={[sphere, cube]}
            >
              This is a sphere!
            </Html>
          </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={3.5}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} />
      </group>

      <Float speed={20} floatIntensity={0.1}>
        <Text
          position={[0, 0, 3]}
          fontSize={1}
          color="black"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="white"
        >
          I LOVE R3F, 안녕하세요
        </Text>
      </Float>
    </>
  );
}

export default Experience;
