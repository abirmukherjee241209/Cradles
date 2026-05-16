/* ══════════════════════════════════════════════
   CRADLES · Application Script
══════════════════════════════════════════════ */

// ─── State ───────────────────────────────────
const state = {
  mode: 'math',
  filter: 'all',
};

// ─── Data ─────────────────────────────────────

const mathFormulas = [
  {
    cat: 'calculus',
    name: 'Fundamental Theorem of Calculus',
    latex: '$$\\int_a^b f\'(x)\\,dx = f(b) - f(a)$$',
    desc: 'Connects differentiation and integration as inverse operations.'
  },
  {
    cat: 'calculus',
    name: 'Integration by Parts',
    latex: '$$\\int u\\,dv = uv - \\int v\\,du$$',
    desc: 'Transforms the integral of a product into a simpler form.'
  },
  {
    cat: 'calculus',
    name: 'Gaussian Integral',
    latex: '$$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$',
    desc: 'A cornerstone result linking exponentials and the square root of π.'
  },
  {
    cat: 'calculus',
    name: "L'Hôpital's Rule",
    latex: '$$\\lim_{x\\to c}\\frac{f(x)}{g(x)} = \\lim_{x\\to c}\\frac{f\'(x)}{g\'(x)}$$',
    desc: 'Evaluates limits of indeterminate forms using derivatives.'
  },
  {
    cat: 'calculus',
    name: 'Taylor Series',
    latex: '$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$',
    desc: 'Represents a smooth function as an infinite power series.'
  },
  {
    cat: 'algebra',
    name: 'Quadratic Formula',
    latex: '$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$',
    desc: 'Gives the roots of any quadratic equation $ax^2+bx+c=0$.'
  },
  {
    cat: 'algebra',
    name: 'Binomial Theorem',
    latex: '$$(x+y)^n = \\sum_{k=0}^{n}\\binom{n}{k}x^{n-k}y^k$$',
    desc: 'Expands a binomial raised to any positive integer power.'
  },
  {
    cat: 'algebra',
    name: 'AM–GM Inequality',
    latex: '$$\\frac{a_1+a_2+\\cdots+a_n}{n} \\geq \\sqrt[n]{a_1 a_2 \\cdots a_n}$$',
    desc: 'The arithmetic mean is always at least the geometric mean.'
  },
  {
    cat: 'trig',
    name: "Euler's Formula",
    latex: '$$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$$',
    desc: 'The most beautiful equation: unifies exponentials, trig, and complex numbers.'
  },
  {
    cat: 'trig',
    name: 'Pythagorean Identity',
    latex: '$$\\sin^2\\theta + \\cos^2\\theta = 1$$',
    desc: 'The fundamental trigonometric identity, a consequence of the Pythagorean theorem.'
  },
  {
    cat: 'trig',
    name: 'Angle Addition',
    latex: '$$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$$',
    desc: 'Expresses the cosine of a sum in terms of individual angles.'
  },
  {
    cat: 'linalg',
    name: 'Eigenvalue Equation',
    latex: '$$A\\mathbf{v} = \\lambda\\mathbf{v}$$',
    desc: 'A vector $\\mathbf{v}$ scaled by matrix $A$ is equivalent to scalar multiplication by $\\lambda$.'
  },
  {
    cat: 'linalg',
    name: 'Cauchy–Schwarz Inequality',
    latex: '$$|\\langle \\mathbf{u},\\mathbf{v}\\rangle|^2 \\leq \\langle \\mathbf{u},\\mathbf{u}\\rangle \\cdot \\langle \\mathbf{v},\\mathbf{v}\\rangle$$',
    desc: 'A fundamental inequality in inner product spaces.'
  },
  {
    cat: 'linalg',
    name: "Cayley–Hamilton Theorem",
    latex: '$$p(A) = 0 \\quad\\text{where}\\quad p(\\lambda)=\\det(\\lambda I - A)$$',
    desc: 'Every square matrix satisfies its own characteristic equation.'
  },
  {
    cat: 'analysis',
    name: 'Fourier Transform',
    latex: '$$\\hat{f}(\\xi) = \\int_{-\\infty}^{\\infty} f(x)\\,e^{-2\\pi i x\\xi}\\,dx$$',
    desc: 'Decomposes a function into its constituent frequencies.'
  },
  {
    cat: 'analysis',
    name: "Cauchy's Integral Formula",
    latex: '$$f(a) = \\frac{1}{2\\pi i}\\oint_{\\gamma} \\frac{f(z)}{z-a}\\,dz$$',
    desc: 'A pillar of complex analysis: values inside determined by boundary values.'
  },
  {
    cat: 'analysis',
    name: "Stokes' Theorem",
    latex: '$$\\iint_S (\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S} = \\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}$$',
    desc: 'Relates a surface integral of the curl to a boundary line integral.'
  },
];

