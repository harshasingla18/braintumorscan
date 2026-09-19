import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function BrainHemisphere({
  side,
  visible,
}: {
  side: "left" | "right";
  visible: boolean;
}) {
  const x = side === "left" ? -0.52 : 0.52;

  return (
    <group visible={visible} position={[x, 0, 0]}>
      {/* Main hemisphere */}
      <mesh scale={[1.02, 1.18, 1.08]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#9aa3ae"
          roughness={0.88}
          metalness={0}
          transparent
          opacity={0.78}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frontal lobe */}
      <mesh position={[0, 0.18, 0.52]} scale={[0.78, 0.7, 0.58]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#aab1ba"
          roughness={0.9}
          transparent
          opacity={0.34}
        />
      </mesh>

      {/* Temporal lobe */}
      <mesh position={[0.02, -0.42, 0.2]} scale={[0.72, 0.48, 0.72]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#8d96a2"
          roughness={0.9}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Cerebellar mass */}
      <mesh position={[0, -0.52, -0.48]} scale={[0.6, 0.48, 0.48]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#858e9a"
          roughness={0.92}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Cortical grooves */}
      {[-0.58, -0.2, 0.18, 0.56].map((y, index) => (
        <mesh
          key={index}
          position={[side === "left" ? 0.12 : -0.12, y, 0.94]}
          rotation={[0.15, 0, side === "left" ? -0.15 : 0.15]}
          scale={[0.58, 0.025, 0.03]}
        >
          <torusGeometry args={[0.48, 0.018, 8, 32, Math.PI]} />
          <meshBasicMaterial
            color="#4d5662"
            transparent
            opacity={0.48}
          />
        </mesh>
      ))}
    </group>
  );
}

function BrainModel({ visible }: { visible: boolean }) {
  return (
    <group visible={visible} rotation={[0.08, 0, 0]}>
      <BrainHemisphere side="left" visible={visible} />
      <BrainHemisphere side="right" visible={visible} />

      {/* Interhemispheric fissure */}
      <mesh position={[0, 0, 0]} scale={[0.055, 1.05, 1.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#252b33"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Brain stem */}
      <mesh position={[0, -1.08, -0.28]} scale={[0.22, 0.55, 0.3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#7f8894"
          roughness={0.9}
          transparent
          opacity={0.75}
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
    <group
      visible={visible}
      position={[0.42, 0.18, 0.55]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      {/* Tumor body */}
      <mesh scale={selected ? 1.18 : 1}>
        <sphereGeometry args={[0.31, 48, 48]} />
        <meshStandardMaterial
          color={selected ? "#ff6475" : "#e58f99"}
          emissive={selected ? "#8f1829" : "#42141b"}
          emissiveIntensity={selected ? 0.75 : 0.32}
          roughness={0.45}
          metalness={0.02}
        />
      </mesh>

      {/* Tumor halo */}
      <mesh scale={selected ? 1.45 : 1.3}>
        <sphereGeometry args={[0.31, 32, 32]} />
        <meshBasicMaterial
          color="#e58f99"
          transparent
          opacity={selected ? 0.12 : 0.07}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Tumor center */}
      <pointLight
        color="#ff6878"
        intensity={selected ? 1.5 : 0.6}
        distance={2}
      />
    </group>
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
      <ambientLight intensity={1.6} />

      <directionalLight
        position={[4, 5, 6]}
        intensity={2.8}
      />

      <directionalLight
        position={[-4, 1, -5]}
        intensity={1.4}
      />

      <pointLight
        position={[0, 2, 3]}
        intensity={0.7}
      />

      <BrainModel visible={brainVisible} />

      <TumorModel
        visible={tumorVisible}
        selected={selected}
        onSelect={onTumorSelect}
      />

      <gridHelper
        args={[7, 7, "#20262e", "#11161c"]}
        position={[0, -1.65, 0]}
      />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enablePan
        minDistance={2.2}
        maxDistance={7}
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
        <small>Drag · Rotate · Scroll · Pan</small>
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
