import { Canvas } from "@react-three/fiber";
import Controls from "./controls/Controls";
import Lights from "./lights/Lights";
import { Physics } from "@react-three/rapier";
import Beach from "./world/Beach";
import Staging from "./staging/Staging";
import { Loader, PositionalAudio } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense, useCallback, useRef, useState } from "react";
import Video from "./world/Video";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const cameraSettings = {
    position: [0, 15, 15],
  };

  const audioRef = useRef(null);

  const handleStartAudio = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.setVolume(10);
      }
    }
  }, [isPlaying]);

  return (
    <>
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <h2>Welcome to the app</h2>
          <p>Click the button below to start the experience with sound.</p>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "5px",
            }}
            onClick={handleStartAudio}
          >
            Start Experience
          </button>
        </div>
      )}

      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <Perf position={"top-left"} />
          <Controls />
          <Lights />
          <Staging />
          <Physics debug={false}>
            <Beach />
          </Physics>
          <Video name="screen" position-y={10} scale={8} />
          <group position={[0, 5, 0]}>
            <PositionalAudio
              ref={audioRef}
              url="/sounds/waves.mp3"
              distance={3}
            />
          </group>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default Home;
