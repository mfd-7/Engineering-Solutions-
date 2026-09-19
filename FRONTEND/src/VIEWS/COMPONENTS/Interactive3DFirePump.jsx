import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Droplets, Sparkles, Move3d, ShieldCheck } from 'lucide-react';

export const Interactive3DFirePump = () => {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [flowing, setFlowing] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [themeMode, setThemeMode] = useState('industrial'); // 'industrial' | 'blueprint'
  const [webglSupported, setWebglSupported] = useState(true);
  const [load3D, setLoad3D] = useState(true);

  // References to communicate with the Three.js render loop
  const sceneParams = useRef({
    wireframe: false,
    flowing: false,
    isRotating: true,
    themeMode: 'industrial',
    materials: [],
    waterParticles: null,
  });

  useEffect(() => {
    sceneParams.current.wireframe = wireframe;
    sceneParams.current.flowing = flowing;
    sceneParams.current.isRotating = isRotating;
    sceneParams.current.themeMode = themeMode;

    // Update material wireframes safely
    if (sceneParams.current.materials && sceneParams.current.materials.length > 0) {
      sceneParams.current.materials.forEach(mat => {
        if (!mat) return;
        mat.wireframe = wireframe;
        if (themeMode === 'blueprint') {
          mat.color = new THREE.Color(mat._isRed ? '#00f0ff' : '#0077ff');
          mat.emissive = new THREE.Color('#002244');
        } else {
          mat.color = new THREE.Color(mat._originalColor);
          mat.emissive = new THREE.Color(mat._originalEmissive || '#000000');
        }
      });
    }
  }, [wireframe, flowing, isRotating, themeMode]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !load3D) return;

    let renderer, animId;
    let isCleaningUp = false;

    // Helper to safely check WebGL
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebglSupported(false);
      return;
    }

    try {
      const width = mount.clientWidth || 320;
      const height = mount.clientHeight || 380;

      // 1. Scene & Camera
      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(45, Math.max(width, 1) / Math.max(height, 1), 0.1, 1000);
      camera.position.set(0, 0.2, 6.5);
      camera.lookAt(0, 0.15, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mount.appendChild(renderer.domElement);

      // 2. Lighting (Industrial Studio Key + Rim Light)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(5, 8, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
      rimLight.position.set(-6, 4, -4);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0xff4444, 1.5, 10);
      fillLight.position.set(2, 1, 3);
      scene.add(fillLight);

      // 3. Materials
      const materialsList = [];
      const createMat = (color, roughness = 0.35, metalness = 0.55, isRed = false) => {
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness,
          metalness,
        });
        mat._originalColor = color;
        mat._isRed = isRed;
        materialsList.push(mat);
        return mat;
      };

      const redPumpMat = createMat(0xd91e24, 0.3, 0.6, true);
      const metalMat = createMat(0x8892b0, 0.25, 0.85);
      const darkSteelMat = createMat(0x232733, 0.45, 0.7);
      const brassMat = createMat(0xd4af37, 0.3, 0.8);
      const chromeMat = createMat(0xf0f4f8, 0.15, 0.95);
      sceneParams.current.materials = materialsList;

      // 4. Build Industrial 3D Fire Pump Assembly
      const pumpGroup = new THREE.Group();

      // A. Base Skid (Mounting I-Beams)
      const baseGeo = new THREE.BoxGeometry(4.2, 0.2, 2.0);
      const baseMesh = new THREE.Mesh(baseGeo, darkSteelMat);
      baseMesh.position.y = -0.9;
      baseMesh.receiveShadow = true;
      pumpGroup.add(baseMesh);

      // Vibration Isolator Pads
      [-1.7, 1.7].forEach(x => {
        [-0.7, 0.7].forEach(z => {
          const padGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
          const pad = new THREE.Mesh(padGeo, chromeMat);
          pad.position.set(x, -1.05, z);
          pumpGroup.add(pad);
        });
      });

      // B. Pump Casing / Volute (Cast Iron Impeller Chamber)
      const voluteGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.55, 32);
      const volute = new THREE.Mesh(voluteGeo, redPumpMat);
      volute.rotation.z = Math.PI / 2;
      volute.position.set(-1.0, 0.15, 0);
      pumpGroup.add(volute);

      // Volute Spiral Casing Bump
      const voluteSpiralGeo = new THREE.TorusGeometry(0.65, 0.26, 20, 40);
      const voluteSpiral = new THREE.Mesh(voluteSpiralGeo, redPumpMat);
      voluteSpiral.rotation.y = Math.PI / 2;
      voluteSpiral.position.set(-1.0, 0.15, 0);
      pumpGroup.add(voluteSpiral);

      // Suction Flange (Horizontal Intake)
      const suctionPipeGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.8, 24);
      const suctionPipe = new THREE.Mesh(suctionPipeGeo, redPumpMat);
      suctionPipe.rotation.z = Math.PI / 2;
      suctionPipe.position.set(-1.7, 0.15, 0);
      pumpGroup.add(suctionPipe);

      const suctionFlangeGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.14, 24);
      const suctionFlange = new THREE.Mesh(suctionFlangeGeo, metalMat);
      suctionFlange.rotation.z = Math.PI / 2;
      suctionFlange.position.set(-2.1, 0.15, 0);
      pumpGroup.add(suctionFlange);

      // Discharge Flange (Vertical Outflow)
      const dischargePipeGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.9, 24);
      const dischargePipe = new THREE.Mesh(dischargePipeGeo, redPumpMat);
      dischargePipe.position.set(-1.0, 0.8, 0);
      pumpGroup.add(dischargePipe);

      const dischargeFlangeGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.14, 24);
      const dischargeFlange = new THREE.Mesh(dischargeFlangeGeo, metalMat);
      dischargeFlange.position.set(-1.0, 1.25, 0);
      pumpGroup.add(dischargeFlange);

      // Pressure Gauge Assembly on Discharge
      const gaugeStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 12);
      const gaugeStem = new THREE.Mesh(gaugeStemGeo, brassMat);
      gaugeStem.position.set(-0.65, 1.0, 0.25);
      gaugeStem.rotation.x = Math.PI / 6;
      pumpGroup.add(gaugeStem);

      const gaugeDialGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 24);
      const gaugeDial = new THREE.Mesh(gaugeDialGeo, chromeMat);
      gaugeDial.rotation.x = Math.PI / 2;
      gaugeDial.position.set(-0.65, 1.2, 0.38);
      pumpGroup.add(gaugeDial);

      // C. Shaft & Flexible Coupling (Enclosed Safety Guard)
      const couplingGuardGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.65, 24);
      const couplingGuard = new THREE.Mesh(couplingGuardGeo, brassMat);
      couplingGuard.rotation.z = Math.PI / 2;
      couplingGuard.position.set(-0.35, 0.15, 0);
      pumpGroup.add(couplingGuard);

      // D. Heavy Electric Drive Motor
      const motorBodyGeo = new THREE.CylinderGeometry(0.72, 0.72, 1.8, 32);
      const motorBody = new THREE.Mesh(motorBodyGeo, darkSteelMat);
      motorBody.rotation.z = Math.PI / 2;
      motorBody.position.set(0.9, 0.15, 0);
      pumpGroup.add(motorBody);

      // Motor Cooling Fins
      for (let f = -0.55; f <= 0.65; f += 0.2) {
        const finGeo = new THREE.TorusGeometry(0.75, 0.025, 12, 32);
        const fin = new THREE.Mesh(finGeo, metalMat);
        fin.rotation.y = Math.PI / 2;
        fin.position.set(0.9 + f, 0.15, 0);
        pumpGroup.add(fin);
      }

      // Motor Terminal Junction Box
      const juncGeo = new THREE.BoxGeometry(0.5, 0.35, 0.4);
      const junc = new THREE.Mesh(juncGeo, redPumpMat);
      junc.position.set(0.8, 0.95, 0);
      pumpGroup.add(junc);

      // Rear Fan Cowl / Grill
      const fanCowlGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.35, 24);
      const fanCowl = new THREE.Mesh(fanCowlGeo, redPumpMat);
      fanCowl.rotation.z = Math.PI / 2;
      fanCowl.position.set(1.95, 0.15, 0);
      pumpGroup.add(fanCowl);

      scene.add(pumpGroup);

      // 5. Water Flow Particles System (Activated on Test Flow)
      const particleCount = 150;
      const particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const vels = [];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = -1.0 + (Math.random() - 0.5) * 0.4;
        positions[i * 3 + 1] = 1.3 + Math.random() * 2.0;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        vels.push({
          vy: 0.05 + Math.random() * 0.08,
          spread: (Math.random() - 0.5) * 0.02
        });
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.08,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const waterParticles = new THREE.Points(particleGeo, particleMat);
      pumpGroup.add(waterParticles);
      sceneParams.current.waterParticles = waterParticles;

      // 6. Interactive Orbit Controls
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const onPointerDown = (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        setIsRotating(false);
      };

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        pumpGroup.rotation.y += deltaX * 0.012;
        pumpGroup.rotation.x = Math.max(-0.6, Math.min(0.8, pumpGroup.rotation.x + deltaY * 0.01));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      const domElement = renderer.domElement;
      domElement.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      // 7. Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        if (isCleaningUp) return;
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();

        if (sceneParams.current.isRotating && !isDragging) {
          pumpGroup.rotation.y += 0.008;
        }

        if (sceneParams.current.flowing && waterParticles) {
          waterParticles.material.opacity = Math.min(0.9, waterParticles.material.opacity + 0.05);
          const posAttr = particleGeo.attributes.position;
          for (let i = 0; i < particleCount; i++) {
            let y = posAttr.getY(i) + vels[i].vy;
            let x = posAttr.getX(i) + vels[i].spread;
            let z = posAttr.getZ(i) + vels[i].spread;

            if (y > 3.8) {
              y = 1.3;
              x = -1.0 + (Math.random() - 0.5) * 0.3;
              z = (Math.random() - 0.5) * 0.3;
            }
            posAttr.setXYZ(i, x, y, z);
          }
          posAttr.needsUpdate = true;
        } else if (waterParticles) {
          waterParticles.material.opacity = Math.max(0, waterParticles.material.opacity - 0.05);
        }

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!mount || !renderer) return;
        const w = mount.clientWidth || 320;
        const h = mount.clientHeight || 380;
        camera.aspect = Math.max(w, 1) / Math.max(h, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        isCleaningUp = true;
        if (animId) cancelAnimationFrame(animId);
        if (domElement) {
          domElement.removeEventListener('pointerdown', onPointerDown);
        }
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization warning, falling back to static visual:", err);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported || !load3D) {
    return (
      <div className="three-pump-container" style={{ padding: '24px 20px', textAlign: 'center' }}>
        <div className="badge-3d-live" style={{ display: 'inline-flex', marginBottom: '14px' }}>
          <ShieldCheck size={16} color="#38BDF8" />
          <span>UL/FM FIRE PUMP MACHINERY SPEC</span>
        </div>
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', margin: '10px 0' }}>
          <img 
            src="/images/fire_equipment_1789629783806.jpg" 
            alt="UL/FM Fire Pump Station" 
            style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px' }}
          />
          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, background: 'rgba(13,14,18,0.85)', backdropFilter: 'blur(8px)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <strong style={{ color: '#fff', fontSize: '0.88rem' }}>2500 GPM Split-Case Fire Pump</strong>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0 }}>UL Listed & FM Approved Heavy Drive Assembly</p>
          </div>
        </div>
        {!load3D && (
          <button 
            type="button" 
            onClick={() => setLoad3D(true)}
            style={{ marginTop: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38BDF8', padding: '10px 20px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Move3d size={16} /> Tap to Launch 3D Simulation
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="three-pump-container">
      {/* 3D Viewport Header / Status Overlay */}
      <div className="three-pump-header">
        <div className="badge-3d-live">
          <span className="pulsing-radar-3d"></span>
          <span>INTERACTIVE 3D EQUIPMENT MODEL</span>
        </div>
        <div className="three-pump-specs">
          <small>UL/FM Horizontal Split-Case Fire Pump (2500 GPM)</small>
        </div>
      </div>

      {/* The 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="three-canvas-viewport" 
        title="Click & Drag to Rotate 360° | Scroll to Zoom"
      />

      {/* Floating Interaction Hint */}
      <div className="three-drag-hint">
        <Move3d size={15} />
        <span>Drag to rotate 360°</span>
      </div>

      {/* Interactive Control Console */}
      <div className="three-controls-bar">
        <button 
          type="button" 
          className={`three-ctrl-btn ${isRotating ? 'active' : ''}`}
          onClick={() => setIsRotating(!isRotating)}
          title="Toggle Auto Spin"
        >
          <RotateCw size={15} className={isRotating ? 'spin-slow' : ''} />
          <span>{isRotating ? 'Pause' : 'Auto Rotate'}</span>
        </button>

        <button 
          type="button" 
          className={`three-ctrl-btn ${flowing ? 'active-flow' : ''}`}
          onClick={() => setFlowing(!flowing)}
          title="Simulate High-Pressure Water Jet"
        >
          <Droplets size={15} color={flowing ? '#38BDF8' : 'currentColor'} />
          <span>{flowing ? 'Stop Jet' : 'Test 2500 GPM'}</span>
        </button>

        <button 
          type="button" 
          className={`three-ctrl-btn ${wireframe ? 'active' : ''}`}
          onClick={() => setWireframe(!wireframe)}
          title="Toggle Engineering CAD Wireframe"
        >
          <Eye size={15} />
          <span>{wireframe ? 'Solid' : 'CAD Wire'}</span>
        </button>

        <button 
          type="button" 
          className="three-ctrl-btn"
          onClick={() => setThemeMode(themeMode === 'industrial' ? 'blueprint' : 'industrial')}
          title="Switch Color Theme"
        >
          <Sparkles size={15} />
          <span>{themeMode === 'industrial' ? 'Blueprint' : 'Red'}</span>
        </button>
      </div>
    </div>
  );
};
