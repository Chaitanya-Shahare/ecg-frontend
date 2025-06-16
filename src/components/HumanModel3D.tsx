import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HumanModelProps {
  gender: 'male' | 'female' | 'other';
}

const HeartPulse: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.15, 16, 16]}>
      <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.3} />
    </Sphere>
  );
};

const HumanFigure: React.FC<{ gender: 'male' | 'female' | 'other' }> = ({ gender }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const bodyColor = gender === 'female' ? '#fbbf24' : '#3b82f6';
  
  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere position={[0, 2, 0]} args={[0.4, 16, 16]}>
        <meshStandardMaterial color="#fbbf24" />
      </Sphere>
      
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 2, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-1, 1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[1, 1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.3, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      <mesh position={[0.3, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 2, 8]} />
        <meshStandardMaterial color={bodyColor} />
      </mesh>
      
      {/* Heart with pulse */}
      <HeartPulse position={[-0.2, 1.2, 0.3]} />
      
      {/* Heart label */}
      <Text
        position={[-0.2, 1.8, 0.3]}
        fontSize={0.2}
        color="#ef4444"
        anchorX="center"
        anchorY="middle"
      >
        Heart
      </Text>
    </group>
  );
};

const HumanModel3D: React.FC<HumanModelProps> = ({ gender }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="h-96 w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden"
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <HumanFigure gender={gender} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-sm text-gray-600 dark:text-gray-300">
        Click and drag to rotate
      </div>
    </motion.div>
  );
};

export default HumanModel3D;