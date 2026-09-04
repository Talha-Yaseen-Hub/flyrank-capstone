'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RotateCcw, Eye, Layers, Palette, Cpu, ShieldCheck } from 'lucide-react';

export default function Hero3DExperience() {
  const mountRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Configurator state
  const [themeColor, setThemeColor] = useState('#10b981'); // Emerald default
  const [wireframe, setWireframe] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1); // 0, 1, 3
  const [isLoaded, setIsLoaded] = useState(false);
  const [fps, setFps] = useState(60);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Reference for 3D state
  const stateRef = useRef({
    themeColor: '#10b981',
    wireframe: false,
    rotationSpeed: 1,
    targetRotationX: 0,
    targetRotationY: 0,
    currentRotationX: 0,
    currentRotationY: 0
  });

  useEffect(() => {
    stateRef.current.themeColor = themeColor;
    stateRef.current.wireframe = wireframe;
    stateRef.current.rotationSpeed = rotationSpeed;
  }, [themeColor, wireframe, rotationSpeed]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setRotationSpeed(0);
    }

    let THREE;
    let scene, camera, renderer, mesh, wireframeMesh, light1, light2;
    let lastTime = performance.now();
    let frameCount = 0;

    const init3D = async () => {
      try {
        THREE = await import('three');

        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 320;
        const height = container.clientHeight || 300;

        // 1. Scene & Camera
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 4.5;

        // 2. Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 3. Geometry & Materials
        const geometry = new THREE.IcosahedronGeometry(1.4, 2);
        
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(stateRef.current.themeColor),
          roughness: 0.25,
          metalness: 0.8,
          wireframe: false
        });

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Optional wireframe lattice overlay
        const wireframeMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
          transparent: true,
          opacity: 0.15
        });
        wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
        wireframeMesh.scale.setScalar(1.02);
        scene.add(wireframeMesh);

        // 4. Studio Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        light1 = new THREE.DirectionalLight(new THREE.Color(stateRef.current.themeColor), 2.5);
        light1.position.set(5, 5, 5);
        scene.add(light1);

        light2 = new THREE.PointLight(0x3b82f6, 2, 10);
        light2.position.set(-5, -5, -2);
        scene.add(light2);

        setIsLoaded(true);

        // 5. Mouse/Touch Interactivity
        const handlePointerMove = (e) => {
          const rect = container.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          stateRef.current.targetRotationY = x * 0.8;
          stateRef.current.targetRotationX = -y * 0.8;
        };

        container.addEventListener('pointermove', handlePointerMove);

        // 6. Animation Loop
        const animate = (time) => {
          animationFrameRef.current = requestAnimationFrame(animate);

          // FPS Counter calculation
          frameCount++;
          if (time - lastTime >= 1000) {
            setFps(Math.round((frameCount * 1000) / (time - lastTime)));
            frameCount = 0;
            lastTime = time;
          }

          if (mesh && material) {
            // Update material properties dynamically
            material.color.setStyle(stateRef.current.themeColor);
            material.wireframe = stateRef.current.wireframe;
            if (light1) light1.color.setStyle(stateRef.current.themeColor);

            // Smooth rotation interpolation (lerp)
            const speedMultiplier = stateRef.current.rotationSpeed;
            stateRef.current.currentRotationX += (stateRef.current.targetRotationX - stateRef.current.currentRotationX) * 0.05;
            stateRef.current.currentRotationY += (stateRef.current.targetRotationY - stateRef.current.currentRotationY) * 0.05;

            mesh.rotation.y += 0.008 * speedMultiplier + stateRef.current.currentRotationY * 0.02;
            mesh.rotation.x += 0.004 * speedMultiplier + stateRef.current.currentRotationX * 0.02;
            
            if (wireframeMesh) {
              wireframeMesh.rotation.y = mesh.rotation.y;
              wireframeMesh.rotation.x = mesh.rotation.x;
            }
          }

          renderer.render(scene, camera);
        };

        animate(performance.now());

        // Handle Window Resize
        const handleResize = () => {
          if (!container || !renderer || !camera) return;
          const newW = container.clientWidth;
          const newH = container.clientHeight;
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          container.removeEventListener('pointermove', handlePointerMove);
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
          if (renderer && renderer.domElement) container.removeChild(renderer.domElement);
          geometry.dispose();
          material.dispose();
        };

      } catch (err) {
        console.warn('Three.js loading fallback:', err);
      }
    };

    init3D();

  }, []);

  const colors = [
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Cyber Teal', hex: '#06b6d4' },
    { name: 'Solar Gold', hex: '#f59e0b' },
    { name: 'Amethyst', hex: '#a855f7' }
  ];

  return (
    <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900 text-white p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white font-display">Interactive 3D AI Core Configurator</h3>
            <p className="text-xs text-zinc-400">WebGL / Three.js 60fps Staged Environment • FE-AA2</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {fps} FPS
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
            {wireframe ? 'Wireframe Mesh' : 'PBR Material'}
          </span>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2 relative min-h-[300px] flex items-center justify-center rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 overflow-hidden group">
          
          {/* Canvas Mount Container */}
          <div 
            ref={mountRef} 
            className="w-full h-[320px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
          />

          {!isLoaded && !reducedMotion && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400 gap-2">
              <span className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              Initializing WebGL 3D Canvas...
            </div>
          )}

          {reducedMotion && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-900 text-zinc-300 space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <p className="text-sm font-semibold">Static Fallback (Reduced Motion Mode)</p>
              <p className="text-xs text-zinc-400">3D rotation paused to respect system motion preferences.</p>
            </div>
          )}

          <div className="absolute bottom-3 left-3 text-[10px] text-zinc-400 bg-zinc-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-zinc-800">
            💡 Touch or drag to rotate geometry in 3D space
          </div>
        </div>

        {/* Configurator Controls Panel */}
        <div className="space-y-5 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              Material Color Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setThemeColor(c.hex)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition border ${
                    themeColor === c.hex
                      ? 'bg-zinc-800 border-emerald-500 text-white shadow-sm'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Surface Shading
            </label>
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-2 ${
                wireframe
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{wireframe ? 'Disable Wireframe Overlay' : 'Enable Wireframe Lattice'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              Auto-Rotate Orbit Speed
            </label>
            <div className="flex gap-2">
              {[
                { label: 'Pause (0x)', val: 0 },
                { label: 'Idle (1x)', val: 1 },
                { label: 'Fast (3x)', val: 3 }
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setRotationSpeed(s.val)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${
                    rotationSpeed === s.val
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
