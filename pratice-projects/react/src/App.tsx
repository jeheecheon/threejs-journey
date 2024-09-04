import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [4, 2, 6],
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
