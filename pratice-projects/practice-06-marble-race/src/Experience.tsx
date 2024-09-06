import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";

import { Level } from "./Level";
import Lights from "./Lights";
import Player from "./Player";
import useGame from "./stores/useGame";

function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Perf position="top-left" />
      <Lights />

      <Physics>
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}

export default Experience;