const physicsFormulas = [
  {
    cat: 'classical',
    name: "Newton's Second Law",
    latex: '$$\\mathbf{F} = m\\mathbf{a} = \\frac{d\\mathbf{p}}{dt}$$',
    desc: 'The net force on a body equals the rate of change of its momentum.'
  },
  {
    cat: 'classical',
    name: 'Work–Energy Theorem',
    latex: '$$W = \\Delta KE = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$$',
    desc: 'The net work done on an object equals its change in kinetic energy.'
  },
  {
    cat: 'classical',
    name: 'Angular Momentum',
    latex: '$$\\mathbf{L} = \\mathbf{r}\\times\\mathbf{p} = I\\boldsymbol{\\omega}$$',
    desc: 'Conserved quantity for isolated rotational systems.'
  },
  {
    cat: 'classical',
    name: 'Gravitational Force',
    latex: '$$F = G\\frac{m_1 m_2}{r^2}$$',
    desc: "Newton's law of universal gravitation between two masses."
  },
  {
    cat: 'em',
    name: "Coulomb's Law",
    latex: '$$\\mathbf{F} = k_e\\frac{q_1 q_2}{r^2}\\hat{r}$$',
    desc: 'Electrostatic force between two point charges separated by distance $r$.'
  },
  {
    cat: 'em',
    name: "Maxwell's Equations",
    latex: '$$\\nabla\\cdot\\mathbf{E} = \\frac{\\rho}{\\varepsilon_0},\\quad \\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}+\\mu_0\\varepsilon_0\\frac{\\partial\\mathbf{E}}{\\partial t}$$',
    desc: 'The four equations governing all classical electromagnetic phenomena.'
  },
  {
    cat: 'em',
    name: 'Lorentz Force',
    latex: '$$\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$$',
    desc: 'Force on a charged particle in electric and magnetic fields.'
  },
  {
    cat: 'thermo',
    name: 'First Law of Thermodynamics',
    latex: '$$\\Delta U = Q - W$$',
    desc: 'Internal energy increases by heat added and decreases by work done.'
  },
  {
    cat: 'thermo',
    name: 'Boltzmann Entropy',
    latex: '$$S = k_B \\ln\\Omega$$',
    desc: 'Entropy as the logarithm of the number of accessible microstates.'
  },
  {
    cat: 'thermo',
    name: 'Ideal Gas Law',
    latex: '$$PV = nRT = Nk_BT$$',
    desc: 'Relates pressure, volume, and temperature for an ideal gas.'
  },
  {
    cat: 'quantum',
    name: "Schrödinger Equation",
    latex: '$$i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle = \\hat{H}|\\psi\\rangle$$',
    desc: 'The fundamental equation governing quantum state evolution.'
  },
  {
    cat: 'quantum',
    name: 'Heisenberg Uncertainty Principle',
    latex: '$$\\sigma_x\\,\\sigma_p \\geq \\frac{\\hbar}{2}$$',
    desc: 'Position and momentum cannot both be precisely known simultaneously.'
  },
  {
    cat: 'quantum',
    name: 'de Broglie Relation',
    latex: '$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$',
    desc: 'Every particle has an associated wavelength inversely proportional to its momentum.'
  },
  {
    cat: 'relativity',
    name: 'Mass–Energy Equivalence',
    latex: '$$E = mc^2$$',
    desc: "Einstein's iconic relation: mass and energy are interconvertible."
  },
  {
    cat: 'relativity',
    name: 'Lorentz Factor',
    latex: '$$\\gamma = \\frac{1}{\\sqrt{1-\\dfrac{v^2}{c^2}}}$$',
    desc: 'Time dilation and length contraction factor for bodies in relative motion.'
  },
  {
    cat: 'relativity',
    name: 'Spacetime Interval',
    latex: '$$ds^2 = -c^2\\,dt^2 + dx^2 + dy^2 + dz^2$$',
    desc: 'An invariant measure of separation in four-dimensional spacetime.'
  },
  {
    cat: 'relativity',
    name: 'Einstein Field Equations',
    latex: '$$G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}$$',
    desc: 'Relates the curvature of spacetime to the distribution of matter and energy.'
  },
];

