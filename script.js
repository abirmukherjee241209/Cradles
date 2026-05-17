/* ══════════════════════════════════════════════
   CRADLES · Application Script
══════════════════════════════════════════════ */

// ── State ─────────────────────────────────────
const state = { mode: 'math', filter: 'all' };

// ── Canvas theme colors ───────────────────────
const THEME = {
  math:    { r:196, g:134, b:42  },
  physics: { r:139, g:92,  b:246 },
};
let canvasCurrent = { ...THEME.math };
let canvasTarget  = { ...THEME.math };

// ── Hero copy ─────────────────────────────────
const HERO = {
  math:    { eyebrow:'The Discipline of', title:'Mathematics', desc:'Where precision meets elegance — explore the language of the universe.',        bg:'MATH' },
  physics: { eyebrow:'The Science of',    title:'Physics',     desc:'From quantum fields to cosmic scales — the fundamental laws governing reality.', bg:'PHYS' },
};

// ── Renderer examples ─────────────────────────
const EXAMPLES = {
  math:    ['$$e^{i\\pi}+1=0$$','$$\\zeta(s)=\\sum_{n=1}^{\\infty}\\frac{1}{n^s}$$','$$\\oint_C \\mathbf{F}\\cdot d\\mathbf{r}=0$$'],
  physics: ['$$i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle=\\hat{H}|\\psi\\rangle$$','$$G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\frac{8\\pi G}{c^4}T_{\\mu\\nu}$$','$$E=mc^2$$'],
};

// ── Floating symbols ──────────────────────────
const FLOAT = {
  math:    ['∑','∫','∂','∇','Δ','∞','π','φ','ℵ','∮','∝','λ','μ','σ','√','ℝ','ℂ','⊗'],
  physics: ['⚛','ℏ','γ','ψ','Ω','Φ','α','β','ε','ρ','τ','κ','θ','ξ','η','δ','Λ','⊕'],
};

// ── Library data ──────────────────────────────
const MATH_FILTERS = [
  { key:'all',      label:'All' },
  { key:'calculus', label:'Calculus' },
  { key:'algebra',  label:'Algebra' },
  { key:'trig',     label:'Trigonometry' },
  { key:'linalg',   label:'Linear Algebra' },
  { key:'analysis', label:'Analysis' },
];
const PHYSICS_FILTERS = [
  { key:'all',        label:'All' },
  { key:'classical',  label:'Classical Mechanics' },
  { key:'em',         label:'Electromagnetism' },
  { key:'thermo',     label:'Thermodynamics' },
  { key:'quantum',    label:'Quantum Mechanics' },
  { key:'relativity', label:'Relativity' },
];

