import { Perf } from "r3f-perf";
import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh, MeshMatcapMaterial, TorusGeometry } from "three";
import { useFrame } from "@react-three/fiber";

function Experience() {
  const matcapTexture = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const torusGeometry = useRef<TorusGeometry>(null!);
  const [material, setMaterial] = useState<MeshMatcapMaterial>(null!);
  const donuts = useRef<Mesh[]>([]);

  useFrame((_, delta) => {
    donuts.current.forEach((donut) => {
      donut.rotation.x += delta;
      donut.rotation.y += delta;
    });
  });

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

      <torusGeometry ref={torusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial
        ref={(matcap) => {
          if (matcap) {
            setMaterial(matcap);
          }
        }}
        matcap={matcapTexture[0]}
      />

      {[...Array(100)].map((_, index) => (
        <mesh
          ref={(m) => {
            if (m) {
              donuts.current.push(m);
            }
          }}
          key={index}
          geometry={torusGeometry.current ?? undefined}
          material={material ?? undefined}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.05}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        ></mesh>
      ))}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello, world!
          <meshMatcapMaterial matcap={matcapTexture[0]} />{" "}
        </Text3D>
      </Center>
    </>
  );
}

export default Experience;