const physicsConstants = [
  { symbol: 'c',  name: 'Speed of Light',        value: '2.998 × 10⁸',  unit: 'm s⁻¹' },
  { symbol: 'h',  name: "Planck's Constant",      value: '6.626 × 10⁻³⁴', unit: 'J s' },
  { symbol: 'ℏ',  name: 'Reduced Planck',         value: '1.055 × 10⁻³⁴', unit: 'J s' },
  { symbol: 'G',  name: 'Gravitational Constant',  value: '6.674 × 10⁻¹¹', unit: 'N m² kg⁻²' },
  { symbol: 'kB', name: 'Boltzmann Constant',      value: '1.381 × 10⁻²³', unit: 'J K⁻¹' },
  { symbol: 'e',  name: 'Elementary Charge',       value: '1.602 × 10⁻¹⁹', unit: 'C' },
  { symbol: 'NA', name: "Avogadro's Number",       value: '6.022 × 10²³',  unit: 'mol⁻¹' },
  { symbol: 'α',  name: 'Fine Structure Constant', value: '7.297 × 10⁻³',  unit: '≈ 1/137' },
  { symbol: 'me', name: 'Electron Mass',           value: '9.109 × 10⁻³¹', unit: 'kg' },
  { symbol: 'ε₀', name: 'Vacuum Permittivity',     value: '8.854 × 10⁻¹²', unit: 'F m⁻¹' },
  { symbol: 'μ₀', name: 'Vacuum Permeability',     value: '1.257 × 10⁻⁶',  unit: 'H m⁻¹' },
  { symbol: 'R',  name: 'Gas Constant',             value: '8.314',         unit: 'J mol⁻¹ K⁻¹' },
];

const modeHero = {
  math: {
    eyebrow: 'The Discipline of',
    title: 'Mathematics',
    desc: 'Where precision meets elegance — render, explore, and understand<br />the language of the universe.',
    bgText: 'MATH',
  },
  physics: {
    eyebrow: 'The Science of',
    title: 'Physics',
    desc: 'From quantum fields to cosmic scales — the fundamental laws<br />that govern the fabric of reality.',
    bgText: 'PHYS',
  },
};

const modeExamples = {
  math: [
    '$$\\zeta(s) = \\sum_{n=1}^{\\infty}\\frac{1}{n^s}$$',
    '$$e^{i\\pi} + 1 = 0$$',
    '$$\\nabla^2 f = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2}$$',
  ],
  physics: [
    '$$\\hat{H}\\psi = E\\psi$$',
    '$$E = mc^2$$',
    '$$\\nabla\\cdot\\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}$$',
  ],
};

const mathFilters   = [
  { key: 'all',      label: 'All' },
  { key: 'calculus', label: 'Calculus' },
  { key: 'algebra',  label: 'Algebra' },
  { key: 'trig',     label: 'Trigonometry' },
  { key: 'linalg',   label: 'Linear Algebra' },
  { key: 'analysis', label: 'Analysis' },
];
const physicsFilters = [
  { key: 'all',       label: 'All' },
  { key: 'classical', label: 'Classical Mechanics' },
  { key: 'em',        label: 'Electromagnetism' },
  { key: 'thermo',    label: 'Thermodynamics' },
  { key: 'quantum',   label: 'Quantum Mechanics' },
  { key: 'relativity',label: 'Relativity' },
];

