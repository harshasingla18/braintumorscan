cat > src/components/ThreeDViewer.tsx <<'EOF'
import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function createBrainGeometry() {
  const geometry = new THREE.SphereGeometry(1, 64, 48);
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);

    const groove =
      Math.sin(x * 11 + y * 4) * 0.025 +
      Math.sin(z * 13 - y * 5) * 0.02;

    const lowerCompression = y < -0.25 ? 0.92 : 1;

    position.setXYZ(
      i,
      x * (1.42 + groove) * lowerCompression,
      y * 1.12,
      z * (1.16 + groove)
    );
  }

  position.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}

function BrainModel({ visible }: { visible: boolean }) {
  const geometry = useMemo(() => createBrainGeometry(), []);

  return (
    <group visible={visible}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#9aa2ad"
          roughness={0.92}
          metalness={0.02}
          transparent
          opacity={0.58}
        />
      </mesh>

      <mesh
        position={[-0.5, 0, 0]}
        scale={[0.88, 1.03, 1.03]}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#b1b7c0"
          roughness={0.95}
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh
        position={[0.5, 0, 0]}
        scale={[0.88, 1.03, 1.03]}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color="#b1b7c0"
          roughness={0.95}
          transparent
          opacity={0.18}
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
  const geometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.32, 40, 32);
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      const deformation =
        1 +
        0.16 * Math.sin(x * 18 + z * 7) +
        0.1 * Math.sin(y * 15 - x * 9);

      position.setXYZ(
        i,
        x * deformation,
        y * (1 + 0.12 * Math.sin(z * 12)),
        z * deformation
      );
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  return (
    <mesh
      visible={visible}
      geometry={geometry}
      position={[0.48, 0.18, 1.04]}
      scale={selected ? 1.18 : 1}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <meshStandardMaterial
        color={selected ? "#ff4055" : "#ff7180"}
        emissive="#8f1525"
        emissiveIntensity={selected ? 1.15 : 0.65}
        roughness={0.48}
        metalness={0.02}
      />
    </mesh>
  );
}

function OrientationMarker() {
  return (
    <group position={[0, -1.65, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.19, 32]} />
        <meshBasicMaterial color="#4d5662" />
      </mesh>
    </group>
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
          position: [0, 0, 4],
          fov: 42,
        }}
        onPointerMissed={() => setSelected(false)}
      >
        <color attach="background" args={["#0b0e12"]} />

        <ambientLight intensity={1.35} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={2.4}
        />

        <directionalLight
          position={[-4, -2, -5]}
          intensity={1.1}
        />

        <BrainModel visible={brainVisible} />

        <TumorModel
          visible={tumorVisible}
          selected={selected}
          onSelect={() => setSelected(true)}
        />

        <OrientationMarker />

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          enablePan
          minDistance={2}
          maxDistance={7}
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
            color: "#ff9aa5",
            padding: "6px 9px",
            borderRadius: 5,
            fontSize: 8,
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
            border: "1px solid #74313b",
            borderRadius: 6,
            background: "rgba(30, 10, 14, 0.95)",
            color: "#ff9aa5",
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
EOF
