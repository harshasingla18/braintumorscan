import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function BrainModel({ visible }: { visible: boolean }) {
  return (
    <group visible={visible} rotation={[0.15, 0, 0]}>
      {/* Main brain volume */}
      <mesh scale={[1.55, 1.2, 1.25]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#8f98a5"
          roughness={0.82}
          metalness={0.02}
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* Left hemisphere */}
      <mesh position={[-0.52, 0, 0]} scale={[0.9, 1.08, 1.05]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#a2a9b4"
          roughness={0.85}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Right hemisphere */}
      <mesh position={[0.52, 0, 0]} scale={[0.9, 1.08, 1.05]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#a2a9b4"
          roughness={0.85}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Central separation */}
      <mesh position={[0, 0, 0]} scale={[0.025, 1.05, 1.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#313943"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function TumorModel({
  visible,
  selected,
  onSelect,
}: {
  visible: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <mesh
      visible={visible}
      position={[0.48, 0.22, 0.35]}
      scale={selected ? 1.18 : 1}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <sphereGeometry args={[0.32, 48, 48]} />

      <meshStandardMaterial
        color={selected ? "#ff6f7d" : "#d58f98"}
        emissive={selected ? "#7a202c" : "#2b1115"}
        emissiveIntensity={selected ? 0.55 : 0.2}
        roughness={0.48}
        metalness={0.05}
      />
    </mesh>
  );
}

function Scene({
  brainVisible,
  tumorVisible,
  selected,
  onTumorSelect,
}: {
  brainVisible: boolean;
  tumorVisible: boolean;
  selected: boolean;
  onTumorSelect: () => void;
}) {
  return (
    <>
      <ambientLight intensity={1.4} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2.4}
      />

      <directionalLight
        position={[-4, -2, -5]}
        intensity={1.2}
      />

      <pointLight
        position={[0, 2, 3]}
        intensity={0.8}
      />

      <BrainModel visible={brainVisible} />

      <TumorModel
        visible={tumorVisible}
        selected={selected}
        onSelect={onTumorSelect}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={2.2}
        maxDistance={7}
        enablePan
      />

      <gridHelper
        args={[8, 8, "#20262e", "#11161c"]}
        position={[0, -1.65, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
}

export default function ThreeDViewer() {
  const [brainVisible, setBrainVisible] = useState(true);
  const [tumorVisible, setTumorVisible] = useState(true);
  const [selected, setSelected] = useState(false);

  return (
    <div className="three-d-viewer">
      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 42,
        }}
        onPointerMissed={() => setSelected(false)}
      >
        <color attach="background" args={["#0b0e12"]} />

        <Scene
          brainVisible={brainVisible}
          tumorVisible={tumorVisible}
          selected={selected}
          onTumorSelect={() => setSelected(true)}
        />
      </Canvas>

      <div className="three-d-overlay">
        <span>3D VOLUME</span>

        <small>
          Drag · Rotate · Scroll · Pan
        </small>
      </div>

      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          display: "flex",
          gap: 6,
        }}
      >
        <button
          onClick={() => setBrainVisible((value) => !value)}
          style={{
            border: "1px solid #252c35",
            background: "#0d1116",
            color: "#aeb6c0",
            padding: "6px 9px",
            borderRadius: 5,
            fontSize: 8,
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          {brainVisible ? "HIDE BRAIN" : "SHOW BRAIN"}
        </button>

        <button
          onClick={() => setTumorVisible((value) => !value)}
          style={{
            border: "1px solid #252c35",
            background: "#0d1116",
            color: "#aeb6c0",
            padding: "6px 9px",
            borderRadius: 5,
            fontSize: 8,
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
        >
          {tumorVisible ? "HIDE TUMOR" : "SHOW TUMOR"}
        </button>
      </div>

      {selected && (
        <div
          style={{
            position: "absolute",
            left: 12,
            top: 42,
            zIndex: 10,
            padding: "8px 10px",
            border: "1px solid #493036",
            borderRadius: 6,
            background: "rgba(18, 12, 15, 0.92)",
            color: "#e0a3aa",
            fontSize: 8,
            letterSpacing: "0.1em",
          }}
        >
          TUMOR SEGMENTATION · SELECTED
        </div>
      )}
    </div>
  );
}
