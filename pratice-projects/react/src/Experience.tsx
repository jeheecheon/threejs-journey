import { Perf } from "r3f-perf";
import {
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
  shaderMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import portalVertexShader from "./portal/vertex.glsl";
import portalFragmentShader from "./portal/fragment.glsl";
import { extend, Object3DNode, useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface GLTFResult {
  nodes: {
    Merged: THREE.Mesh;
    PoleLightA: THREE.Mesh;
    PoleLightB: THREE.Mesh;
    PortalLight: THREE.Mesh;
  };
}

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: Object3DNode<
      THREE.ShaderMaterial,
      typeof THREE.ShaderMaterial
    >;
  }
}

function Experience() {
  const { nodes } = useGLTF("./models/portal.glb") as unknown as GLTFResult;

  const bakedTexture = useTexture("./textures/baked3.webp");
  bakedTexture.flipY = false;

  const portalMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state, delta) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (portalMaterialRef.current as any).uTime += delta;
  });

  return (
    <>
      <Perf position="top-left" />
      <color args={["#030202"]} attach="background" />

      <OrbitControls makeDefault />
      <ambientLight intensity={1} />

      <Center scale={3}>
        <Sparkles size={6} scale={[4, 2, 4]} position={[0, 1, 0]} />

        <mesh geometry={nodes.Merged.geometry} position={nodes.Merged.position}>
          <meshToonMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.PoleLightA.geometry}
          position={nodes.PoleLightA.position}
        >
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh
          geometry={nodes.PoleLightB.geometry}
          position={nodes.PoleLightB.position}
        >
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh
          geometry={nodes.PortalLight.geometry}
          position={nodes.PortalLight.position}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>
      </Center>
    </>
  );
}

export default Experience;