const floatingMath    = ['∑','∫','∂','∇','Δ','∞','π','φ','ℵ','∮','⊕','∝','⊗','√','λ','μ','σ'];
const floatingPhysics = ['⚛','ℏ','γ','ψ','Ω','Φ','α','β','ε','ρ','τ','κ','ξ','θ'];

// ─── Loader ─────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('done'), 2600);
}

// ─── Background Canvas ──────────────────────
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticles() {
    particles = [];
    const count = Math.min(Math.floor((W * H) / 18000), 60);
    for (let i = 0; i < count; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r:  Math.random() * 1.2 + 0.3,
        o:  Math.random() * 0.4 + 0.1,
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Subtle grid
    ctx.strokeStyle = 'rgba(201,168,76,0.025)';
    ctx.lineWidth   = 0.5;
    const grid = 90;
    for (let x = 0; x < W; x += grid) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += grid) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Particles + connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.o})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q  = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(201,168,76,${0.04 * (1 - d / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(frame);
  }

  resize();
  mkParticles();
  frame();
  window.addEventListener('resize', () => { resize(); mkParticles(); });
}

// ─── Floating Symbols ───────────────────────
function populateFloatingSymbols(mode) {
  const container = document.getElementById('floating-symbols');
  container.innerHTML = '';
  const pool = mode === 'math' ? floatingMath : floatingPhysics;
  const count = 18;

  for (let i = 0; i < count; i++) {
    const el  = document.createElement('span');
    el.className   = 'float-sym';
    el.textContent = pool[i % pool.length];

    const left   = Math.random() * 95;
    const dur    = 18 + Math.random() * 14;
    const delay  = Math.random() * 14;
    const rot    = (Math.random() - 0.5) * 20;
    const size   = 0.9 + Math.random() * 1.2;

    el.style.cssText = `left:${left}%;font-size:${size}rem;
      --dur-f:${dur}s;--del-f:${delay}s;--rot:${rot}deg;`;

    container.appendChild(el);
  }
}

// ─── Mode Switch ────────────────────────────
function setupModeToggle() {
  document.getElementById('btn-math').addEventListener('click',    () => switchMode('math'));
  document.getElementById('btn-physics').addEventListener('click', () => switchMode('physics'));
}

function switchMode(mode) {
  if (state.mode === mode) return;
  state.mode   = mode;
  state.filter = 'all';

  const overlay = document.getElementById('mode-overlay');
  overlay.classList.add('flash');
  overlay.addEventListener('animationend', () => overlay.classList.remove('flash'), { once: true });

  setTimeout(() => {
    applyMode(mode);
  }, 250);
}

function applyMode(mode) {
  // Buttons
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });

  // Hero
  const h = modeHero[mode];
  document.getElementById('hero-eyebrow').textContent = h.eyebrow;
  document.getElementById('hero-title').textContent   = h.title;
  document.getElementById('hero-desc').innerHTML      = h.desc;
  document.getElementById('hero-bg-text').textContent = h.bgText;

  // Constants section
  const sec = document.getElementById('section-constants');
  const pdfsecnum = document.getElementById('pdf-section-num');
  if (mode === 'physics') {
    sec.style.display = '';
    pdfsecnum.textContent = '04';
    buildConstants();
  } else {
    sec.style.display = 'none';
    pdfsecnum.textContent = '03';
  }

  // Library
  document.getElementById('library-title').textContent = mode === 'math'
    ? 'Formula Library' : 'Equations Library';
  buildFilters(mode);
  buildCards(mode, 'all');

  // Floating symbols
  populateFloatingSymbols(mode);

  // Example button text
  updateExampleBtn();
}

