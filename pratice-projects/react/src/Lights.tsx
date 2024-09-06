/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Lights() {
  const light = useRef<any>();

  useFrame((state) => {
    light.current.position.z = state.camera.position.z + 1;
    light.current.target.position.z = state.camera.position.z;
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default Lights;
