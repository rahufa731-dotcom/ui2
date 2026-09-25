/**
 * =====================================================================
 * SYNAPSE // OS - NEXT-GEN CYBERPUNK AI ASSISTANT CLIENT ENGINE
 * =====================================================================
 */

// Global State
const SynapseState = {
  activeScreen: 'dashboard',
  audioEnabled: true,
  scanlinesEnabled: true,
  particlesEnabled: true,
  activePersona: {
    name: 'AETHEL',
    version: 'v7.2',
    role: 'Primary Neural Synthesizer',
    avatar: 'assets/ai_avatar.jpg'
  },
  qTokensUsed: 3420,
  qTokensTotal: 128000,
  swarmAgents: [
    { id: 'sentinel', name: 'SENTINEL-ALPHA', role: 'Cryptographic Guard & Threat Queller', icon: 'fa-shield-virus', status: 'ACTIVE // MONITORING', compute: '24.5 TFLOPS', packets: '1,842,090 / sec', latency: '0.12 ms', x: 180, y: 140, vx: 0.3, vy: -0.2, color: '#00f0ff', logs: ['Heartbeat sync OK (epoch #9480)', 'Scanned 256 subnets; 0 intrusion vectors', 'State hash committed to consensus ring'] },
    { id: 'weaver', name: 'SYNTH-WEAVER', role: 'Quantum AST Code Generator', icon: 'fa-code', status: 'ACTIVE // COMPILING', compute: '48.2 TFLOPS', packets: '3,210,400 / sec', latency: '0.24 ms', x: 440, y: 120, vx: -0.2, vy: 0.3, color: '#bd00ff', logs: ['Parsing AST nodes for Rust observer', 'SIMD alignment verified at 512-bit vector', 'Zero-cost abstractions benchmarked'] },
    { id: 'holo', name: 'HOLO-RENDERER', role: '8K Spatial Photon Projection', icon: 'fa-vr-cardboard', status: 'ACTIVE // STREAMING', compute: '62.0 TFLOPS', packets: '4,890,120 / sec', latency: '0.38 ms', x: 460, y: 340, vx: 0.2, vy: -0.25, color: '#ffb703', logs: ['Photon raster buffer filled (14,290 voxels)', 'Raytrace coherence locked at 99.4%', 'Display stream synced at 120 FPS'] },
    { id: 'miner', name: 'VECTOR-MINER', role: 'High-D Semantic Memory Indexer', icon: 'fa-brain', status: 'ACTIVE // INDEXING', compute: '18.4 TFLOPS', packets: '920,800 / sec', latency: '0.08 ms', x: 200, y: 320, vx: -0.25, vy: 0.2, color: '#00ff9d', logs: ['Embedding vector batch #491 ingested', 'Cosine distance cluster threshold: 0.88', 'Persisted to memory vault timeline'] }
  ],
  selectedAgentId: 'sentinel'
};

// =====================================================================
// PROCEDURAL WEB AUDIO SYNTHESIZER (CYBER SOUND FX)
// =====================================================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
}

function playCyberSound(type = 'click') {
  if (!SynapseState.audioEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'beep') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(940, now);
      osc.frequency.setValueAtTime(1260, now + 0.04);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'switch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'notify') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
}

// =====================================================================
// AMBIENT BACKGROUND CANVAS (CYBERNETIC PARTICLES)
// =====================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: i % 3 === 0 ? 'rgba(0, 240, 255, 0.4)' : (i % 3 === 1 ? 'rgba(189, 0, 255, 0.35)' : 'rgba(0, 255, 157, 0.35)')
    });
  }

  function render() {
    if (!SynapseState.particlesEnabled) {
      ctx.clearRect(0, 0, width, height);
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Draw cyber grid subtle lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }
  render();
}

// =====================================================================
// SCREEN NAVIGATION & ROUTING
// =====================================================================
function navigateToScreen(screenId) {
  if (!screenId) return;
  playCyberSound('switch');

  // Update nav buttons
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-screen') === screenId);
  });

  // Update screen visibility
  document.querySelectorAll('.screen-view').forEach(screen => {
    if (screen.id === `screen-${screenId}`) {
      screen.classList.add('active');
    } else {
      screen.classList.remove('active');
    }
  });

  SynapseState.activeScreen = screenId;

  // Trigger screen-specific initializers if needed
  if (screenId === 'swarm') {
    resizeSwarmCanvas();
  }
}

// Wire up sidebar nav buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const screen = btn.getAttribute('data-screen');
      navigateToScreen(screen);
    });
  });

  initAmbientCanvas();
  initDashboardTelemetryCanvas();
  initSwarmOrchestrator();
  initClock();
  initVoiceWaveformGenerator();
  initHistoryFilters();
  initChatEvents();
  initCommandPalette();

  // Show welcome toast
  setTimeout(() => {
    showToast('SYNAPSE // OS READY', 'Cognitive neural link established with Operator Shihab.');
  }, 600);
});

