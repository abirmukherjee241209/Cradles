/* ═══════════════════════════════════════════════════════════
   CRADLES · Post Registry & Manifest
   ═══════════════════════════════════════════════════════════

   HOW TO ADD A NEW POST
   ─────────────────────
   1. Create a new file inside the  posts/  folder.
      Name it anything descriptive, e.g.  posts/math-riemann.js

   2. Write your post using the registerPost() call.
      Copy any existing post file as a starting template.

   3. Add the file path to the MANIFEST list below.

   4. git add . && git commit -m "new post" && git push
      That's it — it goes live automatically.

   ═══════════════════════════════════════════════════════════ */

// Internal registry — do not edit this part.
window.CradlesRegistry = [];
window.registerPost = function (post) {
  window.CradlesRegistry.push(post);
};

/* ── MANIFEST ────────────────────────────────────────────────
   List every post file path here, one per line.
   Posts render newest-first, so order here doesn't matter.
   ─────────────────────────────────────────────────────────── */
window.POST_MANIFEST = [

  'posts/math-riemann.js.js',
  'posts/physics-schrodinger-equation.js',

];
