import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Environments } from "./components/Environments";
import { EditProvider } from "./context/EditContext";
import { Overlay } from "./components/overlay/Overlay";
import { useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";

// import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
      <EditProvider>
        <Canvas
          shadows
          camera={{
            fov: 50,
            position: [200, 40, 160],
          }}
        >
          <Environments />
          {/* <EffectComposer>
            <HueSaturation
              blendFunction={BlendFunction.NORMAL} // blend mode
              hue={0} // hue in radians
              saturation={0} // saturation in radians
            />
          </EffectComposer> */}
        </Canvas>
        <Overlay />
      </EditProvider>
    </KeyboardControls>
  );
}

export default App;
