import { useRef } from "react";
import { useFrame, extend, useThree, Object3DNode } from "@react-three/fiber";
import { Group, Mesh } from "three";

import { OrbitControls } from "three/addons";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    orbitControls: Object3DNode<OrbitControls, typeof OrbitControls>;
  }
}

function Experience() {
  const cube = useRef<Mesh>(null!);
  const group = useRef<Group>(null!);
  const orbitControls = useRef<OrbitControls>(null!);

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    // const camera = state.camera;
    // const angle = state.clock.elapsedTime;
    // camera.position.x = Math.sin(angle) * 10;
    // camera.position.z = Math.cos(angle) * 10;
    // camera.lookAt(0, 0, 0);

    cube.current.rotation.y += delta;
    // group.current.rotation.y += delta;
    orbitControls.current.update();
  });

  return (
    <>
      <orbitControls
        ref={orbitControls}
        args={[camera, gl.domElement]}
        enableDamping
      />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.4} />

      <CustomObject />

      <group ref={group}>
        <mesh position={[0, -1, 0]} scale={20} rotation-x={[Math.PI / -2]}>
          <planeGeometry />
          <meshStandardMaterial color={0x0ff0ff} />
        </mesh>

        <mesh position-x={-3.5}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} position-x={3.5}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
    </>
  );
}

export default Experience;
