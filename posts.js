/* ═══════════════════════════════════════════════════════════
   CRADLES · Post Registry & Manifest
   ═══════════════════════════════════════════════════════════

   HOW TO ADD A NEW POST
   ─────────────────────
   1. Create a new file inside the  posts/  folder.
      Name it anything descriptive, e.g.  posts/math-riemann.js

   2. Write your post using registerPost() — copy any existing
      post file as a template.

   3. Add its path to POST_MANIFEST below.

   4. git add . && git commit -m "new post" && git push
      Live in ~30 seconds.

   ═══════════════════════════════════════════════════════════ */

// Registry — do not edit.
window.CradlesRegistry = [];
window.registerPost = function (post) {
  window.CradlesRegistry.push(post);
};

/* ── MANIFEST ────────────────────────────────────────────────
   Add the path to each post file here.
   Posts render newest-first — append new posts at the bottom.
   ─────────────────────────────────────────────────────────── */

window.POST_MANIFEST = [
  'posts/math-euler-identity.js',
  'posts/physics-schrodinger-equation.js',
  'posts/math-riemann-hypothesis.js',   // ← your new post
];
/* ── Loader (do not edit) ────────────────────────────────────
   Injects each post file as a synchronous <script> tag during
   the page parse, so all posts are registered before script.js
   ever runs. Works on GitHub Pages and local file:// alike.
   ─────────────────────────────────────────────────────────── */
POST_MANIFEST.forEach(function (src) {
  document.write('<script src="' + src + '"><\/script>');
});
