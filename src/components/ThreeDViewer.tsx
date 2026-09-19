import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Environment,
} from "@react-three/drei";

function BrainModel() {
  return (
    <Float
      speed={1}
      rotationIntensity={0.15}
      floatIntensity={0.2}
    >
      <mesh rotation={[0.15, 0.2, 0]}>
        <icosahedronGeometry args={[1.55, 5]} />

        <meshStandardMaterial
          color="#8d96a3"
          roughness={0.75}
          metalness={0.05}
          transparent
          opacity={0.72}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeDViewer() {
  return (
    <div className="three-d-viewer">
      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-4, -2, -3]}
          intensity={1}
        />

        <Environment preset="studio" />

        <BrainModel />

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={2.5}
          maxDistance={7}
        />
      </Canvas>

      <div className="three-d-overlay">
        <span>3D VOLUME</span>
        <small>Drag · Rotate · Scroll · Zoom</small>
      </div>
    </div>
  );
}
