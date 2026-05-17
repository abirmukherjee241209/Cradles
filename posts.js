/* ═══════════════════════════════════════════════════════════
   CRADLES · Post Registry
   ═══════════════════════════════════════════════════════════
   This file sets up the registry. Do not edit it.
   To add posts, see the instructions in index.html.
   ═══════════════════════════════════════════════════════════ */

window.CradlesRegistry = [];

window.registerPost = function (post) {
  window.CradlesRegistry.push(post);
};