// =====================================================================
// CLOCK & HEADER TELEMETRY
// =====================================================================
function initClock() {
  const clockEl = document.getElementById('hud-clock');
  const loadEl = document.getElementById('hud-load-val');
  const coherenceEl = document.getElementById('hud-coherence-val');

  function update() {
    const now = new Date();
    if (clockEl) {
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s} UTC`;
    }

    // Micro telemetry jitter for futuristic realism
    if (loadEl && Math.random() > 0.6) {
      const val = (27 + Math.random() * 3.5).toFixed(1);
      loadEl.textContent = `${val}%`;
    }
    if (coherenceEl && Math.random() > 0.8) {
      const val = (99.80 + Math.random() * 0.05).toFixed(2);
      coherenceEl.textContent = `${val}%`;
    }
  }
  setInterval(update, 1000);
  update();
}

// =====================================================================
// DASHBOARD TELEMETRY CANVAS CHART
// =====================================================================
function initDashboardTelemetryCanvas() {
  const canvas = document.getElementById('dashboard-telemetry-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let points = [];
  const maxPoints = 35;
  for (let i = 0; i < maxPoints; i++) {
    points.push(45 + Math.sin(i * 0.4) * 20 + (Math.random() - 0.5) * 15);
  }

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 180;
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 30; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Step data
    points.shift();
    const last = points[points.length - 1];
    let next = last + (Math.random() - 0.5) * 18;
    next = Math.max(25, Math.min(130, next));
    points.push(next);

    // Draw gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.28)');
    grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

    ctx.beginPath();
    const step = w / (points.length - 1);
    ctx.moveTo(0, h);
    for (let i = 0; i < points.length; i++) {
      const x = i * step;
      const y = h - (points[i] / 150) * h;
      if (i === 0) ctx.lineTo(x, y);
      else {
        const prevX = (i - 1) * step;
        const prevY = h - (points[i - 1] / 150) * h;
        const cx = (prevX + x) / 2;
        ctx.bezierCurveTo(cx, prevY, cx, y, x, y);
      }
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw neon cyan stroke
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const x = i * step;
      const y = h - (points[i] / 150) * h;
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = (i - 1) * step;
        const prevY = h - (points[i - 1] / 150) * h;
        const cx = (prevX + x) / 2;
        ctx.bezierCurveTo(cx, prevY, cx, y, x, y);
      }
    }
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw latest pulse point
    const lastX = (points.length - 1) * step;
    const lastY = h - (next / 150) * h;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  setInterval(draw, 140);
}

// =====================================================================
// QUICK CAPSULE EXECUTION & DIAGNOSTICS
// =====================================================================
function runCapsulePrompt(promptText) {
  playCyberSound('click');
  navigateToScreen('chat');
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value = promptText;
    sendMessage();
  }
}

function triggerQuickSynthesis() {
  playCyberSound('notify');
  showToast('SYSTEM DIAGNOSTICS COMPLETE', 'All 4 neural tensor clusters verified nominal. Zero packet anomalies.');
}

// =====================================================================
// NEURAL CHAT SYSTEM
// =====================================================================
function initChatEvents() {
  const input = document.getElementById('chat-input-field');
  const sendBtn = document.getElementById('btn-send-message');
  const clearBtn = document.getElementById('btn-clear-chat');
  const exportBtn = document.getElementById('btn-export-chat');
  const voiceBtn = document.getElementById('btn-voice-input');
  const attachBtn = document.getElementById('btn-attach-media');

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      playCyberSound('switch');
      const messagesContainer = document.getElementById('chat-messages');
      if (messagesContainer) {
        messagesContainer.innerHTML = `
          <div class="chat-message assistant-msg">
            <div class="msg-avatar-col">
              <img src="${SynapseState.activePersona.avatar}" alt="Aethel" class="msg-avatar">
            </div>
            <div class="msg-content-col">
              <div class="msg-meta">
                <span class="msg-author neon-cyan">${SynapseState.activePersona.name} // NEURAL CORE</span>
                <span class="msg-time">CONTEXT BUFFER FLUSHED</span>
              </div>
              <div class="msg-bubble">
                <p>Neural context buffer cleared. All memory registers ready for new directive.</p>
              </div>
            </div>
          </div>
        `;
      }
      showToast('CONTEXT RESET', 'Active memory window reset to initial baseline.');
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      playCyberSound('beep');
      showToast('STREAM EXPORTED', 'Chat transcript serialized to JSON-LD cyberdeck payload.');
    });
  }

  if (voiceBtn) {
    voiceBtn.addEventListener('click', toggleVoiceSimulation);
  }

  const stopVoiceBtn = document.getElementById('btn-stop-audio-rec');
  if (stopVoiceBtn) {
    stopVoiceBtn.addEventListener('click', toggleVoiceSimulation);
  }

  if (attachBtn) {
    attachBtn.addEventListener('click', () => {
      playCyberSound('click');
      showToast('MULTIMODAL ATTACHMENT', 'Quantum Hologram & Tensor Memory attached to message envelope.');
    });
  }
}

function fillChatInput(text) {
  playCyberSound('click');
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value = text;
    input.focus();
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input-field');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  playCyberSound('click');
  input.value = '';

  const messagesContainer = document.getElementById('chat-messages');
  if (!messagesContainer) return;

  const now = new Date();
  const timeStr = `CYCLE 2094.09.25 • ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;

  // Append user message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-message user-msg';
  userMsgEl.innerHTML = `
    <div class="msg-avatar-col">
      <div class="user-avatar-initials">SH</div>
    </div>
    <div class="msg-content-col">
      <div class="msg-meta">
        <span class="msg-author neon-white">OPERATOR SHIHAB</span>
        <span class="msg-time">${timeStr}</span>
      </div>
      <div class="msg-bubble">
        <p>${escapeHTML(text)}</p>
      </div>
    </div>
  `;
  messagesContainer.appendChild(userMsgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Update token counter
  SynapseState.qTokensUsed += Math.floor(text.length * 1.8);
  updateTokenCounter();

  // Create simulated assistant streaming response
  setTimeout(() => {
    simulateAssistantResponse(text, messagesContainer);
  }, 450);
}

function simulateAssistantResponse(userPrompt, container) {
  playCyberSound('notify');
  const now = new Date();
  const timeStr = `CYCLE 2094.09.25 • ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;

  const assistantMsgEl = document.createElement('div');
  assistantMsgEl.className = 'chat-message assistant-msg';

  let replyHTML = '';
  let thoughtHTML = '';

  const lower = userPrompt.toLowerCase();

  if (lower.includes('city') || lower.includes('hologram') || lower.includes('urban') || lower.includes('3d')) {
    thoughtHTML = `
      <p>1. Initialized 3D photon projection matrix with 14,290 quantum voxels.</p>
      <p>2. Simulated autonomous swarm agent traffic density along cybernetic skyways.</p>
      <p>3. Synced live telemetry feed with the Holographic Results Viewport.</p>
    `;
    replyHTML = `
      <p>Holographic urban grid synthesis complete. The 3D photon mesh has been projected to the primary viewport with real-time autonomous routing vectors.</p>
      <p>You can inspect the full 8K wireframe, quantum entanglement lines, and photon density metrics directly in the <strong>Results & Artifacts Viewport</strong>.</p>
      <button class="cyber-btn-solid primary" onclick="navigateToScreen('results')" style="margin-top: 8px;">
        <i class="fa-solid fa-cube"></i> Open 3D Holographic Viewport
      </button>
    `;
  } else if (lower.includes('swarm') || lower.includes('benchmark') || lower.includes('agent')) {
    thoughtHTML = `
      <p>1. Interrogated Sentinel-Alpha, Synth-Weaver, Holo-Renderer, and Vector-Miner.</p>
      <p>2. Calculated aggregate compute throughput: 153.1 TFLOPS.</p>
      <p>3. Topology is balanced under zero-coordinator Byzantine consensus.</p>
    `;
    replyHTML = `
      <p>Swarm benchmark completed. All 4 autonomous agents are operational with <strong>0.18ms average latency</strong> to the neural core.</p>
      <p>Total swarm vector throughput is running at <strong>10.8 Million packets/sec</strong>. You can manipulate the interactive node mesh or spawn additional micro-agents in the <strong>Agent Swarm Orchestrator</strong>.</p>
      <button class="cyber-btn-outline" onclick="navigateToScreen('swarm')" style="margin-top: 8px;">
        <i class="fa-solid fa-diagram-project"></i> Inspect Neural Mesh
      </button>
    `;
  } else {
    thoughtHTML = `
      <p>1. Decomposed directive: "${escapeHTML(userPrompt.substring(0, 40))}..." into tensor embeddings.</p>
      <p>2. Queried High-Dimensional Vector DB with 99.8% semantic match.</p>
      <p>3. Formulated optimized response via ${SynapseState.activePersona.name} cognitive archetype.</p>
    `;
    replyHTML = `
      <p>Directive received and executed across the neural matrix. Quantum parameters remain stabilized at 99.82% coherence.</p>
      <p>I have registered this execution cycle to your <strong>Memory Vault</strong> with cryptographic integrity verification.</p>
    `;
  }

  assistantMsgEl.innerHTML = `
    <div class="msg-avatar-col">
      <img src="${SynapseState.activePersona.avatar}" alt="${SynapseState.activePersona.name}" class="msg-avatar">
    </div>
    <div class="msg-content-col">
      <div class="msg-meta">
        <span class="msg-author neon-cyan">${SynapseState.activePersona.name} // NEURAL CORE</span>
        <span class="msg-time">${timeStr}</span>
        <span class="msg-chip">CONFIDENCE 99.8%</span>
      </div>

      <div class="thought-process-box">
        <div class="thought-toggle" onclick="toggleThought(this)">
          <i class="fa-solid fa-chevron-right thought-arrow"></i>
          <span><i class="fa-solid fa-brain"></i> Neural Thought Process [Expanded]</span>
          <span class="thought-tokens">38ms • 280 tokens</span>
        </div>
        <div class="thought-body active">
          ${thoughtHTML}
        </div>
      </div>

      <div class="msg-bubble">
        ${replyHTML}
      </div>

      <div class="msg-actions">
        <button class="msg-act-btn" onclick="copyMessageText(this)"><i class="fa-regular fa-copy"></i> Copy</button>
        <button class="msg-act-btn" onclick="saveToVault('Dynamic Execution Node')"><i class="fa-regular fa-bookmark"></i> Pin to Memory</button>
        <button class="msg-act-btn" onclick="navigateToScreen('results')"><i class="fa-solid fa-cubes-stacked"></i> Artifacts</button>
      </div>
    </div>
  `;

  container.appendChild(assistantMsgEl);
  container.scrollTop = container.scrollHeight;
}

function updateTokenCounter() {
  const tokenEl = document.getElementById('token-counter');
  if (tokenEl) {
    tokenEl.textContent = SynapseState.qTokensUsed.toLocaleString();
  }
}

// Collapsible Chain of Thought Accordion
function toggleThought(toggleEl) {
  playCyberSound('click');
  const body = toggleEl.nextElementSibling;
  const arrow = toggleEl.querySelector('.thought-arrow');
  if (body) {
    const isNowActive = body.classList.toggle('active');
    if (arrow) {
      arrow.style.transform = isNowActive ? 'rotate(90deg)' : 'rotate(0deg)';
    }
  }
}

// Voice Waveform Simulator
let voiceInterval = null;
function initVoiceWaveformGenerator() {
  const container = document.getElementById('waveform-visualizer');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 28; i++) {
    const bar = document.createElement('div');
    bar.className = 'wave-bar';
    container.appendChild(bar);
  }
}

function toggleVoiceSimulation() {
  playCyberSound('beep');
  const barWrapper = document.getElementById('audio-waveform-bar');
  if (!barWrapper) return;

  const isActive = barWrapper.classList.toggle('active');
  const bars = barWrapper.querySelectorAll('.wave-bar');

  if (isActive) {
    voiceInterval = setInterval(() => {
      bars.forEach(b => {
        const h = Math.floor(Math.random() * 20 + 4);
        b.style.height = `${h}px`;
      });
    }, 80);

    // Auto-transcribe after 3 seconds of simulated speech
    setTimeout(() => {
      if (barWrapper.classList.contains('active')) {
        toggleVoiceSimulation();
        const input = document.getElementById('chat-input-field');
        if (input) {
          input.value = "Synthesize neural telemetry mesh with autonomous error recovery";
          showToast('VOICE TRANSCRIBED', 'Audio stream processed via neural acoustic encoder.');
        }
      }
    }, 3200);
  } else {
    clearInterval(voiceInterval);
  }
}

// Copy utilities
function copyCode(btn) {
  playCyberSound('beep');
  const codeEl = btn.closest('.cyber-code-block').querySelector('code');
  if (codeEl) {
    navigator.clipboard.writeText(codeEl.innerText).then(() => {
      showToast('CODE COPIED', 'Rust code copied to system clipboard.');
    });
  }
}

function copyMessageText(btn) {
  playCyberSound('beep');
  const bubble = btn.closest('.msg-content-col').querySelector('.msg-bubble');
  if (bubble) {
    navigator.clipboard.writeText(bubble.innerText).then(() => {
      showToast('TEXT COPIED', 'Message content copied to clipboard.');
    });
  }
}

function copyGenericText(text) {
  playCyberSound('beep');
  navigator.clipboard.writeText(text).then(() => {
    showToast('COPIED TO CLIPBOARD', text);
  });
}

function saveToVault(title) {
  playCyberSound('beep');
  showToast('PINNED TO MEMORY VAULT', `Node "${title}" archived in semantic timeline.`);
}

function inspectInArtifacts() {
  navigateToScreen('results');
}

// =====================================================================
// MEMORY VAULT SEARCH & FILTERING
// =====================================================================
function initHistoryFilters() {
  const filterPills = document.querySelectorAll('#history-tags-filter .filter-pill');
  const searchInput = document.getElementById('history-search-input');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playCyberSound('click');
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');
      applyHistoryFilters(filterVal, searchInput ? searchInput.value : '');
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('#history-tags-filter .filter-pill.active');
      const filterVal = activePill ? activePill.getAttribute('data-filter') : 'all';
      applyHistoryFilters(filterVal, e.target.value);
    });
  }

  // Star buttons toggle
  document.querySelectorAll('.memory-card .star-btn').forEach(starBtn => {
    starBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playCyberSound('click');
      const isStarred = starBtn.classList.toggle('active');
      const card = starBtn.closest('.memory-card');
      if (card) {
        card.setAttribute('data-starred', isStarred ? 'true' : 'false');
      }
      starBtn.innerHTML = isStarred ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    });
  });
}

function applyHistoryFilters(category, query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.memory-card');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const isStarred = card.getAttribute('data-starred') === 'true';
    const title = (card.querySelector('.memory-card-title')?.textContent || '').toLowerCase();
    const summary = (card.querySelector('.memory-card-summary')?.textContent || '').toLowerCase();

    let catMatch = false;
    if (category === 'all') catMatch = true;
    else if (category === 'starred') catMatch = isStarred;
    else catMatch = (cardCat === category);

    let queryMatch = true;
    if (q) {
      queryMatch = title.includes(q) || summary.includes(q);
    }

    if (catMatch && queryMatch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function restoreMemoryToChat(title) {
  playCyberSound('notify');
  navigateToScreen('chat');
  fillChatInput(`Recall semantic node context: "${title}" and analyze telemetry.`);
  sendMessage();
}

// =====================================================================
// RESULTS VIEWPORT & SANDBOX RUNNER
// =====================================================================
function toggleOverlay(type) {
  playCyberSound('click');
  const img = document.getElementById('results-hologram-img');
  const reticle = document.getElementById('reticle');

  if (type === 'wireframe') {
    const btn = document.getElementById('toggle-wireframe');
    const active = btn.classList.toggle('active');
    if (img) img.classList.toggle('wireframe-mode', active);
  } else if (type === 'grid') {
    const btn = document.getElementById('toggle-grid-overlay');
    btn.classList.toggle('active');
  } else if (type === 'telemetry') {
    const btn = document.getElementById('toggle-telemetry-overlay');
    const active = btn.classList.toggle('active');
    if (reticle) reticle.style.display = active ? 'block' : 'none';
  }
}

// Reticle tracking over hologram image
document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('hologram-stage');
  const reticle = document.getElementById('reticle');
  if (stage && reticle) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      reticle.style.left = `${x}px`;
      reticle.style.top = `${y}px`;

      const coordsEl = reticle.querySelector('.reticle-coords');
      if (coordsEl) {
        coordsEl.textContent = `X: ${(x * 1.8).toFixed(1)}  Y: ${(y * 1.8).toFixed(1)}  Z: 142.0`;
      }
    });
  }
});

function runSandboxSimulation() {
  playCyberSound('beep');
  const consoleEl = document.getElementById('sandbox-console-log');
  const statusEl = document.getElementById('sandbox-status');
  if (!consoleEl || !statusEl) return;

  statusEl.textContent = 'EXECUTING...';
  statusEl.style.color = '#ffb703';

  consoleEl.innerHTML = `
    [00:00.00] WebAssembly runtime instance spun up.<br>
    [00:00.01] Loading binary: reconstruct_holographic_mesh.wasm (42 KB)...<br>
  `;

  setTimeout(() => {
    consoleEl.innerHTML += `[00:00.03] Ingesting 14,290 SpatialVoxels with seed: 0x9942_AFFE...<br>`;
  }, 250);

  setTimeout(() => {
    consoleEl.innerHTML += `[00:00.06] AVX-512 SIMD vectorization pass: 0 cache misses.<br>`;
  }, 500);

  setTimeout(() => {
    consoleEl.innerHTML += `
      [00:00.09] MeshBuffer generated: 114,320 vertex coordinates.<br>
      <span style="color:#00ff9d;">[00:00.11] EXECUTION SUCCESS: Zero memory leaks detected. Execution time: 0.11ms.</span>
    `;
    statusEl.textContent = 'COMPLETED (0.11ms)';
    statusEl.style.color = '#00ff9d';
    playCyberSound('notify');
  }, 800);
}

function copyCodeFromSandbox() {
  const code = document.getElementById('sandbox-code-content');
  if (code) {
    copyGenericText(code.innerText);
  }
}

function exportArtifact() {
  playCyberSound('notify');
  showToast('ARTIFACT BUNDLE EXPORTED', 'Spatial 3D mesh and compiled Rust crate zipped.');
}

// =====================================================================
// AGENT SWARM ORCHESTRATOR CANVAS
// =====================================================================
let swarmCanvas, swarmCtx;
let draggedAgent = null;
let dragOffsetX = 0, dragOffsetY = 0;

function initSwarmOrchestrator() {
  swarmCanvas = document.getElementById('swarm-network-canvas');
  if (!swarmCanvas) return;
  swarmCtx = swarmCanvas.getContext('2d');

  resizeSwarmCanvas();
  window.addEventListener('resize', resizeSwarmCanvas);

  // Mouse interaction for dragging and selection
  swarmCanvas.addEventListener('mousedown', (e) => {
    const rect = swarmCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    for (let agent of SynapseState.swarmAgents) {
      const dx = mx - agent.x;
      const dy = my - agent.y;
      if (Math.sqrt(dx * dx + dy * dy) < 28) {
        draggedAgent = agent;
        dragOffsetX = dx;
        dragOffsetY = dy;
        selectAgent(agent.id);
        break;
      }
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!draggedAgent || !swarmCanvas) return;
    const rect = swarmCanvas.getBoundingClientRect();
    draggedAgent.x = Math.max(30, Math.min(swarmCanvas.width - 30, e.clientX - rect.left - dragOffsetX));
    draggedAgent.y = Math.max(30, Math.min(swarmCanvas.height - 30, e.clientY - rect.top - dragOffsetY));
  });

  window.addEventListener('mouseup', () => {
    draggedAgent = null;
  });

  renderSwarmLoop();
}

function resizeSwarmCanvas() {
  if (!swarmCanvas) return;
  const wrap = document.getElementById('swarm-canvas-wrap');
  if (wrap) {
    swarmCanvas.width = wrap.clientWidth;
    swarmCanvas.height = wrap.clientHeight;
  }
}

function renderSwarmLoop() {
  if (!swarmCtx || !swarmCanvas) return;
  const w = swarmCanvas.width;
  const h = swarmCanvas.height;

  swarmCtx.clearRect(0, 0, w, h);

  // Grid background
  swarmCtx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
  swarmCtx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    swarmCtx.beginPath();
    swarmCtx.moveTo(x, 0);
    swarmCtx.lineTo(x, h);
    swarmCtx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    swarmCtx.beginPath();
    swarmCtx.moveTo(0, y);
    swarmCtx.lineTo(w, y);
    swarmCtx.stroke();
  }

  // Draw connecting bezier curves between agents
  const agents = SynapseState.swarmAgents;
  const time = Date.now() * 0.002;

  for (let i = 0; i < agents.length; i++) {
    for (let j = i + 1; j < agents.length; j++) {
      const a1 = agents[i];
      const a2 = agents[j];

      swarmCtx.beginPath();
      swarmCtx.moveTo(a1.x, a1.y);
      const midX = (a1.x + a2.x) / 2 + Math.sin(time + i) * 15;
      const midY = (a1.y + a2.y) / 2 + Math.cos(time + j) * 15;
      swarmCtx.quadraticCurveTo(midX, midY, a2.x, a2.y);

      swarmCtx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      swarmCtx.lineWidth = 1.5;
      swarmCtx.stroke();

      // Traveling data packet pulse
      const t = (time * 0.5 + i * 0.2) % 1;
      const px = (1 - t) * (1 - t) * a1.x + 2 * (1 - t) * t * midX + t * t * a2.x;
      const py = (1 - t) * (1 - t) * a1.y + 2 * (1 - t) * t * midY + t * t * a2.y;

      swarmCtx.fillStyle = '#00f0ff';
      swarmCtx.shadowColor = '#00f0ff';
      swarmCtx.shadowBlur = 8;
      swarmCtx.beginPath();
      swarmCtx.arc(px, py, 3, 0, Math.PI * 2);
      swarmCtx.fill();
      swarmCtx.shadowBlur = 0;
    }
  }

  // Draw agent nodes
  agents.forEach(agent => {
    // Slight wandering drift if not being dragged
    if (draggedAgent !== agent) {
      agent.x += agent.vx;
      agent.y += agent.vy;
      if (agent.x < 40 || agent.x > w - 40) agent.vx *= -1;
      if (agent.y < 40 || agent.y > h - 40) agent.vy *= -1;
    }

    const isSelected = agent.id === SynapseState.selectedAgentId;

    // Glowing halo
    swarmCtx.beginPath();
    swarmCtx.arc(agent.x, agent.y, isSelected ? 34 : 26, 0, Math.PI * 2);
    swarmCtx.fillStyle = isSelected ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)';
    swarmCtx.fill();

    swarmCtx.strokeStyle = isSelected ? '#00f0ff' : agent.color;
    swarmCtx.lineWidth = isSelected ? 2.5 : 1.5;
    if (isSelected) {
      swarmCtx.shadowColor = '#00f0ff';
      swarmCtx.shadowBlur = 15;
    }
    swarmCtx.stroke();
    swarmCtx.shadowBlur = 0;

    // Central core
    swarmCtx.beginPath();
    swarmCtx.arc(agent.x, agent.y, 14, 0, Math.PI * 2);
    swarmCtx.fillStyle = '#0a0e18';
    swarmCtx.fill();
    swarmCtx.strokeStyle = agent.color;
    swarmCtx.lineWidth = 2;
    swarmCtx.stroke();

    // Node label
    swarmCtx.fillStyle = isSelected ? '#ffffff' : '#8c9cb8';
    swarmCtx.font = '600 10.5px Orbitron, sans-serif';
    swarmCtx.textAlign = 'center';
    swarmCtx.fillText(agent.name, agent.x, agent.y + 46);
  });

  requestAnimationFrame(renderSwarmLoop);
}

function selectAgent(agentId) {
  playCyberSound('click');
  SynapseState.selectedAgentId = agentId;
  const agent = SynapseState.swarmAgents.find(a => a.id === agentId);
  if (!agent) return;

  const nameEl = document.getElementById('sel-agent-name');
  const roleEl = document.getElementById('sel-agent-role');
  const statusEl = document.getElementById('sel-agent-status');
  const computeEl = document.getElementById('sel-agent-compute');
  const packetsEl = document.getElementById('sel-agent-packets');
  const latencyEl = document.getElementById('sel-agent-latency');
  const tagEl = document.getElementById('selected-agent-tag');
  const iconEl = document.getElementById('sel-agent-icon');
  const logsEl = document.getElementById('agent-live-logs');

  if (nameEl) nameEl.textContent = agent.name;
  if (roleEl) roleEl.textContent = agent.role;
  if (statusEl) statusEl.textContent = agent.status;
  if (computeEl) computeEl.textContent = agent.compute;
  if (packetsEl) packetsEl.textContent = agent.packets;
  if (latencyEl) latencyEl.textContent = agent.latency;
  if (tagEl) tagEl.textContent = agent.name;
  if (iconEl) iconEl.className = `fa-solid ${agent.icon}`;

  if (logsEl && agent.logs) {
    logsEl.innerHTML = agent.logs.map(log => `
      <div class="l-line"><span class="l-time">[SYNC]</span> ${log}</div>
    `).join('');
  }
}

function addAgentToMesh() {
  playCyberSound('notify');
  const count = SynapseState.swarmAgents.length + 1;
  const newAgent = {
    id: `agent-${count}`,
    name: `SWARM-NODE-${count}`,
    role: 'Autonomous Auxiliary Worker',
    icon: 'fa-microchip',
    status: 'ACTIVE // RUNNING',
    compute: '32.0 TFLOPS',
    packets: '1,500,000 / sec',
    latency: '0.15 ms',
    x: 100 + Math.random() * (swarmCanvas.width - 200),
    y: 100 + Math.random() * (swarmCanvas.height - 200),
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: '#bd00ff',
    logs: ['Node initialized', 'Linked to swarm mesh', 'Processing tensor slices']
  };
  SynapseState.swarmAgents.push(newAgent);
  selectAgent(newAgent.id);
  showToast('AGENT DEPLOYED', `Swarm node ${newAgent.name} integrated into active mesh.`);
}

function triggerSwarmRebalance() {
  playCyberSound('switch');
  SynapseState.swarmAgents.forEach((a, i) => {
    a.vx = (Math.random() - 0.5) * 0.6;
    a.vy = (Math.random() - 0.5) * 0.6;
  });
  showToast('TOPOLOGY REBALANCED', 'Byzantine consensus routes recalculated across nodes.');
}

function dispatchAllAgents() {
  playCyberSound('notify');
  showToast('SWARM SYNCHRONIZED', 'All agents locked onto unified cognitive pipeline.');
}

function restartSelectedAgent() {
  playCyberSound('switch');
  const agent = SynapseState.swarmAgents.find(a => a.id === SynapseState.selectedAgentId);
  if (agent) {
    showToast('AGENT CYCLED', `${agent.name} process restarted with zero state loss.`);
  }
}

function promoteAgentToMaster() {
  playCyberSound('notify');
  const agent = SynapseState.swarmAgents.find(a => a.id === SynapseState.selectedAgentId);
  if (agent) {
    showToast('PRIORITY ELEVATED', `${agent.name} designated as primary consensus validator.`);
  }
}

// =====================================================================
// SETTINGS & PERSONA CALIBRATION
// =====================================================================
function selectPersona(cardEl, name, role) {
  playCyberSound('click');
  document.querySelectorAll('.persona-option-card').forEach(c => {
    c.classList.remove('active');
    c.querySelector('.persona-radio i').className = 'fa-regular fa-circle';
  });
  cardEl.classList.add('active');
  cardEl.querySelector('.persona-radio i').className = 'fa-solid fa-circle-check';

  SynapseState.activePersona.name = name.toUpperCase();
  SynapseState.activePersona.role = role;
  showToast('PERSONA RECALIBRATED', `Active assistant archetype shifted to ${name}.`);
}

function updateSliderVal(id, val) {
  const el = document.getElementById(`val-${id}`);
  if (el) el.textContent = val;
}

function resetDefaultParameters() {
  playCyberSound('switch');
  document.getElementById('slider-temp').value = 0.72;
  document.getElementById('val-temp').textContent = '0.72';
  document.getElementById('slider-depth').value = 4096;
  document.getElementById('val-depth').textContent = '4,096 tokens';
  document.getElementById('slider-strict').value = 99.8;
  document.getElementById('val-strict').textContent = '99.8%';
  showToast('PARAMETERS RESTORED', 'Cognitive hyperparameters reset to factory baseline.');
}

function toggleScanlinePref(checked) {
  SynapseState.scanlinesEnabled = checked;
  document.body.classList.toggle('scanlines-active', checked);
  const headerBtn = document.getElementById('btn-toggle-scanlines');
  if (headerBtn) headerBtn.classList.toggle('active', checked);
}

function toggleAudioPref(checked) {
  SynapseState.audioEnabled = checked;
  const headerBtn = document.getElementById('btn-toggle-audio');
  if (headerBtn) headerBtn.classList.toggle('active', checked);
}

function toggleParticlesPref(checked) {
  SynapseState.particlesEnabled = checked;
}

function toggleKeyVisibility() {
  playCyberSound('click');
  const field = document.getElementById('secret-key-field');
  const btn = document.getElementById('btn-toggle-key-visibility');
  if (field && btn) {
    const isPass = field.type === 'password';
    field.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
  }
}

function saveAllPreferences() {
  playCyberSound('notify');
  showToast('CALIBRATION COMMITTED', 'All cryptographic settings and neural preferences saved.');
}

// Header buttons toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleAudioBtn = document.getElementById('btn-toggle-audio');
  if (toggleAudioBtn) {
    toggleAudioBtn.addEventListener('click', () => {
      SynapseState.audioEnabled = !SynapseState.audioEnabled;
      toggleAudioBtn.classList.toggle('active', SynapseState.audioEnabled);
      const prefAudio = document.getElementById('pref-audio');
      if (prefAudio) prefAudio.checked = SynapseState.audioEnabled;
      playCyberSound('beep');
    });
  }

  const toggleScanlinesBtn = document.getElementById('btn-toggle-scanlines');
  if (toggleScanlinesBtn) {
    toggleScanlinesBtn.addEventListener('click', () => {
      SynapseState.scanlinesEnabled = !SynapseState.scanlinesEnabled;
      toggleScanlinesBtn.classList.toggle('active', SynapseState.scanlinesEnabled);
      document.body.classList.toggle('scanlines-active', SynapseState.scanlinesEnabled);
      const prefScan = document.getElementById('pref-scanlines');
      if (prefScan) prefScan.checked = SynapseState.scanlinesEnabled;
      playCyberSound('click');
    });
  }
});

// =====================================================================
// COMMAND PALETTE MODAL (Ctrl + K)
// =====================================================================
function initCommandPalette() {
  const modal = document.getElementById('command-modal');
  const search = document.getElementById('palette-search');
  const openBtn = document.getElementById('btn-command-palette');

  if (openBtn) {
    openBtn.addEventListener('click', openCommandPalette);
  }

  window.addEventListener('keydown', (e) => {
    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    // Escape to close
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCommandPalette();
    }
    // Number keys 1-6 for quick screen switching when modal not focused
    if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key >= '1' && e.key <= '6') {
        const screens = ['dashboard', 'chat', 'history', 'results', 'swarm', 'settings'];
        const target = screens[parseInt(e.key) - 1];
        if (target) navigateToScreen(target);
      }
    }
  });

  if (search) {
    search.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.palette-item').forEach(item => {
        const title = item.querySelector('.p-item-title')?.textContent.toLowerCase() || '';
        const desc = item.querySelector('.p-item-desc')?.textContent.toLowerCase() || '';
        item.style.display = (title.includes(q) || desc.includes(q)) ? 'flex' : 'none';
      });
    });
  }
}

function openCommandPalette() {
  playCyberSound('click');
  const modal = document.getElementById('command-modal');
  const search = document.getElementById('palette-search');
  if (modal) {
    modal.classList.add('active');
    if (search) {
      search.value = '';
      search.focus();
      document.querySelectorAll('.palette-item').forEach(i => i.style.display = 'flex');
    }
  }
}

function closeCommandPalette() {
  playCyberSound('switch');
  const modal = document.getElementById('command-modal');
  if (modal) modal.classList.remove('active');
}

function executePaletteAction(type, arg) {
  closeCommandPalette();
  if (type === 'screen') {
    navigateToScreen(arg);
  } else if (type === 'action' && arg === 'diagnostics') {
    triggerQuickSynthesis();
  }
}

// =====================================================================
// CYBER TOAST NOTIFICATIONS
// =====================================================================
let toastTimeout = null;
function showToast(title, desc) {
  const toast = document.getElementById('cyber-toast');
  const tTitle = document.getElementById('toast-title');
  const tDesc = document.getElementById('toast-desc');

  if (toast && tTitle && tDesc) {
    tTitle.textContent = title;
    tDesc.textContent = desc;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
}

// Utility: HTML Escaping
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