// ─── Formula Library ───────────────────────
function buildFilters(mode) {
  const filters = mode === 'math' ? mathFilters : physicsFilters;
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = '';
  filters.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (f.key === 'all' ? ' active' : '');
    btn.textContent = f.label;
    btn.dataset.filter = f.key;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = f.key;
      buildCards(mode, f.key);
    });
    bar.appendChild(btn);
  });
}

function buildCards(mode, filter) {
  const data = (mode === 'math' ? mathFormulas : physicsFormulas)
    .filter(f => filter === 'all' || f.cat === filter);

  const grid = document.getElementById('formula-grid');
  grid.innerHTML = '';

  data.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="card-cat">${item.cat}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-formula">${item.latex}</div>
      <div class="card-desc">${item.desc}</div>
      <button class="card-use">Use in renderer →</button>
    `;
    card.querySelector('.card-use').addEventListener('click', (e) => {
      e.stopPropagation();
      loadIntoRenderer(item.latex);
    });
    grid.appendChild(card);
  });

  // Typeset newly added cards
  if (window.MathJax) {
    MathJax.typesetPromise([grid]).catch(console.error);
  }
}

function buildConstants() {
  const grid = document.getElementById('constants-grid');
  grid.innerHTML = '';
  physicsConstants.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'constant-card';
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <div class="const-symbol">${c.symbol}</div>
      <div class="const-name">${c.name}</div>
      <div class="const-value">${c.value}</div>
      <div class="const-unit">${c.unit}</div>
    `;
    grid.appendChild(card);
  });
}

// ─── Formula Renderer ───────────────────────
function setupRenderer() {
  const input  = document.getElementById('latex-input');
  const output = document.getElementById('math-output');

  document.getElementById('btn-render').addEventListener('click', renderLatex);
  document.getElementById('btn-clear').addEventListener('click', () => {
    input.value = '';
    output.innerHTML = `<div class="output-empty">
      <span class="empty-icon">∅</span>
      <span>Enter an expression and click Render</span>
    </div>`;
    output.classList.remove('has-content');
  });

  document.getElementById('btn-example').addEventListener('click', insertExample);

  input.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') renderLatex();
  });
}

function updateExampleBtn() { /* examples update on click */ }

function insertExample() {
  const examples = modeExamples[state.mode];
  const pick = examples[Math.floor(Math.random() * examples.length)];
  document.getElementById('latex-input').value = pick;
}

async function renderLatex() {
  const input  = document.getElementById('latex-input');
  const output = document.getElementById('math-output');
  const tex    = input.value.trim();

  if (!tex) {
    output.innerHTML = `<div class="output-empty"><span class="empty-icon">∅</span><span>Nothing to render</span></div>`;
    output.classList.remove('has-content');
    return;
  }

  output.innerHTML = `<div class="output-empty"><span style="animation:gem-pulse 1s ease-in-out infinite;color:var(--g600)">◆</span><span>Rendering…</span></div>`;

  try {
    output.innerHTML = tex;
    output.classList.add('has-content');
    if (window.MathJax) {
      await MathJax.typesetPromise([output]);
    }
  } catch (err) {
    output.innerHTML = `<div class="output-empty" style="color:var(--g700)">Failed to render — check your LaTeX syntax.</div>`;
    output.classList.remove('has-content');
  }
}

function loadIntoRenderer(latex) {
  document.getElementById('latex-input').value = latex;
  document.getElementById('section-renderer').scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(renderLatex, 400);
}

// ─── PDF Upload ─────────────────────────────
function setupPDF() {
  const zone      = document.getElementById('upload-zone');
  const fileInput = document.getElementById('pdf-file-input');
  const resetBtn  = document.getElementById('pdf-reset');

  zone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) handlePDF(e.target.files[0]);
  });

  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-active'); });
  zone.addEventListener('dragleave', ()  => zone.classList.remove('drag-active'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-active');
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') handlePDF(f);
  });

  resetBtn.addEventListener('click', resetPDF);

  document.querySelectorAll('.pdf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pdf-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('pdf-tab-pages').style.display = tab.dataset.tab === 'pages' ? '' : 'none';
      document.getElementById('pdf-tab-text').style.display  = tab.dataset.tab === 'text'  ? '' : 'none';
    });
  });
}

