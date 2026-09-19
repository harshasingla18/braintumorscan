import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function BrainModel() {
  return (
    <mesh rotation={[0.2, 0.3, 0]}>
      <icosahedronGeometry args={[1.4, 4]} />

      <meshStandardMaterial
        color="#8d96a3"
        roughness={0.7}
        metalness={0.05}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function ThreeDViewer() {
  return (
    <div className="three-d-viewer">
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 45,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2}
        />

        <directionalLight
          position={[-3, -2, -4]}
          intensity={1}
        />

        <BrainModel />

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          minDistance={2}
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
