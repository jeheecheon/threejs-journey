import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";

import { Perf } from "r3f-perf";
import { useControls } from "leva";

function Experience() {
  const cube = useRef<Mesh>(null!);
  const sphere = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta;
  });

  const { scene } = useThree();

  const { envMapIntensity } = useControls("environment map", {
    envMapIntensity: { value: 1, min: 0, max: 12, step: 0.1 },
  });

  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={30} samples={10} focus={8} /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={20}
        color="#316d39"
        opacity={0.8}
        frames={100}
        temporal
      >
        <RandomizedLight
          position={[0, 2, 5]}
          radius={1}
          ambient={0.5}
          intensity={3}
          bias={0.001}
          amount={8}
        />
      </AccumulativeShadows> */}

      <Environment
        background
        files={[
          "./environmentMaps/2/px.jpg",
          "./environmentMaps/2/nx.jpg",
          "./environmentMaps/2/py.jpg",
          "./environmentMaps/2/ny.jpg",
          "./environmentMaps/2/pz.jpg",
          "./environmentMaps/2/nz.jpg",
        ]}
      />

      <ContactShadows position={[0, -0.99, 0]} scale={10} resolution={512} />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <directionalLight
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
      /> */}
      {/* <ambientLight intensity={0.4} /> */}

      {/* <Sky /> */}

      <mesh
        // receiveShadow
        position={[0, -1, 0]}
        scale={20}
        rotation-x={[Math.PI / -2]}
      >
        <planeGeometry />
        <meshBasicMaterial />
      </mesh>

      <mesh castShadow ref={sphere} position-x={-3.5} position={[0, 0.1, 0]}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow ref={cube} position={[0, 0.1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </>
  );
}

export default Experience;
