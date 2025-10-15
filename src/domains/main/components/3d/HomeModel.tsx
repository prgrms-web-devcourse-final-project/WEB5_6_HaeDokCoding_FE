'use client';

import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  onLoaded: () => void;
}

function Model({ onLoaded }: Props) {
  const { scene } = useGLTF('/3d/model/scene.gltf');

  useEffect(() => {
    if (scene) {
      onLoaded(); // 모델이 로드되면 부모에게 알림
    }
  }, [scene]);

  if (!scene) return null; // 로딩 전 대기 처리

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const material = mesh.material as THREE.MeshPhysicalMaterial;

      material.envMapIntensity = 3;
      material.metalness = 1;
      material.roughness = 0.3;
      material.emissiveIntensity = 2;
      material.clearcoat = 1;
      material.clearcoatRoughness = 0.2;
      material.needsUpdate = true;
      material.opacity = 0.35;
      material.bumpScale = 0.3;
      material.thickness = 0.1;
    }
  });

  return <primitive object={scene} scale={18} position={[0, -1.2, 0]} />;
}

function CameraAnimation() {
  const { camera } = useThree();
  const targetPosition = new THREE.Vector3(5, 10, 10); // 최종 위치
  const startPosition = new THREE.Vector3(0, 15, 6); // 시작 위치
  const progress = useRef(0);

  useFrame((state, delta) => {
    if (progress.current < 1) {
      progress.current += delta / 5; // 3초 동안
      const t = Math.min(progress.current, 1);
      camera.position.lerpVectors(startPosition, targetPosition, t);
    }
  });

  return null;
}

function HomeModel({ onLoaded }: Props) {
  return (
    <Canvas
      className="z-10 w-full pointer-none"
      camera={{ position: [10, 40, 9], fov: 26 }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 30, 40]} intensity={1} />
      <spotLight position={[0, 10, 10]} angle={0.2} penumbra={1} intensity={15} castShadow />
      <directionalLight intensity={8} color={0xffffff} position={[10, 40, 100]} />
      <Environment files={`/hdri/footprint_court.hdr`} background={false} />
      <Model onLoaded={onLoaded} />
      {/* <CameraAnimation /> */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={-0.4}
        target={[0, 0, 0]}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.2}
          luminanceColor={new THREE.Color(1, 1, 1)}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}

export default HomeModel;
