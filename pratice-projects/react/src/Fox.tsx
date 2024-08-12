import { useAnimations, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

function Fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    animations.actions[animationName]?.reset().fadeIn(0.5).play();
  }, [animationName]);

  return (
    <primitive
      object={fox.scene}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}

export default Fox;
