import { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";
import * as THREE from "three";
import { BlendFunction } from "postprocessing";

interface DrunkProps {
  frequency: number;
  amplitude: number;
  blendFunction: BlendFunction;
}

function Drunk(props: DrunkProps, ref: React.Ref<THREE.Mesh>) {
  const effect = new DrunkEffect(props);

  return <primitive ref={ref} object={effect} />;
}

export default forwardRef(Drunk);
