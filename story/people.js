// The two people of the story reels, built from simple shapes in a soft, Pixar-like style.
//   Bunty    - a big, loud, lovable D2C founder (saffron kurta, moustache). Makes the mistake.
//   Prashant - the calm AI-for-ecommerce guy (navy hoodie, glasses). Shows the fix.
// makePerson() returns the model plus pose(): everything is set from the numbers given, so any frame draws on its own.
import * as THREE from 'three';

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerp = (a, b, x) => a + (b - a) * x;
const UP = v3(0, 1, 0);

export const LOOKS = {
  bunty: { skin: '#9C6040', hair: '#17110F', top: 'kurta', cloth: '#C8325F', cloth2: '#8E1E43', trim: '#F4C95D', build: 1.2, R: 0.45, hair_style: 'side', moustache: true, glasses: false, brow: 0.026 },
  prashant: { skin: '#D29A70', hair: '#1A1311', top: 'hoodie', cloth: '#2A3A5C', cloth2: '#1D2842', trim: '#EDE7DC', build: 0.96, R: 0.41, hair_style: 'quiff', moustache: false, glasses: true, brow: 0.017 },
};

export function makePerson(name, canvasTex) {
  const L = LOOKS[name], R = L.R, k = R / 0.4, B = L.build;
  const mesh = (geo, m, parent, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
  const skinM = new THREE.MeshPhysicalMaterial({ color: L.skin, roughness: 0.55, sheen: 0.4, sheenColor: new THREE.Color('#FFB89A'), sheenRoughness: 0.6, emissive: '#5A2010', emissiveIntensity: 0.1 });
  const hairM = new THREE.MeshPhysicalMaterial({ color: L.hair, roughness: 0.36, clearcoat: 0.6, clearcoatRoughness: 0.3, sheen: 0.6, sheenColor: new THREE.Color('#6B4A3A') });
  const clothM = new THREE.MeshPhysicalMaterial({ color: L.cloth, roughness: 0.85, sheen: 1, sheenColor: new THREE.Color(L.top === 'kurta' ? '#FF9DB8' : '#8FA6D8'), sheenRoughness: 0.8 });
  const cloth2M = new THREE.MeshPhysicalMaterial({ color: L.cloth2, roughness: 0.9, sheen: 0.8, sheenColor: new THREE.Color('#FFB27A') });
  const trimM = new THREE.MeshStandardMaterial({ color: L.trim, roughness: 0.5, metalness: L.top === 'kurta' ? 0.35 : 0 });

  const root = new THREE.Group(); root.name = name;
  const torsoG = new THREE.Group(); torsoG.position.set(0, 0.95, 0); root.add(torsoG);
  // body: a lathe profile with round shoulders; Bunty is wider and has a belly
  const prof = [[0.0, -0.25], [0.45, -0.25], [0.48, 0.1], [0.48, 0.42], [0.45, 0.62], [0.4, 0.76], [0.29, 0.86], [0.16, 0.91], [0.0, 0.92]].map(([r, y]) => new THREE.Vector2(r, y));
  const torso = mesh(new THREE.LatheGeometry(new THREE.SplineCurve(prof).getPoints(40), 48), clothM, torsoG);
  torso.scale.set(1.05 * B, 1, 0.8 * B);
  if (B > 1.1) { const belly = mesh(new THREE.SphereGeometry(0.36, 40, 30), clothM, torsoG, 0, 0.28, 0.16); belly.scale.set(1.25, 1.0, 1.0); }
  if (L.top === 'kurta') {
    // mandarin collar, a gold-trimmed placket with three buttons
    mesh(new THREE.CylinderGeometry(0.155, 0.17, 0.08, 32, 1, true), cloth2M, torsoG, 0, 0.92, 0.0);
    const plk = mesh(new THREE.BoxGeometry(0.075, 0.42, 0.02), cloth2M, torsoG, 0, 0.68, 0.33 * B); plk.rotation.x = -0.32;
    [0.82, 0.7, 0.58].forEach((y, i) => mesh(new THREE.SphereGeometry(0.019, 16, 12), trimM, torsoG, 0, y, 0.355 * B + (0.82 - y) * 0.33 + (i === 0 ? -0.04 : 0)));
    // embroidered band across the chest
    const band = mesh(new THREE.TorusGeometry(0.47, 0.012, 8, 64), trimM, torsoG, 0, 0.5, 0); band.rotation.x = Math.PI / 2; band.scale.set(1.05 * B, 0.8 * B * 1.04, 1);
  } else {
    const hood = mesh(new THREE.TorusGeometry(0.2, 0.095, 16, 32), cloth2M, torsoG, 0, 0.88, -0.07); hood.rotation.x = Math.PI / 2 - 0.35; hood.scale.set(1.1, 1, 1);
    mesh(new THREE.CylinderGeometry(0.135, 0.15, 0.06, 24), new THREE.MeshStandardMaterial({ color: '#E9E4DA', roughness: 0.9 }), torsoG, 0, 0.9, 0.02);
    [-0.075, 0.075].forEach((x) => { const g = new THREE.Group(); g.position.set(x, 0.86, 0.29); g.rotation.x = 0.32; torsoG.add(g); mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.24, 8), trimM, g, 0, -0.12, 0); });
    const patch = new THREE.Mesh(new THREE.CircleGeometry(0.07, 32), new THREE.MeshStandardMaterial({ roughness: 0.8, map: canvasTex(128, 128, (x) => {
      x.fillStyle = '#FFD24A'; x.beginPath(); x.arc(64, 64, 62, 0, 7); x.fill(); x.fillStyle = '#1D2842'; x.font = '800 54px InterXB'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AI', 64, 68);
    }) }));
    patch.position.set(0.21, 0.6, 0.355); patch.rotation.y = 0.4; torsoG.add(patch);
  }
  mesh(new THREE.CylinderGeometry(0.1 * k, 0.115 * k, 0.2, 24), skinM, torsoG, 0, 0.97, 0);

  // ----- head -----
  const headG = new THREE.Group(); headG.position.set(0, 0.92 + R * 0.92, 0); torsoG.add(headG);
  const skull = mesh(new THREE.SphereGeometry(R, 64, 48), skinM, headG); skull.scale.set(1.0, 1.03, 0.95);
  [-1, 1].forEach((s) => { const c = mesh(new THREE.SphereGeometry(0.2 * k, 32, 24), skinM, headG, s * 0.15 * k, -0.14 * k, 0.1 * k); c.scale.set(B > 1.1 ? 1.08 : 0.95, 0.8, 0.85); });
  [-1, 1].forEach((s) => { const e = mesh(new THREE.SphereGeometry(0.075 * k, 24, 16), skinM, headG, s * 0.395 * k, -0.02 * k, 0); e.scale.set(0.5, 1, 0.8); });
  // hair
  if (L.hair_style === 'side') {
    // slicked side parting with a shiny forehead, sideburns
    const cap = mesh(new THREE.SphereGeometry(R * 1.05, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.33), hairM, headG, 0, 0.03 * k, -0.05 * k); cap.rotation.x = -0.32;
    mesh(new THREE.SphereGeometry(R * 1.04, 64, 40, Math.PI - 0.7, Math.PI + 1.4, 0, Math.PI * 0.68), hairM, headG, 0, 0.0, -0.03 * k);
    const swoop = mesh(new THREE.SphereGeometry(0.17 * k, 32, 20), hairM, headG, -0.13 * k, 0.33 * k, 0.12 * k); swoop.scale.set(1.6, 0.5, 1.1); swoop.rotation.z = 0.28;
    [-1, 1].forEach((s) => { const sb = mesh(new THREE.CapsuleGeometry(0.035 * k, 0.12 * k, 8, 16), hairM, headG, s * 0.385 * k, 0.03 * k, 0.07 * k); sb.rotation.z = s * 0.1; });
  } else {
    mesh(new THREE.SphereGeometry(R * 1.05, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.36), hairM, headG, 0, 0.02 * k, -0.01 * k);
    mesh(new THREE.SphereGeometry(R * 1.035, 64, 40, Math.PI - 0.6, Math.PI + 1.2, 0, Math.PI * 0.66), hairM, headG, 0, 0.0, -0.02 * k);
    const q = mesh(new THREE.SphereGeometry(0.17 * k, 32, 24), hairM, headG, 0.04 * k, 0.37 * k, 0.16 * k); q.scale.set(1.55, 0.62, 1.0); q.rotation.x = -0.45; q.rotation.z = -0.12;
    const q2 = mesh(new THREE.SphereGeometry(0.12 * k, 32, 24), hairM, headG, -0.13 * k, 0.36 * k, 0.12 * k); q2.scale.set(1.3, 0.6, 1.0); q2.rotation.z = 0.3;
  }
  // face
  const face = new THREE.Group(); face.position.set(0, -0.02 * k, 0.36 * k); headG.add(face);
  const eyeM = new THREE.MeshPhysicalMaterial({ color: '#120C0A', roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
  const shine = new THREE.MeshBasicMaterial({ color: '#FFFFFF' });
  const eyes = [-1, 1].map((s) => {
    const g = new THREE.Group(); g.position.set(s * 0.145 * k, 0.03 * k, 0.01 * k); face.add(g);
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.066 * k, 32, 24), eyeM); e.scale.set(0.82, 1.1, 0.42); g.add(e);
    const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.019 * k, 16, 12), shine); h1.position.set(0.022 * k, 0.032 * k, 0.026 * k); g.add(h1);
    const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.008 * k, 12, 8), shine); h2.position.set(-0.02 * k, -0.03 * k, 0.026 * k); g.add(h2);
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.072 * k, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), skinM); lid.scale.set(0.9, 1.2, 0.6); g.add(lid);
    return { g, lid };
  });
  const browM = new THREE.MeshStandardMaterial({ color: L.hair, roughness: 0.7 });
  const brows = [-1, 1].map((s) => { const b = new THREE.Mesh(new THREE.CapsuleGeometry(L.brow * k, 0.085 * k, 6, 12), browM); b.rotation.z = Math.PI / 2; const g = new THREE.Group(); g.position.set(s * 0.15 * k, 0.15 * k, 0.025 * k); g.add(b); face.add(g); return g; });
  const nose = mesh(new THREE.SphereGeometry((B > 1.1 ? 0.045 : 0.033) * k, 24, 16), skinM, face, 0, -0.06 * k, 0.05 * k); nose.scale.set(1.1, 0.85, 0.9);
  const mouthM = new THREE.MeshStandardMaterial({ color: '#4E1C1E', roughness: 0.5 });
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.048 * k, 24, 16), mouthM); mouth.position.set(0, -0.17 * k, 0.0); face.add(mouth);
  const teeth = new THREE.Mesh(new THREE.SphereGeometry(0.04 * k, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.32), new THREE.MeshStandardMaterial({ color: '#F6F1E8', roughness: 0.4 }));
  teeth.position.set(0, -0.15 * k, 0.012 * k); face.add(teeth);
  // a closed smile, shown when the mouth is shut and the mood is good
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.055 * k, 0.011 * k, 8, 24, Math.PI), mouthM); smile.rotation.z = Math.PI; smile.position.set(0, -0.135 * k, 0.012 * k); face.add(smile);
  let tache = null;
  if (L.moustache) {
    tache = new THREE.Group(); tache.position.set(0, -0.105 * k, 0.045 * k); face.add(tache);
    [-1, 1].forEach((s) => { const m = mesh(new THREE.SphereGeometry(0.06 * k, 32, 20), hairM, tache, s * 0.055 * k, 0, 0); m.scale.set(1.25, 0.48, 0.55); m.rotation.z = s * -0.22;
      const tip = mesh(new THREE.SphereGeometry(0.026 * k, 16, 12), hairM, tache, s * 0.125 * k, 0.018 * k, -0.01 * k); tip.scale.set(1.3, 0.7, 0.7); });
  }
  if (L.glasses) {
    const gM = new THREE.MeshStandardMaterial({ color: '#16161A', roughness: 0.35, metalness: 0.4 });
    [-1, 1].forEach((s) => { const rim = mesh(new THREE.TorusGeometry(0.085 * k, 0.009 * k, 10, 40), gM, face, s * 0.145 * k, 0.03 * k, 0.05 * k); rim.scale.set(1.12, 0.86, 1); });
    const bridge = mesh(new THREE.CylinderGeometry(0.007 * k, 0.007 * k, 0.07 * k, 8), gM, face, 0, 0.045 * k, 0.055 * k); bridge.rotation.z = Math.PI / 2;
    [-1, 1].forEach((s) => { const tm = mesh(new THREE.CylinderGeometry(0.007 * k, 0.007 * k, 0.3 * k, 8), gM, face, s * 0.245 * k, 0.04 * k, -0.1 * k); tm.rotation.x = Math.PI / 2; });
  }
  const blushTex = canvasTex(64, 64, (x) => { const g = x.createRadialGradient(32, 32, 2, 32, 32, 31); g.addColorStop(0, 'rgba(232,110,90,0.7)'); g.addColorStop(1, 'rgba(232,110,90,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); });
  [-1, 1].forEach((s) => { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.13 * k, 0.09 * k), new THREE.MeshBasicMaterial({ map: blushTex, transparent: true, depthWrite: false })); c.position.set(s * 0.22 * k, -0.085 * k, -0.005); c.rotation.y = s * 0.55; face.add(c); });
  const sweat = mesh(new THREE.SphereGeometry(0.03 * k, 16, 12), new THREE.MeshPhysicalMaterial({ color: '#BFE4FF', roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.85 }), headG, 0.3 * k, 0.22 * k, 0.24 * k);
  sweat.scale.set(0.8, 1.3, 0.6);

  // ----- arms: shoulder, elbow, hand (two-bone reach toward a target) -----
  const L1 = 0.41, L2 = 0.4;
  const sleeveR = 0.105 * Math.min(B, 1.1);
  const arms = [-1, 1].map((s) => ({
    s,
    up: mesh(new THREE.CylinderGeometry(sleeveR, sleeveR * 0.92, 1, 24, 1, true), clothM, root),
    lo: mesh(new THREE.CylinderGeometry(sleeveR * 0.92, sleeveR * 0.82, 1, 24, 1, true), clothM, root),
    sh: mesh(new THREE.SphereGeometry(sleeveR * 1.3, 32, 24), clothM, root),
    el: mesh(new THREE.SphereGeometry(sleeveR * 0.93, 24, 16), clothM, root),
    cuff: mesh(new THREE.TorusGeometry(sleeveR * 0.72, 0.022, 12, 24), L.top === 'kurta' ? trimM : cloth2M, root),
    hand: mesh(new THREE.SphereGeometry(0.078, 32, 24), skinM, root),
    thumb: mesh(new THREE.SphereGeometry(0.032, 16, 12), skinM, root),
  }));
  const grip = new THREE.Group(); root.add(grip); // things held in the right hand follow this

  function limb(m, a, b) { const d = b.clone().sub(a), len = d.length(); m.position.copy(a).addScaledVector(d, 0.5); m.quaternion.setFromUnitVectors(UP, d.normalize()); m.scale.set(1, len, 1); }
  function reach(sh, target, pole) {
    const d0 = target.clone().sub(sh); let d = d0.length(); const dir = d0.normalize();
    d = Math.min(d, L1 + L2 - 0.002); const hand = sh.clone().addScaledVector(dir, d);
    const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
    const perp = pole.clone().addScaledVector(dir, -pole.dot(dir)).normalize();
    return { hand, elbow: sh.clone().addScaledVector(dir, a).addScaledVector(perp, h) };
  }

  /** Hand targets for an action, in this person's own space (they face +z). talk 0..1 moves the hands a little. */
  function handsFor(act, t, talk, toward = 1) {
    const sway = (i) => Math.sin(t * 5 + i * 1.9) * 0.04 * talk;
    const rest = [v3(-0.34 * B, 1.12, 0.52), v3(0.34 * B, 1.12, 0.52)];
    switch (act) {
      case 'point': return toward > 0 ? [rest[0], v3(0.62, 1.62 + sway(1), 0.42)] : [v3(-0.62, 1.62 + sway(1), 0.42), rest[1]];
      case 'phone': return [rest[0], v3(0.16, 1.48, 0.5)];
      case 'facepalm': return [rest[0], v3(0.04, 0.92 + 0.92 + R * 0.95, 0.36 + R * 0.7)];
      case 'celebrate': return [v3(-0.5, 2.2 + Math.sin(t * 9) * 0.05, 0.12), v3(0.5, 2.2 + Math.sin(t * 9 + 2) * 0.05, 0.12)];
      case 'shrug': return [v3(-0.58 * B, 1.36, 0.36), v3(0.58 * B, 1.36, 0.36)];
      case 'think': return [v3(-0.12, 1.5, 0.44), v3(0.08, 0.92 + 0.92 + R * 0.35, 0.3 + R * 0.75)];
      case 'sign': return [v3(-0.55, 1.4, 0.55), v3(0.55, 1.4, 0.55)];
      case 'explain': return [v3(-0.4 * B + sway(0), 1.38 + sway(2), 0.5), v3(0.4 * B + sway(1), 1.42 + sway(3), 0.5)];
      case 'arms': return [v3(-0.16, 1.46, 0.46), v3(0.16, 1.4, 0.46)]; // arms folded-ish
      default: return [v3(rest[0].x, rest[0].y + sway(0) * 0.5, rest[0].z), v3(rest[1].x + sway(1), rest[1].y + sway(2), rest[1].z)];
    }
  }

  /**
   * st: { hands:[L,R] targets, mood, talk 0..1, blink 0..1, yaw, pitch, lean, shock 0..1 }
   */
  function pose(st, t) {
    const mood = st.mood || 'normal', talk = st.talk || 0, shock = st.shock || 0;
    const happy = /happy|proud|smug|excited/.test(mood), sad = /sad|worried|tired/.test(mood), angry = mood === 'angry';
    const breathe = Math.sin(t * 2.1 + R * 7) * 0.007;
    torsoG.rotation.x = 0.03 + (st.lean || 0) - shock * 0.06 + (sad ? 0.06 : 0);
    torsoG.rotation.y = (st.yaw || 0) * 0.25;
    torsoG.scale.set(1, 1 + breathe, 1);
    headG.rotation.y = (st.yaw || 0) * 0.75 + Math.sin(t * 0.8 + R * 9) * 0.03;
    headG.rotation.x = (st.pitch || 0) + talk * 0.05 + Math.sin(t * 1.7 + R) * 0.015 - shock * 0.1 + (sad ? 0.1 : 0);
    headG.rotation.z = Math.sin(t * 0.7 + R * 3) * 0.03 + (mood === 'smug' ? 0.08 : 0) + (sad ? -0.06 : 0) + talk * Math.sin(t * 4.3) * 0.03;
    // mouth: opens with the voice, wider when shouting or shocked
    const open = Math.max(talk, shock * 0.8);
    mouth.scale.set(1.2 - open * 0.25 + (happy ? 0.25 : 0), 0.16 + open * 1.1, 0.45);
    mouth.visible = open > 0.05 || !happy;
    teeth.visible = open > 0.25;
    smile.visible = happy && open <= 0.05; smile.scale.set(mood === 'smug' ? 0.8 : 1.1, mood === 'smug' ? 0.6 : 1, 1); smile.position.x = mood === 'smug' ? 0.02 * k : 0;
    if (tache) { tache.position.y = -0.105 * k - open * 0.008 * k; tache.rotation.z = (mood === 'smug' ? 0.08 : 0) + Math.sin(t * 6) * 0.02 * talk; }
    const lidDown = sad ? 0.35 : mood === 'smug' ? 0.45 : angry ? 0.3 : 0;
    eyes.forEach((e) => {
      const big = 1 + shock * 0.25 + (mood === 'excited' ? 0.08 : 0); e.g.scale.set(big, big, 1);
      const c = Math.max(lidDown * (1 - shock), st.blink || 0, happy && mood !== 'smug' && open < 0.1 ? 0.25 : 0);
      e.lid.position.y = lerp(0.12, 0.0, c) * k; e.lid.scale.y = lerp(0.3, 1.25, c); e.lid.visible = c > 0.02;
    });
    brows.forEach((br, i) => {
      const s = i ? 1 : -1;
      br.position.y = (0.15 + shock * 0.05 + (happy ? 0.012 : 0) - (angry ? 0.02 : 0) + talk * 0.008) * k;
      br.rotation.z = s * (sad ? -0.3 : angry ? 0.3 : mood === 'smug' ? (i ? 0.25 : -0.05) : 0.06) + s * shock * -0.15;
    });
    sweat.visible = /worried|panic/.test(mood) || shock > 0.5;
    // arms
    root.updateMatrixWorld(true);
    arms.forEach((a, i) => {
      const s = a.s;
      const sh = v3(s * 0.36 * B, 0.78, 0.0); torsoG.localToWorld(sh); root.worldToLocal(sh);
      const { hand, elbow } = reach(sh, st.hands[i].clone(), v3(s * 0.8, -1, -0.5).normalize());
      limb(a.up, sh, elbow); limb(a.lo, elbow, hand);
      a.sh.position.copy(sh); a.el.position.copy(elbow); a.hand.position.copy(hand);
      const dir = hand.clone().sub(elbow).normalize();
      a.cuff.position.copy(hand).addScaledVector(dir, -0.065); a.cuff.quaternion.setFromUnitVectors(v3(0, 0, 1), dir);
      a.hand.quaternion.setFromUnitVectors(UP, dir); a.hand.scale.set(1, 1.2, 0.85);
      a.thumb.position.copy(hand).add(v3(-s * 0.06, 0.02, 0.03));
      if (i === 1) { grip.position.copy(hand); grip.quaternion.copy(a.hand.quaternion); }
    });
  }

  const headWorld = () => { const p = v3(0, 0, 0); headG.localToWorld(p); return p; };
  return { root, torsoG, headG, pose, handsFor, headWorld, grip, R, B };
}
