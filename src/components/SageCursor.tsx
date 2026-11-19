"use client";

// Leaf Cursor Trail
// Adapted from Built for Motion's free "Gold Leaf Cursor" component:
// https://www.builtformotion.online/collections/gold-leaf-cursor
// The foil flakes are replaced with drawn green leaves (midrib, side veins, stem), and a
// leaf-shaped mouse pointer follows the cursor on desktop.
// All colours are plain hex codes, no CSS variables.

import { useEffect, useRef, type CSSProperties } from "react";

// [shade (darkest), body (middle), glint (lightest)]
type Tones = readonly [string, string, string];

type Sprite = {
  half: number;
  shade: HTMLCanvasElement;
  body: HTMLCanvasElement;
  glint: HTMLCanvasElement;
};

type Flake = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  pitch: number;
  pitchSize: number;
  pitchSpeed: number;
  rock: number;
  rockSize: number;
  rockSpeed: number;
  spin: number;
  spinSpeed: number;
  age: number;
  life: number;
  fall: number;
  sprite: number;
  sway: number;
};

const LEAF_TONES: Tones = ["#6D986B", "#A4BF90", "#EEF1D9"];

const random = (a: number, b: number) => a + Math.random() * (b - a);

function mix(a: string, b: string, t: number): string {
  const read = (hex: string) => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const x = read(a);
  const y = read(b);
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
}

