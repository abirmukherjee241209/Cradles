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
   Add the path to each new post file here.
   Posts render newest-first — append new posts at the bottom.
   ─────────────────────────────────────────────────────────── */
var POST_MANIFEST = [

  'posts/math-riemann.js',
  'posts/physics-schrodinger-equation.js',

];

/* ── Loader (do not edit) ────────────────────────────────────
   Starts fetching every post file immediately and stores a
   Promise that resolves once all of them have loaded.
   script.js waits on window.CradlesPostsReady before rendering.
   ─────────────────────────────────────────────────────────── */
window.CradlesPostsReady = Promise.all(
  POST_MANIFEST.map(function (src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload  = resolve;
      s.onerror = function () {
        console.warn('CRADLES: could not load post file "' + src + '"');
        resolve();
      };
      document.head.appendChild(s);
    });
  })
);