const MATH_FORMULAS = [
  { cat:'calculus', name:'Fundamental Theorem of Calculus', latex:'$$\\int_a^b f\'(x)\\,dx = f(b)-f(a)$$',                                                           desc:'Connects differentiation and integration as inverse operations.' },
  { cat:'calculus', name:'Integration by Parts',            latex:'$$\\int u\\,dv = uv - \\int v\\,du$$',                                                             desc:'Transforms the integral of a product into a simpler form.' },
  { cat:'calculus', name:'Gaussian Integral',               latex:'$$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$',                                     desc:'A cornerstone result linking exponentials and the square root of π.' },
  { cat:'calculus', name:"L'Hôpital's Rule",                latex:'$$\\lim_{x\\to c}\\frac{f(x)}{g(x)} = \\lim_{x\\to c}\\frac{f\'(x)}{g\'(x)}$$',                  desc:'Evaluates limits of indeterminate forms using derivatives.' },
  { cat:'calculus', name:'Taylor Series',                   latex:'$$f(x) = \\sum_{n=0}^{\\infty}\\frac{f^{(n)}(a)}{n!}(x-a)^n$$',                                  desc:'Represents a smooth function as an infinite power series.' },
  { cat:'algebra',  name:'Quadratic Formula',               latex:'$$x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$',                                                       desc:'Gives the roots of any quadratic equation $ax^2+bx+c=0$.' },
  { cat:'algebra',  name:'Binomial Theorem',                latex:'$$(x+y)^n = \\sum_{k=0}^{n}\\binom{n}{k}x^{n-k}y^k$$',                                           desc:'Expands a binomial raised to any positive integer power.' },
  { cat:'algebra',  name:'AM–GM Inequality',                latex:'$$\\frac{a_1+\\cdots+a_n}{n}\\geq\\sqrt[n]{a_1\\cdots a_n}$$',                                    desc:'Arithmetic mean is always at least the geometric mean.' },
  { cat:'trig',     name:"Euler's Formula",                 latex:'$$e^{i\\theta}=\\cos\\theta+i\\sin\\theta$$',                                                      desc:'Unifies exponentials, trigonometry, and complex numbers.' },
  { cat:'trig',     name:'Pythagorean Identity',            latex:'$$\\sin^2\\theta+\\cos^2\\theta=1$$',                                                              desc:'The fundamental trigonometric identity.' },
  { cat:'trig',     name:'Angle Addition',                  latex:'$$\\cos(\\alpha+\\beta)=\\cos\\alpha\\cos\\beta-\\sin\\alpha\\sin\\beta$$',                         desc:'Expresses cosine of a sum in terms of individual angles.' },
  { cat:'linalg',   name:'Eigenvalue Equation',             latex:'$$A\\mathbf{v}=\\lambda\\mathbf{v}$$',                                                             desc:'A vector scaled by $A$ is equivalent to scalar multiplication by $\\lambda$.' },
  { cat:'linalg',   name:'Cauchy–Schwarz Inequality',       latex:'$$|\\langle\\mathbf{u},\\mathbf{v}\\rangle|^2\\leq\\langle\\mathbf{u},\\mathbf{u}\\rangle\\cdot\\langle\\mathbf{v},\\mathbf{v}\\rangle$$', desc:'Fundamental inequality in inner product spaces.' },
  { cat:'analysis', name:'Fourier Transform',               latex:'$$\\hat{f}(\\xi)=\\int_{-\\infty}^{\\infty}f(x)\\,e^{-2\\pi ix\\xi}\\,dx$$',                     desc:'Decomposes a function into its constituent frequencies.' },
  { cat:'analysis', name:"Cauchy's Integral Formula",       latex:'$$f(a)=\\frac{1}{2\\pi i}\\oint_{\\gamma}\\frac{f(z)}{z-a}\\,dz$$',                               desc:'Values inside a contour are determined by boundary values.' },
  { cat:'analysis', name:"Stokes' Theorem",                 latex:'$$\\iint_S(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}=\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r}$$', desc:'Relates a surface curl integral to its boundary line integral.' },
];
const PHYSICS_FORMULAS = [
  { cat:'classical',  name:"Newton's Second Law",         latex:'$$\\mathbf{F}=m\\mathbf{a}=\\frac{d\\mathbf{p}}{dt}$$',                                           desc:'Net force equals rate of change of momentum.' },
  { cat:'classical',  name:'Work–Energy Theorem',         latex:'$$W=\\Delta KE=\\tfrac{1}{2}mv_f^2-\\tfrac{1}{2}mv_i^2$$',                                        desc:'Net work done equals the change in kinetic energy.' },
  { cat:'classical',  name:'Angular Momentum',            latex:'$$\\mathbf{L}=\\mathbf{r}\\times\\mathbf{p}=I\\boldsymbol{\\omega}$$',                            desc:'Conserved quantity for isolated rotational systems.' },
  { cat:'classical',  name:'Gravitational Force',         latex:'$$F=G\\frac{m_1 m_2}{r^2}$$',                                                                     desc:"Newton's universal law of gravitation." },
  { cat:'em',         name:"Coulomb's Law",               latex:'$$\\mathbf{F}=k_e\\frac{q_1 q_2}{r^2}\\hat{r}$$',                                                desc:'Electrostatic force between two point charges.' },
  { cat:'em',         name:"Maxwell's Equations",         latex:'$$\\nabla\\cdot\\mathbf{E}=\\frac{\\rho}{\\varepsilon_0},\\quad\\nabla\\times\\mathbf{B}=\\mu_0\\mathbf{J}+\\mu_0\\varepsilon_0\\frac{\\partial\\mathbf{E}}{\\partial t}$$', desc:'The four pillars of classical electromagnetism.' },
  { cat:'em',         name:'Lorentz Force',               latex:'$$\\mathbf{F}=q(\\mathbf{E}+\\mathbf{v}\\times\\mathbf{B})$$',                                    desc:'Force on a charged particle in EM fields.' },
  { cat:'thermo',     name:'First Law of Thermodynamics', latex:'$$\\Delta U=Q-W$$',                                                                               desc:'Internal energy rises with heat and falls with work done.' },
  { cat:'thermo',     name:'Boltzmann Entropy',           latex:'$$S=k_B\\ln\\Omega$$',                                                                            desc:'Entropy as the logarithm of accessible microstates.' },
  { cat:'thermo',     name:'Ideal Gas Law',               latex:'$$PV=nRT=Nk_BT$$',                                                                               desc:'Relates pressure, volume, and temperature of an ideal gas.' },
  { cat:'quantum',    name:"Schrödinger Equation",        latex:'$$i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle=\\hat{H}|\\psi\\rangle$$',                  desc:'Governs the time evolution of quantum states.' },
  { cat:'quantum',    name:'Heisenberg Uncertainty',      latex:'$$\\sigma_x\\,\\sigma_p\\geq\\frac{\\hbar}{2}$$',                                                 desc:'Position and momentum cannot both be precisely known.' },
  { cat:'quantum',    name:'de Broglie Relation',         latex:'$$\\lambda=\\frac{h}{p}=\\frac{h}{mv}$$',                                                         desc:'Every particle has an associated matter wavelength.' },
  { cat:'relativity', name:'Mass–Energy Equivalence',     latex:'$$E=mc^2$$',                                                                                      desc:"Einstein's iconic relation: mass and energy interconvert." },
  { cat:'relativity', name:'Lorentz Factor',              latex:'$$\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}$$',                                                        desc:'Factor governing time dilation and length contraction.' },
  { cat:'relativity', name:'Spacetime Interval',          latex:'$$ds^2=-c^2\\,dt^2+dx^2+dy^2+dz^2$$',                                                            desc:'Invariant separation measure in four-dimensional spacetime.' },
  { cat:'relativity', name:'Einstein Field Equations',    latex:'$$G_{\\mu\\nu}+\\Lambda g_{\\mu\\nu}=\\frac{8\\pi G}{c^4}T_{\\mu\\nu}$$',                        desc:'Curvature of spacetime determined by matter and energy.' },
];
const CONSTANTS = [
  { sym:'c',  name:'Speed of Light',        val:'2.998 × 10⁸',   unit:'m s⁻¹' },
  { sym:'h',  name:"Planck's Constant",     val:'6.626 × 10⁻³⁴', unit:'J s' },
  { sym:'ℏ',  name:'Reduced Planck',        val:'1.055 × 10⁻³⁴', unit:'J s' },
  { sym:'G',  name:'Gravitational Const.',  val:'6.674 × 10⁻¹¹', unit:'N m² kg⁻²' },
  { sym:'kB', name:'Boltzmann Constant',    val:'1.381 × 10⁻²³', unit:'J K⁻¹' },
  { sym:'e',  name:'Elementary Charge',     val:'1.602 × 10⁻¹⁹', unit:'C' },
  { sym:'NA', name:"Avogadro's Number",     val:'6.022 × 10²³',  unit:'mol⁻¹' },
  { sym:'α',  name:'Fine Structure Const.', val:'7.297 × 10⁻³',  unit:'≈ 1/137' },
  { sym:'me', name:'Electron Mass',         val:'9.109 × 10⁻³¹', unit:'kg' },
  { sym:'ε₀', name:'Vacuum Permittivity',   val:'8.854 × 10⁻¹²', unit:'F m⁻¹' },
  { sym:'R',  name:'Gas Constant',          val:'8.314',          unit:'J mol⁻¹ K⁻¹' },
  { sym:'σ',  name:'Stefan–Boltzmann',      val:'5.670 × 10⁻⁸',  unit:'W m⁻² K⁻⁴' },
];