/** One leaf drawn three times (dull, mid, bright) so it can catch the light as it tumbles. */
function makeSprite(px: number, tones: Tones): Sprite {
  const half = px / 2;
  const seed: number[][] = Array.from({ length: 12 }, () => [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  // Leaf geometry: pointed tip, rounded toward the stem, bent a little off-centre.
  // Roughly a third are slim willow leaves, the rest broader oval or round ones.
  const kind = Math.random();
  const length = half * 0.8;
  const width = length * (kind < 0.3 ? random(0.26, 0.34) : kind < 0.75 ? random(0.4, 0.5) : random(0.55, 0.66));
  const bend = random(-0.14, 0.14) * length;
  const stem = half * 0.16;

  const leaf = new Path2D();
  leaf.moveTo(-length, 0);
  leaf.bezierCurveTo(
    -length * 0.45,
    -width * 1.15 + bend * 0.5,
    length * 0.3,
    -width * 1.0 + bend * 0.9,
    length,
    bend,
  );
  leaf.bezierCurveTo(
    length * 0.3,
    width * 1.0 + bend * 0.9,
    -length * 0.45,
    width * 1.15 + bend * 0.5,
    -length,
    0,
  );
  leaf.closePath();

  // Midrib: a gentle curve from the stem to just short of the tip.
  const tipX = length * 0.94;
  const tipY = bend * 0.94;
  const ctrlX = 0;
  const ctrlY = bend * 0.3;
  const midrib = new Path2D();
  midrib.moveTo(-length, 0);
  midrib.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);

  // Side veins branch off the midrib and sweep toward the tip, on both sides.
  const veins = new Path2D();
  for (let k = 0; k < 5; k++) {
    const t = 0.2 + k * 0.15;
    const u = 1 - t;
    const mx = u * u * -length + 2 * u * t * ctrlX + t * t * tipX;
    const my = u * u * 0 + 2 * u * t * ctrlY + t * t * tipY;
    const reach = width * (0.82 - t * 0.38);
    const forward = length * (0.3 - t * 0.12);
    for (const side of [-1, 1]) {
      veins.moveTo(mx, my);
      veins.quadraticCurveTo(mx + forward * 0.3, my + side * reach * 0.7, mx + forward, my + side * reach);
    }
  }

  const paint = (base: string, deep: string, crease: string, ridge: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    ctx.translate(half, half);
    ctx.save();
    ctx.clip(leaf);

    const across = ctx.createLinearGradient(-half, -half, half, half);
    across.addColorStop(0, base);
    across.addColorStop(0.55, deep);
    across.addColorStop(1, base);
    ctx.fillStyle = across;
    ctx.fillRect(-half, -half, px, px);

    // One soft band of light where the leaf curls.
    const curl = seed[0][0] * Math.PI;
    const band = ctx.createLinearGradient(
      Math.cos(curl) * -half,
      Math.sin(curl) * -half,
      Math.cos(curl) * half,
      Math.sin(curl) * half,
    );
    const at = 0.3 + seed[0][1] * 0.4;
    band.addColorStop(Math.max(0, at - 0.2), "rgba(255,255,255,0)");
    band.addColorStop(at, ridge);
    band.addColorStop(Math.min(1, at + 0.2), "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = band;
    ctx.fillRect(-half, -half, px, px);

    // A few soft blotches so the surface isn't one flat tone.
    for (let i = 1; i < 6; i++) {
      const [a, b, c, d] = seed[i];
      ctx.globalAlpha = 0.08 + d * 0.14;
      ctx.fillStyle = d > 0.5 ? ridge : crease;
      ctx.beginPath();
      ctx.ellipse(
        (a - 0.5) * length * 1.6,
        (b - 0.5) * width * 1.2,
        px * (0.06 + c * 0.14),
        px * (0.03 + c * 0.07),
        a * 6,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    // Veins.
    ctx.lineCap = "round";
    ctx.strokeStyle = crease;
    ctx.globalAlpha = 0.34;
    ctx.lineWidth = Math.max(0.5, px * 0.011);
    ctx.stroke(veins);
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = Math.max(0.8, px * 0.026);
    ctx.stroke(midrib);
    ctx.restore();

    // Stem.
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = crease;
    ctx.lineWidth = Math.max(0.8, px * 0.028);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-length + 1, 0);
    ctx.quadraticCurveTo(-length - stem * 0.5, stem * 0.05, -length - stem, stem * 0.3);
    ctx.stroke();

    // A thin dark edge keeps the leaf readable on both dark and pale backgrounds.
    ctx.globalAlpha = 0.42;
    ctx.strokeStyle = "#43503D";
    ctx.lineWidth = Math.max(0.6, px * 0.012);
    ctx.stroke(leaf);
    ctx.globalAlpha = 1;
    return canvas;
  };

  const [shade, body, glint] = tones;
  return {
    half,
    shade: paint(shade, mix(shade, "#000000", 0.22), mix(shade, "#000000", 0.5), mix(shade, body, 0.6)),
    body: paint(body, mix(body, shade, 0.5), mix(body, shade, 0.9), mix(body, glint, 0.78)),
    glint: paint(glint, mix(glint, body, 0.42), mix(glint, body, 0.85), "#FFFFFF"),
  };
}

// Only accept 6-digit hex so mix() can read it; otherwise fall back to the palette default.
const safeHex = (value: string, fallback: string) => (/^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback);

type LeafCursorProps = {
  maxFlakes?: number;
  spacing?: number;
  size?: number;
  burst?: number;
  tones?: Tones;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  /** Draw a leaf-shaped mouse pointer that follows the cursor (mouse and trackpad only). */
  showCursor?: boolean;
};

export default function LeafCursor({
  maxFlakes = 110,
  spacing = 18,
  size = 1,
  burst = 10,
  tones = LEAF_TONES,
  zIndex = 9999,
  className = "",
  style,
  showCursor = true,
}: LeafCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const toneKey = tones.join();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dpr = 1;
    let sprites: { small: Sprite[]; large: Sprite[] } | null = null;
    const flakes: Flake[] = [];
    let frame = 0;
    let running = false;
    let last = 0;
    let lastX = 0;
    let lastY = 0;
    let hasLast = false;
    let lastMoveTime = 0;
    let travelled = 0;

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
    };
    const observer = new ResizeObserver(fit);
    observer.observe(canvas);
    fit();

    const buildSprites = () => {
      if (sprites) return sprites;
      const palette: Tones = [
        safeHex(tones[0], LEAF_TONES[0]),
        safeHex(tones[1], LEAF_TONES[1]),
        safeHex(tones[2], LEAF_TONES[2]),
      ];
      sprites = {
        small: Array.from({ length: 8 }, () => makeSprite(Math.round(40 * Math.min(dpr, 2)), palette)),
        large: Array.from({ length: 8 }, () => makeSprite(Math.round(96 * Math.min(dpr, 2)), palette)),
      };
      return sprites;
    };

    // Build the sprites up front so the first mouse move doesn't stutter.
    if (!motion.matches) buildSprites();

    const add = (x: number, y: number, pushX: number, pushY: number) => {
      if (flakes.length >= maxFlakes) return;
      // Mostly small leaves, some medium, and an occasional big one.
      const roll = Math.random();
      const scale = (roll < 0.5 ? random(14, 22) : roll < 0.88 ? random(22, 34) : random(34, 50)) * size;
      flakes.push({
        x: x + random(-7, 7),
        y: y + random(-5, 7),
        vx: pushX * random(0.04, 0.1) + random(-14, 14),
        vy: pushY * random(0.03, 0.08) + random(-12, 8),
        scale,
        pitch: random(0, Math.PI * 2),
        // Rocking keeps most of the leaf facing you. Only one in five turns right over.
        pitchSize: Math.random() < 0.2 ? 3.2 : random(0.7, 1.25),
        pitchSpeed: random(0.8, 1.9),
        rock: random(0, Math.PI * 2),
        rockSize: random(0.5, 1.05),
        rockSpeed: random(1.3, 2.7),
        spin: random(0, Math.PI * 2),
        spinSpeed: random(-0.5, 0.5),
        age: 0,
        life: random(2.8, 4.8),
        // Small leaves float down a little slower.
        fall: random(30, 46) + scale * 0.6,
        sprite: Math.floor(Math.random() * 8),
        sway: random(0, Math.PI * 2),
      });
      start();
    };

    const shedAlong = (x: number, y: number, time: number) => {
      if (!hasLast || time - lastMoveTime > 200) {
        hasLast = true;
        lastX = x;
        lastY = y;
        lastMoveTime = time;
        return;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.hypot(dx, dy);
      const dt = Math.max(1, time - lastMoveTime) / 1000;
      const speedX = Math.max(-1400, Math.min(1400, dx / dt));
      const speedY = Math.max(-1400, Math.min(1400, dy / dt));
      travelled += distance;
      let shed = 0;
      // Limited per event, so a fast flick leaves a trail rather than a shower.
      while (travelled >= spacing && shed < 5) {
        travelled -= spacing;
        const along = Math.random();
        add(lastX + dx * along, lastY + dy * along, speedX, speedY);
        shed++;
      }
      if (travelled > spacing * 4) travelled = 0;
      lastX = x;
      lastY = y;
      lastMoveTime = time;
    };

    const onPointerMove = (event: PointerEvent) => {
      shedAlong(event.clientX, event.clientY, event.timeStamp);
    };
    // Once a touch starts scrolling the page, pointer events stop, but touch events carry on.
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) shedAlong(touch.clientX, touch.clientY, event.timeStamp);
    };
    const onPointerDown = (event: PointerEvent) => {
      hasLast = false;
      for (let i = 0; i < burst; i++) add(event.clientX, event.clientY, random(-1000, 1000), random(-1200, 300));
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const set = buildSprites();
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i];
        f.age += dt;
        if (f.age >= f.life) {
          flakes.splice(i, 1);
          continue;
        }

        // Orientation: a matrix built from pitch, rocking roll and spin. Its first two columns give
        // the flat image's axes on screen, and its third is the surface normal.
        f.spin += f.spinSpeed * dt;
        const pitch = Math.sin(f.age * f.pitchSpeed + f.pitch) * f.pitchSize;
        const roll = Math.sin(f.age * f.rockSpeed + f.rock) * f.rockSize;
        const sp = Math.sin(pitch);
        const cp = Math.cos(pitch);
        const sr = Math.sin(roll);
        const cr = Math.cos(roll);
        const ss = Math.sin(f.spin);
        const cs = Math.cos(f.spin);
        const ax = cs * cr + ss * sp * sr;
        const ay = ss * cr - cs * sp * sr;
        const bx = -ss * cp;
        const by = cs * cp;
        const nx = cs * sr - ss * sp * cr;
        const ny = ss * sr + cs * sp * cr;
        const nz = cp * cr;

        // It falls like a leaf: edge-on it drops, flat it floats and slides toward its low side.
        const flatness = Math.abs(nz);
        const target = f.fall * (1.3 - flatness * 0.85);
        f.vy += (target - f.vy) * (1 - Math.exp(-dt * 2.4));
        const glide = nx * nz * 62 + Math.sin(f.age * 0.9 + f.sway) * 9;
        f.vx += (glide - f.vx) * (1 - Math.exp(-dt * 1.9));
        f.x += f.vx * dt;
        f.y += f.vy * dt;

        // Soft, mostly diffuse light: a leaf is lit gently from most angles and only briefly
        // brightens when its surface turns toward the light.
        const lx = -0.32;
        const ly = -0.54;
        const lz = 0.78;
        const hx = lx;
        const hy = ly;
        const hz = lz + 1;
        const hl = Math.hypot(hx, hy, hz);
        const facing = Math.abs((nx * hx + ny * hy + nz * hz) / hl);
        const flash = Math.pow(facing, 18);
        const sheen = Math.pow(facing, 4);
        const brightness = Math.min(1, 0.22 + sheen * 0.5 + flash * 0.4);

        const fadeIn = Math.min(1, f.age / 0.14);
        const remain = 1 - f.age / f.life;
        const fadeOut = remain < 0.34 ? remain / 0.34 : 1;
        const alpha = fadeIn * fadeOut * fadeOut * (3 - 2 * fadeOut);
        const shrink = 0.84 + 0.16 * Math.min(1, remain / 0.3);

        const big = f.scale > 24;
        const sprite = (big ? set.large : set.small)[f.sprite];
        const s = ((f.scale / sprite.half) * shrink * dpr) / 2;
        ctx.setTransform(ax * s, ay * s, bx * s, by * s, f.x * dpr, f.y * dpr);
        const h = sprite.half;

        // Two of three brightnesses, crossfaded by the angle.
        if (brightness < 0.5) {
          ctx.globalAlpha = alpha;
          ctx.drawImage(sprite.shade, -h, -h);
          ctx.globalAlpha = alpha * (brightness / 0.5);
          ctx.drawImage(sprite.body, -h, -h);
        } else {
          ctx.globalAlpha = alpha;
          ctx.drawImage(sprite.body, -h, -h);
          ctx.globalAlpha = alpha * ((brightness - 0.5) / 0.5);
          ctx.drawImage(sprite.glint, -h, -h);
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;

      // The loop only runs while there are leaves in the air.
      if (flakes.length > 0) {
        frame = requestAnimationFrame(step);
      } else {
        running = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    function start() {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(step);
    }

    // Capture phase, so a popup or modal that stops mouse events from bubbling can't block the trail.
    const listen = { passive: true, capture: true } as const;
    const attach = () => {
      window.addEventListener("pointermove", onPointerMove, listen);
      window.addEventListener("pointerdown", onPointerDown, listen);
      window.addEventListener("touchmove", onTouchMove, listen);
    };
    const detach = () => {
      window.removeEventListener("pointermove", onPointerMove, { capture: true });
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
    };
    const onMotionChange = () => {
      if (motion.matches) {
        detach();
        flakes.length = 0;
      } else {
        attach();
      }
    };

    if (!motion.matches) attach();
    motion.addEventListener("change", onMotionChange);

    return () => {
      motion.removeEventListener("change", onMotionChange);
      detach();
      observer.disconnect();
      cancelAnimationFrame(frame);
      running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxFlakes, spacing, size, burst, toneKey]);

  // A leaf-shaped mouse pointer. The normal cursor is hidden while it is active, except over text
  // fields and selects, where the normal cursor is more useful. Skipped on touch screens.
  useEffect(() => {
    if (!showCursor) return;
    const outer = cursorRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    inner.style.transition = reduced ? "none" : "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)";

    const style = document.createElement("style");
    style.textContent =
      'html.leaf-cursor-on, html.leaf-cursor-on *:not(input):not(textarea):not(select):not([contenteditable="true"]) { cursor: none !important; }';
    document.head.appendChild(style);
    document.documentElement.classList.add("leaf-cursor-on");

    const clickable = "a, button, summary, label, [role='button'], [role='link'], [role='tab'], [data-cursor='hover']";
    const textual = "input, textarea, select, [contenteditable='true']";
    let hot = false;
    let pressed = false;

    const apply = () => {
      const scale = pressed ? 0.85 : hot ? 1.3 : 1;
      inner.style.transform = `scale(${scale}) rotate(${hot && !pressed ? -12 : 0}deg)`;
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      // The leaf's tip sits 4px in from the corner of its box, so offset to put the tip on the mouse.
      outer.style.transform = `translate3d(${event.clientX - 4}px, ${event.clientY - 4}px, 0)`;
      const target = event.target instanceof Element ? event.target : null;
      outer.style.opacity = target?.closest(textual) ? "0" : "1";
      const next = !!target?.closest(clickable);
      if (next !== hot) {
        hot = next;
        apply();
      }
    };
    const onDown = () => {
      pressed = true;
      apply();
    };
    const onUp = () => {
      pressed = false;
      apply();
    };
    const onLeave = () => {
      outer.style.opacity = "0";
    };

    const listen = { passive: true, capture: true } as const;
    window.addEventListener("pointermove", onMove, listen);
    window.addEventListener("pointerdown", onDown, listen);
    window.addEventListener("pointerup", onUp, listen);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove, { capture: true });
      window.removeEventListener("pointerdown", onDown, { capture: true });
      window.removeEventListener("pointerup", onUp, { capture: true });
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("leaf-cursor-on");
      style.remove();
    };
  }, [showCursor]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 h-full w-full ${className}`}
        style={{ zIndex, ...style }}
      />
      {showCursor && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 opacity-0"
          style={{ zIndex: zIndex + 1, willChange: "transform" }}
        >
          <div ref={innerRef} style={{ transformOrigin: "4px 4px" }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ display: "block" }}>
              <g transform="translate(4 4) rotate(45)" strokeLinecap="round" strokeLinejoin="round">
                {/* cream halo so the leaf stays visible on dark and light backgrounds */}
                <path d="M0 0C9 -9 16.5 -10.35 30 0C16.5 10.35 9 9 0 0Z" stroke="#EEF1D9" strokeWidth="3.4" />
                <path d="M30 0Q34 1.8 38 1" stroke="#EEF1D9" strokeWidth="3.4" />
                <path d="M0 0C9 -9 16.5 -10.35 30 0C16.5 10.35 9 9 0 0Z" fill="#6D986B" />
                <path d="M0 0C9 -9 16.5 -10.35 30 0Z" fill="#A4BF90" opacity="0.75" />
                <path
                  d="M30 0L3 0M22 0L15 -5.5M22 0L15 5.5M15 0L9 -4.2M15 0L9 4.2"
                  stroke="#43503D"
                  strokeOpacity="0.55"
                  strokeWidth="1"
                />
                <path
                  d="M0 0C9 -9 16.5 -10.35 30 0C16.5 10.35 9 9 0 0Z"
                  stroke="#43503D"
                  strokeWidth="1.3"
                />
                <path d="M30 0Q34 1.8 38 1" stroke="#43503D" strokeWidth="1.6" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}