async function handlePDF(file) {
  const zone     = document.getElementById('upload-zone');
  const result   = document.getElementById('pdf-result');
  const nameEl   = document.getElementById('pdf-result-name');
  const metaEl   = document.getElementById('pdf-result-meta');
  const pagesWrap = document.getElementById('pdf-pages-wrap');
  const textEl   = document.getElementById('pdf-text-content');

  zone.style.display = 'none';
  result.style.display = '';
  nameEl.textContent = file.name;
  pagesWrap.innerHTML = `<div class="pdf-progress">Loading document…</div>`;
  textEl.innerHTML    = '';

  if (typeof pdfjsLib === 'undefined') {
    pagesWrap.innerHTML = `<div class="pdf-progress" style="color:var(--g700)">PDF.js not loaded. Check your connection and refresh.</div>`;
    return;
  }

  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdf.numPages;

    metaEl.textContent = `${totalPages} page${totalPages !== 1 ? 's' : ''}`;
    pagesWrap.innerHTML = '';

    let fullText = '';
    const renderLimit = Math.min(totalPages, 8);

    for (let i = 1; i <= renderLimit; i++) {
      const page     = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.9 });

      const canvas = document.createElement('canvas');
      canvas.className       = 'pdf-page-canvas';
      canvas.width           = viewport.width;
      canvas.height          = viewport.height;
      pagesWrap.appendChild(canvas);

      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

      // Extract text
      const content  = await page.getTextContent();
      const pageText = content.items.map(it => it.str).join(' ');
      fullText += `— Page ${i} —\n${pageText}\n\n`;
    }

    textEl.textContent = fullText || 'No extractable text found in this PDF.';

    // Typeset math in text
    if (window.MathJax && fullText) {
      await MathJax.typesetPromise([textEl]).catch(()=>{});
    }

  } catch (err) {
    console.error(err);
    pagesWrap.innerHTML = `<div class="pdf-progress" style="color:var(--g700)">Could not render PDF: ${err.message}</div>`;
  }
}

function resetPDF() {
  document.getElementById('upload-zone').style.display = '';
  document.getElementById('pdf-result').style.display  = 'none';
  document.getElementById('pdf-file-input').value      = '';
  document.getElementById('pdf-pages-wrap').innerHTML  = '';
  document.getElementById('pdf-text-content').innerHTML = '';
}

// ─── Scroll Reveal ──────────────────────────
function setupScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
const posts = [
  {
    title: "On Fourier Analysis",
    date: "May 2026",
    desc: "A short exploration of Fourier transforms and symmetry.",
    link: "posts/fourier.html"
  },

  {
    title: "A Brief Introduction to Lagrangian Mechanics",
    date: "April 2026",
    desc: "Thoughts on a new way of describing dyanmics.",
    link: "posts/lagrangian.html"
  }
];
const postsGrid = document.getElementById("posts-grid");

posts.forEach(post => {
  const card = document.createElement("a");

  card.className = "post-card";
  card.href = post.link;

  card.innerHTML = `
    <div class="post-date">${post.date}</div>
    <h3 class="post-title">${post.title}</h3>
    <p class="post-desc">${post.desc}</p>
  `;

  postsGrid.appendChild(card);
});

// ─── Init ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCanvas();
  setupModeToggle();
  setupRenderer();
  setupPDF();
  setupScrollReveal();

  // Initial render
  populateFloatingSymbols('math');
  buildFilters('math');
  buildCards('math', 'all');

  // Render placeholder after MathJax loads
  if (window.MathJax) {
    MathJax.startup.promise.then(() => {
      buildCards(state.mode, state.filter);
    }).catch(()=>{});
  } else {
    window.addEventListener('load', () => {
      if (window.MathJax) buildCards(state.mode, state.filter);
    });
  }
});
