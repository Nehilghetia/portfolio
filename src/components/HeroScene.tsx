import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const FloatingShape = () => (
  <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
    <mesh scale={1.8}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        distort={0.3}
        speed={2}
        wireframe
      />
    </mesh>
  </Float>
);

const HeroScene = () => (
  <div className="absolute inset-0 opacity-60">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00e5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#7c3aed" />
        <FloatingShape />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
