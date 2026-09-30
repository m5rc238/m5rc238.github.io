/* ==========================================================================
   main.js — A Manifesto for Epistemic Resilience
   GSAP 3 + ScrollTrigger + Flip (free/MIT) + self-contained fallbacks:
     · scramble text   → hand-rolled glyph decryption (Club-only ScrambleText
                         deliberately not loaded)
     · kinetic reveals → block-level opacity/y scrub
     · SVG path draw   → strokeDashoffset (Club-only DrawSVG not loaded)
   10 principles are full-height scrolling sections (no pinning); each
   one's internal art (scramble, kinetic, Flip board, blind-spot lens,
   resilience pipeline) is scrubbed from its own timeline as the section
   passes through the viewport.
   All motion gated behind (prefers-reduced-motion: no-preference).
   ========================================================================== */

(function () {
  "use strict";

  if (typeof window.gsap === "undefined") return;

  var gsap = window.gsap;

  var plugins = [];
  if (typeof window.ScrollTrigger !== "undefined") plugins.push(window.ScrollTrigger);
  if (typeof window.Flip !== "undefined") plugins.push(window.Flip);
  if (plugins.length) gsap.registerPlugin(plugins);

  // elements in the deck are animated by their slide's timeline —
  // never by standalone section triggers
  function inDeck(el) {
    return !!el.closest(".deck");
  }

  /* ------------------------------------------------------------------
     1) KINETIC REVEALS  (hero/intro/closing only — deck handled by slides)
        each paragraph/block: opacity .15 → 1, y 10 → 0, scrubbed through
        the element. (Line-precise splitting would need the Club SplitText
        plugin; block granularity keeps everything self-contained.)
     ------------------------------------------------------------------ */
  function initKinetic() {
    document.querySelectorAll("[data-kinetic]").forEach(function (el) {
      if (inDeck(el)) return;
      var blocks = el.children.length ? gsap.utils.toArray(el.children) : [el];
      var targets = blocks.filter(function (b) { return (b.textContent || "").trim(); });
      gsap.from(targets, {
        opacity: 0.15,
        y: 10,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          end: "bottom 38%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    });
  }

  /* ------------------------------------------------------------------
     2) SCRAMBLE STATEMENTS  (in-slide, deck timeline)
        Text begins as shifting glyphs and locks into clear type as the
        slide's scroll progress advances; scrubbing back re-scrambles it.
        Self-contained progress tween, not the Club ScrambleText.
     ------------------------------------------------------------------ */
  var GLYPHS = "01?X#$&/░▒▓┌┐└┘─│";

  // renders the scrambled state for progress p (0 = fully scrambled)
  function renderScramble(el, proxy, len, final) {
    var cut = Math.floor(proxy.p * len);
    var out = "";
    for (var i = 0; i < len; i++) {
      out += i < cut
        ? final.charAt(i)
        : GLYPHS.charAt((i * 7 + ((Math.random() * GLYPHS.length) | 0)) % GLYPHS.length);
    }
    el.textContent = out;
  }

  // adds a scrubbed scramble child to a timeline at the given position,
  // resolving across the full art leg (duration = artLeg)
  function addScramble(tl, el, pos, dur) {
    var final = el.getAttribute("data-scramble") || el.textContent;
    var len = final.length;
    var proxy = { p: 0 };
    tl.to(proxy, {
      p: 1,
      duration: dur,
      ease: "none",
      onUpdate: function () { renderScramble(el, proxy, len, final); },
    }, pos);
  }

  /* ------------------------------------------------------------------
     3) §03 — MONOLITH → FOUR CARDS  (GSAP Flip)
        Fires once, tied to slide 03's deck progress (>= 55%), plus a
        pointer hover as a polite bonus. Flip.from needs no studio plugin.
     ------------------------------------------------------------------ */
  function flipper() {
    var pile = document.querySelector("[data-flip]");
    var mono = pile && pile.querySelector(".m-monolith");
    var entered = false;
    var locking = false; // non-reversible — once the board is split it stays split
    return {
      pile: pile,
      entered: entered,
      maybe: function () {
        if (!pile || entered || locking) return;
        // wait for the pile's own reveal (it fades in via data-reveal)
        if (parseFloat(window.getComputedStyle(pile).opacity) < 0.5) return;
        entered = true;
        locking = false;
        var label = pile.querySelector(".m-supp");
        label.textContent = "FOUR OPERATIONS — DECOMPOSED INTO FOUR BOXES";

        if (typeof window.Flip === "undefined") {
          pile.classList.add("pile--split");
          mono.classList.add("off");
          return;
        }
        var cards = Array.prototype.slice.call(pile.querySelectorAll(".m-card"));
        var state = window.Flip.getState(cards);
        pile.classList.add("pile--split");
        mono.classList.add("off");
        window.Flip.from(state, {
          absolute: true,
          scale: true,
          duration: 1.1,
          ease: "power4.inOut",
          stagger: 0.06,
          onEnter: function (elements) {
            gsap.fromTo(elements, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 });
          },
        }).eventCallback("onComplete", function () {
          // the split can change the slide's inner height (fake-scroll
          // budget and downstream trigger points) → remeasure
          window.ScrollTrigger.refresh();
        });
      },
      rearm: function () { if (!locking) entered = false; },
    };
  }

  /* ------------------------------------------------------------------
     4) 01–10 — PRINCIPLE SECTIONS  (scrubbed, not pinned)
        Each .slide is a full-height normal-flow section. As it scrolls
        through the viewport, its own timeline scrubs the internal art:
        scramble decrypts, kinetic blocks reveal, the lens grows, and the
        pipeline draws. No pinning, no scale-out — the page scrolls like a
        normal document and the content animates along the way.
     ------------------------------------------------------------------ */
  function initDeck() {
    var slides = gsap.utils.toArray(".slide");
    if (!slides.length) return;

    slides.forEach(function (slide) {
      var inner = slide.querySelector(".slide__inner");
      if (!inner) return;

      var is03 = !!slide.querySelector("[data-flip]");
      var is07 = !!slide.querySelector("[data-blindspot]");
      var is09 = !!slide.querySelector("[data-pipeline]");

      var fl = is03 ? flipper() : null;

      // art resolves while the section travels up through the viewport
      var st = {
        trigger: slide,
        start: "top 86%",
        end: "bottom 38%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: fl ? function (self) {
          if (self.progress >= 0.55) fl.maybe();
          else fl.rearm(); // scrolling back before the split re-arms it
        } : undefined,
      };

      var tl = gsap.timeline({ scrollTrigger: st, defaults: { ease: "none" } });
      var ART_HOLD = 0.6;

      // scramble statement — decrypts across the art leg
      var sc = slide.querySelector("[data-scramble]");
      if (sc) addScramble(tl, sc, 0, ART_HOLD);

      // kinetic reveals inside the slide
      slide.querySelectorAll("[data-kinetic]").forEach(function (k) {
        var blocks = k.children.length ? gsap.utils.toArray(k.children) : [k];
        var targets = blocks.filter(function (b) { return (b.textContent || "").trim(); });
        if (targets.length) tl.from(targets, { opacity: 0.15, y: 10, stagger: 0.08, duration: Math.min(0.45, ART_HOLD) }, 0);
      });

      // one-shot reveal blurbs
      slide.querySelectorAll("[data-reveal]").forEach(function (el) {
        tl.from(el, { autoAlpha: 0, y: 18, duration: Math.min(0.3, ART_HOLD) }, Math.min(0.12, ART_HOLD));
      });

      // §07 — blind-spot lens grows with the slide (54px → full coverage)
      if (is07) {
        var lens = slide.querySelector(".blindspot__lens");
        gsap.set(lens, { "--lens": "54px", clipPath: "circle(54px at 50% 58%)" });
        tl.to(lens, {
          "--lens": "840px",
          duration: ART_HOLD,
          onUpdate: function () {
            if (slide.classList.contains("peeking")) return; // CSS takes over
            lens.style.clipPath = "circle(" + parseFloat(lens.style.getPropertyValue("--lens") || "54") + "px at 50% 58%)";
          },
        }, 0);
      }

      // §09 — resilience pipeline draws its loop
      if (is09) {
        var path = slide.querySelector(".pl-path");
        var nodes = Array.prototype.slice.call(slide.querySelectorAll(".pl-node"));
        tl.fromTo(path, { strokeDashoffset: 1 }, {
          strokeDashoffset: 0,
          duration: ART_HOLD,
          onUpdate: function () {
            var p = this.progress();
            var lit = Math.min(nodes.length - 1, Math.floor(p * (nodes.length - 1)));
            nodes.forEach(function (n, i) { n.classList.toggle("on", i <= lit); });
          },
        }, 0);
      }

      if (is03 && fl) {
        fl.pile.addEventListener("mouseenter", function () { fl.maybe(); });
      }
    });
  }

  /* ------------------------------------------------------------------
     5) §07 — BLIND SPOT PEEK button (independent of scroll)
        CLR / PEEK MASK collapses the lens to a 54px pinhole to reveal
        what the metric is hiding.
     ------------------------------------------------------------------ */
  function initPeek() {
    document.querySelectorAll("[data-blindspot]").forEach(function (bs) {
      var lens = bs.querySelector(".blindspot__lens");
      var peek = bs.querySelector("[data-blind-peek]");
      if (!peek) return;
      function restore() {
        if (bs.classList.contains("peeking")) return;
        var r = lens.style.getPropertyValue("--lens") || "54";
        lens.style.clipPath = "circle(" + parseFloat(r) + "px at 50% 58%)";
      }
      peek.addEventListener("click", function () {
        var on = bs.classList.toggle("peeking");
        peek.setAttribute("aria-pressed", String(on));
        if (on) lens.style.clipPath = null; // CSS class takes over via .peeking
        else restore();
      });
    });
  }

  /* ------------------------------------------------------------------
     HERO CHROME
     ------------------------------------------------------------------ */
  function initHero() {
    var t = document.querySelector("[data-hero-title]");
    if (!t) return;
    // block reveal — keeps the nested serif-i / accent spans intact
    gsap.from(t, {
      autoAlpha: 0,
      y: 30,
      duration: 1.05,
      ease: "power3.out",
      delay: 0.05,
    });
  }

  function initReveal() {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (inDeck(el)) return;
      gsap.from(el, {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 86%" },
      });
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  function flush() {
    if (typeof window.ScrollTrigger !== "undefined") window.ScrollTrigger.refresh();
  }

  // Late-loading web fonts shift line and section heights, which moves every
  // ScrollTrigger point — pins especially. Refresh until the document height
  // stops changing (cap ~5s) so trigger points track the settled layout, not
  // the preview-font one.
  function syncPositions() {
    if (typeof window.ScrollTrigger === "undefined") return;
    var last = -1;
    var tries = 0;
    (function poll() {
      var h = document.documentElement.offsetHeight;
      window.ScrollTrigger.refresh();
      tries++;
      if (last !== -1 && last === h) return;
      last = h;
      if (tries < 12) setTimeout(poll, 400);
    })();
  }

  document.fonts.ready.then(flush);
  window.addEventListener("load", function () {
    flush();
    syncPositions();
  });

  var reduced = gsap.matchMedia();
  initPeek(); // interactive button — always on, regardless of motion preference
  reduced.add("(prefers-reduced-motion: no-preference)", function () {
    initHero();
    initReveal();
    initKinetic();
    initDeck();
    flush();
  });
})();