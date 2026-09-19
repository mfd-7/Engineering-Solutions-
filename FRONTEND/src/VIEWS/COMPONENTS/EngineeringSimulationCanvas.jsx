import React, { useRef, useEffect, useState } from 'react';
import { Activity, Gauge, ShieldAlert, RefreshCw, Zap } from 'lucide-react';

export const EngineeringSimulationCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStage, setSimulationStage] = useState('STANDBY'); // STANDBY, ALARM, BOOST, DELUGE, SUCCESS
  const [pressure, setPressure] = useState(144);
  const [flowRate, setFlowRate] = useState(250);
  const [activePump, setActivePump] = useState('P-1 (Duty Standby)');
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Handle Simulation Sequence
  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Sequence stages
    setSimulationStage('ALARM');
    setPressure(160);
    setFlowRate(650);
    setActivePump('DIESEL BOOSTER ENGAGED');

    setTimeout(() => {
      setSimulationStage('DELUGE');
      setPressure(185);
      setFlowRate(1450);
    }, 1500);

    setTimeout(() => {
      setSimulationStage('SUCCESS');
      setPressure(146);
      setFlowRate(300);
      setActivePump('P-1 (Duty Standby)');
    }, 4500);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationStage('STANDBY');
    }, 7000);
  };

  // Subtle real-time gauge fluctuation for realistic telemetry feel
  useEffect(() => {
    if (isSimulating) return;
    const interval = setInterval(() => {
      setPressure(prev => +(143 + Math.random() * 3).toFixed(1));
      setFlowRate(prev => Math.floor(240 + Math.random() * 20));
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Canvas Pipeline & Fluid Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Nodes (Sprinklers, Valves, Manifolds)
    const nodeCols = 6;
    const nodeRows = 4;
    const nodes = [];
    for (let r = 0; r <= nodeRows; r++) {
      for (let c = 0; c <= nodeCols; c++) {
        nodes.push({
          x: (c / nodeCols) * width * 0.95 + width * 0.025,
          y: (r / nodeRows) * height * 0.85 + height * 0.08,
          isSprinkler: (r + c) % 2 === 0,
          radius: (r + c) % 2 === 0 ? 4 : 2.5,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    // Connect nodes with pipelines
    const pipes = [];
    for (let i = 0; i < nodes.length; i++) {
      const right = i + 1;
      const down = i + (nodeCols + 1);
      if (right < nodes.length && (i % (nodeCols + 1)) !== nodeCols) {
        pipes.push({ from: nodes[i], to: nodes[right], orientation: 'H' });
      }
      if (down < nodes.length) {
        pipes.push({ from: nodes[i], to: nodes[down], orientation: 'V' });
      }
    }

    // Fluid / Pressure Particles
    const particleCount = 45;
    const particles = [];
    for (let p = 0; p < particleCount; p++) {
      const pipe = pipes[Math.floor(Math.random() * pipes.length)];
      particles.push({
        pipe,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        size: 2.2 + Math.random() * 2,
        color: Math.random() > 0.3 ? '#38BDF8' : '#F59E0B' // Water blue or LPG amber
      });
    }

    // Deluge Sprinkler Water Spray Particles (activated on simulation)
    const sprayParticles = [];
    const createSprays = () => {
      nodes.filter(n => n.isSprinkler).forEach(node => {
        for (let s = 0; s < 4; s++) {
          sprayParticles.push({
            x: node.x,
            y: node.y,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 4 + 1.5,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.03,
            radius: Math.random() * 2.5 + 1
          });
        }
      });
    };

    let shockwaves = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Pipes Grid (Technical Engineering Lines)
      pipes.forEach(pipe => {
        ctx.beginPath();
        ctx.moveTo(pipe.from.x, pipe.from.y);
        ctx.lineTo(pipe.to.x, pipe.to.y);
        ctx.strokeStyle = isSimulating 
          ? 'rgba(230, 28, 36, 0.22)' 
          : 'rgba(56, 189, 248, 0.08)';
        ctx.lineWidth = isSimulating ? 1.8 : 1.2;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Animate and Draw Nodes
      nodes.forEach(node => {
        node.pulse += isSimulating ? 0.12 : 0.03;
        const pulseSize = node.radius + Math.sin(node.pulse) * 1.5;

        // Node halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isSimulating 
          ? 'rgba(230, 28, 36, 0.15)' 
          : 'rgba(56, 189, 248, 0.07)';
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = isSimulating 
          ? '#E61C24' 
          : (node.isSprinkler ? '#38BDF8' : '#F59E0B');
        ctx.fill();
      });

      // 3. Fluid Flow Particles
      const speedMultiplier = isSimulating ? 3.2 : 1.0;
      particles.forEach(p => {
        p.progress += p.speed * speedMultiplier;
        if (p.progress > 1) {
          p.progress = 0;
          p.pipe = pipes[Math.floor(Math.random() * pipes.length)];
        }

        const curX = p.pipe.from.x + (p.pipe.to.x - p.pipe.from.x) * p.progress;
        const curY = p.pipe.from.y + (p.pipe.to.y - p.pipe.from.y) * p.progress;

        // Mouse avoidance/interaction
        const dx = curX - mousePos.x;
        const dy = curY - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let drawX = curX;
        let drawY = curY;
        if (dist < 120 && dist > 0) {
          const push = (120 - dist) * 0.2;
          drawX += (dx / dist) * push;
          drawY += (dy / dist) * push;
        }

        // Particle Glow
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * (isSimulating ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fillStyle = isSimulating ? '#FF2E38' : p.color;
        ctx.shadowColor = isSimulating ? '#E61C24' : p.color;
        ctx.shadowBlur = isSimulating ? 10 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 4. Sprinkler Water Spray in Deluge Stage
      if (simulationStage === 'DELUGE' || simulationStage === 'ALARM') {
        if (Math.random() > 0.4) createSprays();
      }

      for (let i = sprayParticles.length - 1; i >= 0; i--) {
        const sp = sprayParticles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life -= sp.decay;

        if (sp.life <= 0) {
          sprayParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${sp.life * 0.75})`;
        ctx.fill();
      }

      // 5. Shockwave ripples
      shockwaves.forEach((sw, idx) => {
        sw.radius += 3.5;
        sw.alpha -= 0.02;
        if (sw.alpha <= 0) {
          shockwaves.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(230, 28, 36, ${sw.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSimulating, simulationStage, mousePos]);

  // Track mouse coordinates for dynamic interaction
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div 
      ref={containerRef} 
      className="simulation-master-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="simulation-canvas-layer" />

      {/* Floating System Telemetry Cockpit */}
      <div className={`simulation-hud-card ${isSimulating ? 'simulating-active' : ''}`}>
        <div className="hud-header">
          <div className="hud-title-wrap">
            <span className={`hud-radar-dot ${isSimulating ? 'radar-alert' : ''}`}></span>
            <h4>LIVE SYSTEM TELEMETRY</h4>
          </div>
          <span className="hud-badge-status">
            {simulationStage === 'STANDBY' && '🟢 SYSTEM ARMED'}
            {simulationStage === 'ALARM' && '⚠️ DETECTED INCIDENT'}
            {simulationStage === 'DELUGE' && '🚨 DELUGE ACTIVE'}
            {simulationStage === 'SUCCESS' && '✓ SUPPRESSED & SECURED'}
          </span>
        </div>

        <div className="hud-readouts-grid">
          <div className="hud-metric-box">
            <div className="metric-header">
              <Gauge size={14} className="metric-icon" />
              <span>Hydraulic Pressure</span>
            </div>
            <div className="metric-value">
              <strong>{pressure}</strong>
              <small>PSI (BNBC Nominal)</small>
            </div>
          </div>

          <div className="hud-metric-box">
            <div className="metric-header">
              <Activity size={14} className="metric-icon" />
              <span>Flow Velocity</span>
            </div>
            <div className="metric-value">
              <strong>{flowRate}</strong>
              <small>GPM Fire Conduits</small>
            </div>
          </div>

          <div className="hud-metric-box">
            <div className="metric-header">
              <Zap size={14} className="metric-icon" />
              <span>Pump & Solenoid</span>
            </div>
            <div className="metric-value">
              <strong className="text-truncate">{activePump}</strong>
              <small>NFPA 20 Certified</small>
            </div>
          </div>
        </div>

        <div className="hud-footer-actions">
          <button 
            type="button" 
            className={`hud-trigger-btn ${isSimulating ? 'triggering' : ''}`}
            onClick={triggerSimulation}
            disabled={isSimulating}
          >
            {isSimulating ? (
              <>
                <RefreshCw size={15} className="spin-fast" /> 
                {simulationStage === 'ALARM' && 'Alarm Triggered: Priming Lines...'}
                {simulationStage === 'DELUGE' && 'Discharging Deluge Sprinklers...'}
                {simulationStage === 'SUCCESS' && 'Normalizing System Pressure...'}
              </>
            ) : (
              <>
                <ShieldAlert size={16} />
                <span>Simulate Emergency Fire Suppression Test</span>
              </>
            )}
          </button>
          
          <div className="hud-status-line">
            <small>
              {isSimulating 
                ? '⚡ Live flow acceleration & pressure surge in progress...' 
                : '💡 Tip: Move your cursor to interact with pipeline fluid particles.'}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
