'use client';

import { useEffect, useRef } from 'react';

/**
 * Procedural GLSL background (raw WebGL, no three.js → tiny bundle).
 *  - Domain-warped fractal noise tinted with the Clay / Forest / Ochre palette.
 *  - Scroll drives a "camera dolly" (zoom + drift) through the field.
 *  - Mouse adds a slight parallax drift.
 *  - Half-resolution on small screens, paused when the tab is hidden,
 *    static single frame under prefers-reduced-motion.
 *  - Falls back to the CSS grid alone if WebGL is unavailable.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uScroll;   // 0..1, eased
uniform vec2  uMouse;    // -1..1, eased
uniform float uDark;     // 0 paper, 1 studio

vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * snoise(p);
    p = p * 2.02 + vec2(3.1, 1.7);
    a *= 0.5;
  }
  return s;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv - 0.5;
  p.x *= uRes.x / uRes.y;

  // Camera: dolly (zoom) with scroll + mouse drift
  float zoom = 1.0 + uScroll * 0.9;
  p = p / zoom + vec2(uMouse.x * 0.05, -uMouse.y * 0.04) + vec2(0.0, uScroll * 0.4);

  float t = uTime * 0.035;
  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 + vec2(5.2, 1.3) - t));
  float f = fbm(p * 2.1 + 1.8 * q + t * 0.6);

  vec3 clay   = vec3(0.706, 0.271, 0.165);
  vec3 forest = vec3(0.169, 0.337, 0.251);
  vec3 ochre  = vec3(0.710, 0.486, 0.173);

  vec3 col = mix(clay, forest, smoothstep(-0.45, 0.45, q.x));
  col = mix(col, ochre, smoothstep(0.0, 0.6, f));

  // faint contour lines for an engraved / topographic feel
  float contour = (1.0 - smoothstep(0.0, 0.03, abs(fract((f + q.y * 0.5) * 6.0) - 0.5))) * 0.5;

  float a = 0.09 + 0.20 * smoothstep(-0.3, 0.5, f);
  a *= mix(1.0, 1.15, uDark);
  a += contour * 0.08;
  a = clamp(a, 0.0, 0.16);

  // premultiplied output
  gl_FragColor = vec4(col * a, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return; // CSS grid still renders

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uScroll = gl.getUniformLocation(program, 'uScroll');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uDark = gl.getUniformLocation(program, 'uDark');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.matchMedia('(max-width: 767px)').matches;
    const scale = small ? 0.5 : 0.75;

    let w = 0, h = 0;
    const resize = () => {
      w = Math.max(1, Math.floor(window.innerWidth * scale));
      h = Math.max(1, Math.floor(window.innerHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    const target = { scroll: 0, mx: 0, my: 0 };
    const cur = { scroll: 0, mx: 0, my: 0 };
    const onScroll = () => {
      const max = Math.max(1, window.innerHeight * 2.2);
      target.scroll = Math.min(window.scrollY / max, 1);
    };
    const onMove = (e: PointerEvent) => {
      target.mx = (e.clientX / window.innerWidth) * 2 - 1;
      target.my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduced) window.addEventListener('pointermove', onMove, { passive: true });

    const start = performance.now();
    let raf = 0;
    let running = false;

    const draw = (now: number) => {
      cur.scroll += (target.scroll - cur.scroll) * 0.06;
      cur.mx += (target.mx - cur.mx) * 0.04;
      cur.my += (target.my - cur.my) * 0.04;
      gl.uniform2f(uRes, w, h);
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000);
      gl.uniform1f(uScroll, cur.scroll);
      gl.uniform2f(uMouse, cur.mx, cur.my);
      gl.uniform1f(uDark, document.documentElement.dataset.theme === 'studio' ? 1 : 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Reduced motion: one static frame, redrawn on scroll only.
    if (reduced) {
      draw(0);
      const redraw = () => { target.scroll = Math.min(window.scrollY / Math.max(1, window.innerHeight * 2.2), 1); cur.scroll = target.scroll; draw(0); };
      window.addEventListener('scroll', redraw, { passive: true });
      return () => {
        window.removeEventListener('scroll', redraw);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', resize);
        gl.deleteProgram(program);
      };
    }

    const onVisibility = () => (document.hidden ? stopLoop() : startLoop());
    document.addEventListener('visibilitychange', onVisibility);
    startLoop();

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

      {/* Fine grid overlay — kept from the original background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
    </div>
  );
}
