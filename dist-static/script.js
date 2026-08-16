(function () {
  "use strict";

  /* ---- FAQ accordion (single, collapsible) ---- */
  document.querySelectorAll('button[aria-expanded]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls") || "") ||
      (btn.closest("h3") && btn.closest("h3").nextElementSibling);
    if (!panel || panel.getAttribute("role") !== "region") return;
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      if (!open) {
        document.querySelectorAll('button[aria-expanded="true"]').forEach(function (other) {
          if (other !== btn) other.click();
        });
      }
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      btn.setAttribute("data-state", open ? "closed" : "open");
      var h3 = btn.closest("h3");
      if (h3) h3.setAttribute("data-state", open ? "closed" : "open");
      var item = btn.closest("[data-orientation]") && btn.closest("h3") && btn.closest("h3").parentElement;
      if (item) item.setAttribute("data-state", open ? "closed" : "open");
      panel.setAttribute("data-state", open ? "closed" : "open");
      if (open) panel.setAttribute("hidden", "");
      else panel.removeAttribute("hidden");
    });
  });

  /* ---- Before/after slider ---- */
  var handle = document.querySelector('[role="slider"][aria-label]');
  if (!handle) return;
  var box = handle.parentElement;
  var clip = box.querySelector('[style*="clip-path"]');
  var line = box.querySelector('.wave-rule[style*="left"]');
  var dragging = false;

  function setPos(pct) {
    pct = Math.max(0, Math.min(100, pct));
    if (clip) clip.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    if (line) line.style.left = pct + "%";
    handle.style.left = pct + "%";
    handle.setAttribute("aria-valuenow", String(Math.round(pct)));
  }
  function fromX(x) {
    var r = box.getBoundingClientRect();
    setPos(((x - r.left) / r.width) * 100);
  }
  box.addEventListener("pointerdown", function (e) {
    dragging = true;
    fromX(e.clientX);
  });
  window.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    e.preventDefault();
    fromX(e.clientX);
  }, { passive: false });
  ["pointerup", "pointercancel"].forEach(function (ev) {
    window.addEventListener(ev, function () { dragging = false; });
  });
  handle.addEventListener("keydown", function (e) {
    var cur = parseFloat(handle.getAttribute("aria-valuenow") || "50");
    if (e.key === "ArrowLeft") { setPos(cur - 2); e.preventDefault(); }
    if (e.key === "ArrowRight") { setPos(cur + 2); e.preventDefault(); }
  });
})();