// ══════════════════════════════════════════════
// POST LOADING
// posts.js defines window.POST_MANIFEST and window.registerPost.
// We load each file in the manifest dynamically, then render.
// ══════════════════════════════════════════════

function loadScript(src) {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = () => { console.warn(`CRADLES: could not load "${src}"`); resolve(); };
    document.head.appendChild(s);
  });
}

async function loadAllPosts() {
  const manifest = window.POST_MANIFEST || [];
  for (const src of manifest) {
    await loadScript(src);
  }
}

// ══════════════════════════════════════════════
// LOADER
// ══════════════════════════════════════════════
function initLoader() {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 2600);
}

// ══════════════════════════════════════════════
// CANVAS
// ══════════════════════════════════════════════
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

  function mkPts() {
    pts = [];
    const n = Math.min(Math.floor(W * H / 18000), 55);
    for (let i = 0; i < n; i++) pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
      r: Math.random() * 1.2 + .3, o: Math.random() * .38 + .1,
    });
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function frame() {
    canvasCurrent.r = lerp(canvasCurrent.r, canvasTarget.r, .04);
    canvasCurrent.g = lerp(canvasCurrent.g, canvasTarget.g, .04);
    canvasCurrent.b = lerp(canvasCurrent.b, canvasTarget.b, .04);
    const { r, g, b } = canvasCurrent;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = `rgba(${r},${g},${b},0.025)`;
    ctx.lineWidth = .5;
    for (let x = 0; x < W; x += 88) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
    for (let y = 0; y < H; y += 88) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

    // Particles + connections
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${r},${g},${b},${p.o})`; ctx.fill();

      for (let j = i+1; j < pts.length; j++) {
        const q = pts[j], dx = p.x-q.x, dy = p.y-q.y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${.045*(1-d/115)})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }

  resize(); mkPts(); frame();
  window.addEventListener('resize', () => { resize(); mkPts(); });
}

// ══════════════════════════════════════════════
// FLOATING SYMBOLS
// ══════════════════════════════════════════════
function buildFloatSyms(mode) {
  const wrap = document.getElementById('float-wrap');
  wrap.innerHTML = '';
  FLOAT[mode].forEach((sym, i) => {
    const el  = document.createElement('span');
    el.className = 'float-sym';
    el.textContent = sym;
    el.style.cssText = [
      `left:${(i / FLOAT[mode].length * 95 + Math.random() * 5).toFixed(1)}%`,
      `font-size:${(.85 + Math.random() * 1.1).toFixed(2)}rem`,
      `--fdur:${(18 + Math.random() * 14).toFixed(1)}s`,
      `--fdel:${(Math.random() * 13).toFixed(1)}s`,
      `--frot:${((Math.random() - .5) * 18).toFixed(1)}deg`,
    ].join(';');
    wrap.appendChild(el);
  });
}

// ══════════════════════════════════════════════
// MODE SWITCH
// ══════════════════════════════════════════════
function setupModeToggle() {
  document.getElementById('btn-math').addEventListener('click',    () => switchMode('math'));
  document.getElementById('btn-physics').addEventListener('click', () => switchMode('physics'));
}

function switchMode(mode) {
  if (state.mode === mode) return;
  state.mode   = mode;
  state.filter = 'all';

  const ov = document.getElementById('mode-overlay');
  ov.classList.add('flash');
  ov.addEventListener('animationend', () => ov.classList.remove('flash'), { once: true });

  document.body.dataset.mode = mode;
  canvasTarget = { ...THEME[mode] };

  setTimeout(() => applyMode(mode), 300);
}

function applyMode(mode) {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

  const h = HERO[mode];
  document.getElementById('hero-eyebrow').textContent = h.eyebrow;
  document.getElementById('hero-title').textContent   = h.title;
  document.getElementById('hero-desc').textContent    = h.desc;
  document.getElementById('hero-bg-word').textContent = h.bg;

  document.getElementById('posts-title').textContent =
    mode === 'math' ? 'Mathematics Posts' : 'Physics Posts';
  renderPosts();

  document.getElementById('lib-title').textContent =
    mode === 'math' ? 'Formula Library' : 'Equations Library';
  buildFilters(mode);
  buildCards(mode, 'all');

  const sec = document.getElementById('section-constants');
  if (mode === 'physics') { sec.style.display = ''; buildConstants(); }
  else                     { sec.style.display = 'none'; }

  buildFloatSyms(mode);
}

// ══════════════════════════════════════════════
// POSTS — read from window.CradlesRegistry
// ══════════════════════════════════════════════
function renderPosts() {
  const all   = (window.CradlesRegistry || []).filter(p => p.mode === state.mode);
  const grid  = document.getElementById('posts-grid');
  const empty = document.getElementById('posts-empty');
  grid.innerHTML = '';

  if (!all.length) { empty.style.display = ''; return; }
  empty.style.display = 'none';

  // Reverse so last-listed post appears first (newest-first feel)
  [...all].reverse().forEach((post, i) => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.style.animationDelay = `${i * .07}s`;

    // Split body on blank lines → paragraphs
    const paragraphs = post.body.trim().split(/\n{2,}/)
      .map(p => `<p>${p.trim().replace(/\n/g,' ')}</p>`).join('');

    card.innerHTML = `
      <div class="post-meta">
        <span class="post-cat">${post.category}</span>
        <span class="post-date">${post.date}</span>
      </div>
      <h3 class="post-title">${post.title}</h3>
      <div class="post-body">${paragraphs}</div>
    `;
    grid.appendChild(card);
  });

  if (window.MathJax) MathJax.typesetPromise([grid]).catch(console.error);
}

// ══════════════════════════════════════════════
// FORMULA LIBRARY
// ══════════════════════════════════════════════
function buildFilters(mode) {
  const filters = mode === 'math' ? MATH_FILTERS : PHYSICS_FILTERS;
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = '';
  filters.forEach(f => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (f.key === 'all' ? ' active' : '');
    btn.textContent = f.label;
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = f.key;
      buildCards(mode, f.key);
    });
    bar.appendChild(btn);
  });
}

function buildCards(mode, filter) {
  const src  = mode === 'math' ? MATH_FORMULAS : PHYSICS_FORMULAS;
  const data = filter === 'all' ? src : src.filter(f => f.cat === filter);
  const grid = document.getElementById('formula-grid');
  grid.innerHTML = '';

  data.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'formula-card';
    card.style.animationDelay = `${i * .045}s`;
    card.innerHTML = `
      <div class="card-cat">${item.cat}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-formula">${item.latex}</div>
      <div class="card-desc">${item.desc}</div>
      <button class="card-use">Use in renderer →</button>
    `;
    card.querySelector('.card-use').addEventListener('click', e => {
      e.stopPropagation();
      loadIntoRenderer(item.latex);
    });
    grid.appendChild(card);
  });

  if (window.MathJax) MathJax.typesetPromise([grid]).catch(console.error);
}

function buildConstants() {
  const grid = document.getElementById('constants-grid');
  grid.innerHTML = '';
  CONSTANTS.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'constant-card';
    card.style.animationDelay = `${i * .04}s`;
    card.innerHTML = `
      <div class="const-symbol">${c.sym}</div>
      <div class="const-name">${c.name}</div>
      <div class="const-value">${c.val}</div>
      <div class="const-unit">${c.unit}</div>
    `;
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════
// RENDERER
// ══════════════════════════════════════════════
function setupRenderer() {
  document.getElementById('btn-render').addEventListener('click',  renderLatex);
  document.getElementById('btn-clear').addEventListener('click',   clearRenderer);
  document.getElementById('btn-example').addEventListener('click', insertExample);
  document.getElementById('latex-input').addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'Enter') renderLatex();
  });
}

function insertExample() {
  const pool = EXAMPLES[state.mode];
  document.getElementById('latex-input').value = pool[Math.floor(Math.random() * pool.length)];
}

function clearRenderer() {
  document.getElementById('latex-input').value = '';
  const out = document.getElementById('math-output');
  out.innerHTML = `<div class="out-empty"><span class="empty-sym">∅</span><span>Enter an expression and click Render</span></div>`;
  out.classList.remove('has-content');
}

async function renderLatex() {
  const out = document.getElementById('math-output');
  const tex = document.getElementById('latex-input').value.trim();
  if (!tex) { clearRenderer(); return; }
  out.innerHTML = `<div class="out-empty"><span style="color:var(--cp);animation:gem-pulse 1s ease-in-out infinite">◆</span><span>Rendering…</span></div>`;
  try {
    out.innerHTML = tex;
    out.classList.add('has-content');
    if (window.MathJax) await MathJax.typesetPromise([out]);
  } catch {
    out.innerHTML = `<div class="out-empty" style="color:var(--c3)">Syntax error — check your LaTeX.</div>`;
    out.classList.remove('has-content');
  }
}

function loadIntoRenderer(latex) {
  document.getElementById('latex-input').value = latex;
  document.getElementById('section-renderer').scrollIntoView({ behavior:'smooth', block:'center' });
  setTimeout(renderLatex, 400);
}

// ══════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════
function setupReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: .07 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', async () => {
  initLoader();
  initCanvas();
  setupModeToggle();
  setupRenderer();
  setupReveal();
  buildFloatSyms('math');
  buildFilters('math');
  buildCards('math', 'all');

  // Load post files from manifest, then render
  await loadAllPosts();
  renderPosts();

  // Re-typeset library once MathJax is ready
  if (window.MathJax) {
    MathJax.startup.promise.then(() => {
      buildCards(state.mode, state.filter);
    }).catch(() => {});
  }
});
