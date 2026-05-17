# CRADLES

Mathematical & Physical Sciences — a static knowledge platform.

---

## How to publish a new post

### Step 1 — Create the post file

Add a `.js` file anywhere inside the `posts/` folder.
Name it whatever you like, descriptively:

```
posts/math-riemann-hypothesis.js
posts/physics-general-relativity.js
```

Write it using the `registerPost()` call:

```js
registerPost({
  mode:     'math',           // 'math' or 'physics'
  title:    'Your Title Here',
  category: 'analysis',       // see categories below
  date:     '18 May 2026',    // displayed as-is
  body: `
    Your prose here. Full LaTeX is supported.

    Inline math uses single dollar signs: $E = mc^2$

    Display math uses double dollar signs, on its own paragraph:

    $$\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}$$

    Blank lines between paragraphs become paragraph breaks.
    That's all — no HTML needed.
  `
});
```

**Math categories:** `calculus` · `algebra` · `trig` · `linalg` · `analysis`

**Physics categories:** `classical` · `em` · `thermo` · `quantum` · `relativity`

---

### Step 2 — Register it in posts.js

Open `posts.js` and add the file path to `POST_MANIFEST`:

```js
window.POST_MANIFEST = [
  'posts/math-euler-identity.js',
  'posts/physics-schrodinger-equation.js',
  'posts/math-riemann-hypothesis.js',   // ← your new post
];
```

Posts render **newest-first** — the last entry in the manifest
appears at the top of the page, so append new posts to the bottom.

---

### Step 3 — Push to GitHub

```bash
git add .
git commit -m "add post: Riemann Hypothesis"
git push
```

GitHub Pages rebuilds in ~30 seconds and your post is live.

---

## File structure

```
cradles/
├── index.html          ← page structure (never needs editing)
├── styles.css          ← design system (never needs editing)
├── script.js           ← application logic (never needs editing)
├── posts.js            ← manifest — edit this to register posts
├── vercel.json
├── README.md
└── posts/
    ├── math-euler-identity.js          ← example math post
    ├── physics-schrodinger-equation.js ← example physics post
    └── your-post-here.js               ← your posts go here
```

The only two files you ever touch are:
- **`posts.js`** — add one line to the manifest
- **`posts/your-new-post.js`** — write your content

---

## Deploy

**GitHub Pages** — push to `main`, enable Pages in Settings → Pages → `main / root`

**Vercel** — `vercel` in the project folder, or drag onto vercel.com/new

---

*In pursuit of the absolute.*
