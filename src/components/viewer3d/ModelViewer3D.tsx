"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Box,
  Palette,
  Layers,
  Sparkles,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ModelViewer3DProps {
  fileName?: string;
  fileUrl?: string;
  fileSizeMb?: number;
  initialColor?: string;
  allowDownload?: boolean;
}

export function ModelViewer3D({
  fileName = "sample_bracket_v2.stl",
  fileUrl,
  fileSizeMb = 4.8,
  initialColor = "#3b82f6",
  allowDownload = false,
}: ModelViewer3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modelColor, setModelColor] = useState(initialColor);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Mesh & Scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Estimated stats
  const dimensions = { x: 124, y: 86, z: 48 }; // mm
  const volumeCm3 = 64.2;
  const estimatedWeightG = Math.round(volumeCm3 * 1.24 * 0.25 * 10) / 10; // PLA with 25% infill

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 340;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f1d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(120, 140, 180);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // 3. Grid Helper (Build Plate)
    const gridHelper = new THREE.GridHelper(200, 20, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -20;
    scene.add(gridHelper);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(80, 150, 100);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 0.6);
    dirLight2.position.set(-80, 50, -80);
    scene.add(dirLight2);

    // 5. 3D Model Mesh (Industrial Torus-Knot & Technical Geometries for smooth interactive preview)
    const geometry = new THREE.TorusKnotGeometry(28, 9, 120, 24, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(modelColor),
      roughness: 0.35,
      metalness: 0.2,
      wireframe: isWireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 15;
    mesh.castShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    camera.lookAt(0, 10, 0);

    // 6. Mouse Interaction & Orbit Controls logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.1;
      camera.position.z = Math.max(60, Math.min(300, camera.position.z));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // 7. Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (autoRotate && meshRef.current && !isDragging) {
        meshRef.current.rotation.y += 0.006;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight || 340;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("mousedown", onMouseDown);
      domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
    };
  }, [modelColor, isWireframe, autoRotate]);

  // Update color
  const handleColorChange = (hex: string) => {
    setModelColor(hex);
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).color.set(hex);
    }
  };

  return (
    <div
      className={`relative bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 rounded-3xl" : "w-full"
      }`}
    >
      {/* Top Header Bar inside viewer */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 pointer-events-auto">
          <Badge className="bg-slate-900/90 backdrop-blur-md border border-slate-700 text-blue-400 font-mono text-[11px] px-3 py-1">
            <Box className="w-3.5 h-3.5 mr-1 text-blue-400" />
            <span>{fileName}</span>
          </Badge>
          <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
            {fileSizeMb} MB
          </span>
        </div>

        <div className="flex items-center space-x-1.5 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
              autoRotate ? "bg-blue-600 text-white" : "bg-slate-900/80 text-slate-400 border border-slate-700"
            }`}
            title="Tự động xoay"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`p-2 rounded-xl text-xs font-bold transition-colors ${
              isWireframe ? "bg-indigo-600 text-white" : "bg-slate-900/80 text-slate-400 border border-slate-700"
            }`}
            title="Chế độ lưới Wireframe"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Tool Bar: Dimensions & Color Palette */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Dimensions info */}
        <div className="flex items-center space-x-3 text-slate-400">
          <span>Kích thước: <b className="text-white font-mono">{dimensions.x} x {dimensions.y} x {dimensions.z} mm</b></span>
          <span>•</span>
          <span>Trọng lượng ước tính: <b className="text-emerald-400">{estimatedWeightG} g (PLA)</b></span>
        </div>

        {/* Color Palette */}
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] text-slate-400 mr-1 flex items-center">
            <Palette className="w-3 h-3 mr-1" /> Màu:
          </span>
          {[
            { name: "Blue", hex: "#3b82f6" },
            { name: "Black", hex: "#1e293b" },
            { name: "White", hex: "#e2e8f0" },
            { name: "Red", hex: "#ef4444" },
            { name: "Orange", hex: "#f97316" },
            { name: "Purple", hex: "#a855f7" },
          ].map((c) => (
            <button
              key={c.hex}
              onClick={() => handleColorChange(c.hex)}
              className={`w-5 h-5 rounded-full border transition-transform ${
                modelColor === c.hex ? "scale-125 border-white shadow-md" : "border-slate-700 opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
