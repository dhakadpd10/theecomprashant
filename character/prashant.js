// Prashant as a 2D "modern vector" character (the page's host): realistic proportions, soft gradient shading.
// Built from named layers so reels can animate it (engine/motion.js "host"):
//   eyes-<normal|blink|happy|shock|smug>, brows-<normal|happy|worried|shock|smug|think>,
//   mouth-<closed|talk|open|smile|o>, arms-<pose>, prop-cooker (+ steam), prop-phone.
//   layered()  -> full SVG with every layer (all hidden except the defaults); the engine toggles them
//   svg(opts)  -> one still: { mood, mouth, pose, prop: 'none'|'cooker'|'phone', steam }
// viewBox 0 0 520 760; the head sits around y 80-420, shoulders at y 575.
const C = {
  skinA: '#C98C62', skinB: '#A86C46', skinShade: '#8C5634', ear: '#A86C46',
  hair: '#1B1412', hairLight: '#3B2B25', beard: '#3A2620',
  sweatA: '#F1EBE1', sweatB: '#D8CEBE', rib: '#E2D9CB', sleeve: '#D8CEBE', cuff: '#CBBFAD',
  ink: '#1E1614', lip: '#6E2A26', tongue: '#C9666B', teeth: '#FFFBF4',
  steel: '#CDD2D9', steelLight: '#E6EAEF', steelDark: '#9EA5AF', handle: '#2B2B2E',
};

const MOODS = { // eyes + brows for each mood
  normal: ['normal', 'normal'], happy: ['happy', 'happy'], smug: ['smug', 'smug'], shock: ['shock', 'shock'],
  worried: ['normal', 'worried'], think: ['normal', 'think'],
};

// arm poses: [elbow, hand] offsets from each shoulder; L shoulder (128,575), R shoulder (392,575)
const POSES = {
  idle: { L: [[-26, 100], [-16, 192]], R: [[26, 100], [16, 192]] },
  point: { L: [[-26, 100], [-16, 192]], R: [[86, -24], [170, -70]] },
  explain: { L: [[-58, 96], [18, 52]], R: [[58, 96], [-18, 52]] },
  thumbs: { L: [[-26, 100], [-16, 192]], R: [[52, 104], [-6, 36]] },
  shrug: { L: [[-80, 40], [-140, -20]], R: [[80, 40], [140, -20]] },
  think: { L: [[-26, 100], [-16, 192]], R: [[-14, 70], [-118, -150]] },
  phone: { L: [[-26, 100], [-16, 192]], R: [[48, 108], [-34, 52]] },
  wave: { L: [[-26, 100], [-16, 192]], R: [[92, -50], [118, -160]] },
  cooker: { L: [[-26, 100], [-16, 192]], R: [[40, 96], [70, 176]] },
};

const SH = { L: [128, 575], R: [392, 575] };

function armPath(side, [e, h], extra = '') {
  const [sx, sy] = SH[side], ex = sx + e[0], ey = sy + e[1], hx = sx + h[0], hy = sy + h[1];
  const dx = hx - ex, dy = hy - ey, d = Math.hypot(dx, dy) || 1, cx = hx - (dx / d) * 22, cy = hy - (dy / d) * 22;
  return `<path d="M${sx} ${sy} L${ex} ${ey} L${hx} ${hy}" stroke="${C.sleeve}" stroke-width="58" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M${sx} ${sy} L${ex} ${ey}" stroke="#E7DFD2" stroke-width="20" fill="none" stroke-linecap="round" opacity=".55"/>
<line x1="${cx}" y1="${cy}" x2="${cx + (dx / d) * 4}" y2="${cy + (dy / d) * 4}" stroke="${C.cuff}" stroke-width="58" stroke-linecap="round"/>
<circle cx="${hx}" cy="${hy}" r="25" fill="url(#pSkinH)"/>${extra.replace(/HX/g, hx).replace(/HY/g, hy)}`;
}

function arms(pose) {
  const P = POSES[pose] || POSES.idle;
  const thumb = pose === 'thumbs' ? '<rect x="HX" y="HY" width="16" height="40" rx="8" transform="translate(-8 -58)" fill="url(#pSkinH)"/>' : '';
  const finger = pose === 'point' ? '<rect x="HX" y="HY" width="44" height="14" rx="7" transform="translate(14 -14) rotate(-28 HX HY)" fill="url(#pSkinH)"/>' : '';
  const phone = pose === 'phone' ? '<g transform="translate(HX HY) rotate(-10)"><rect x="-34" y="-104" width="68" height="126" rx="14" fill="#1B1E24"/><rect x="-28" y="-96" width="56" height="108" rx="9" fill="#F7F1E6"/><rect x="-20" y="-84" width="40" height="9" rx="4" fill="#E8672E"/><rect x="-20" y="-68" width="34" height="7" rx="3" fill="#CBBFAF"/><rect x="-20" y="-56" width="38" height="7" rx="3" fill="#CBBFAF"/></g><circle cx="HX" cy="HY" r="25" fill="url(#pSkinH)"/>' : '';
  return armPath('L', P.L) + armPath('R', P.R, thumb + finger + phone);
}

const EYES = {
  normal: (x) => `<ellipse cx="${x}" cy="262" rx="13" ry="15" fill="${C.ink}"/><circle cx="${x + 4}" cy="257" r="4" fill="#fff"/>`,
  blink: (x) => `<path d="M${x - 15} 264 q15 6 30 0" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  happy: (x) => `<path d="M${x - 15} 266 q15 -16 30 0" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  shock: (x) => `<circle cx="${x}" cy="262" r="21" fill="#FFFBF4"/><circle cx="${x}" cy="262" r="12" fill="${C.ink}"/><circle cx="${x + 4}" cy="257" r="4" fill="#fff"/>`,
  smug: (x) => `<ellipse cx="${x}" cy="265" rx="13" ry="10" fill="${C.ink}"/><path d="M${x - 18} 257 h36" stroke="${C.skinB}" stroke-width="10" stroke-linecap="round"/>`,
};
const BROWS = {
  normal: 'M204 230 Q224 222 246 228 M278 228 Q300 222 320 230',
  happy: 'M204 226 Q224 214 246 222 M278 222 Q300 214 320 226',
  worried: 'M206 220 Q226 226 246 234 M278 234 Q298 226 318 220',
  shock: 'M204 214 Q224 204 246 212 M278 212 Q300 204 320 214',
  smug: 'M204 232 Q224 226 246 232 M278 222 Q300 210 320 220',
  think: 'M204 222 Q224 214 246 224 M278 232 Q300 226 320 232',
};
const MOUTHS = {
  closed: `<path d="M242 356 Q262 366 282 356" stroke="${C.lip}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  smile: `<path d="M236 352 Q262 376 288 352" stroke="${C.lip}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  talk: `<path d="M242 350 Q262 346 282 350 Q280 374 262 376 Q244 374 242 350Z" fill="${C.lip}"/><ellipse cx="262" cy="368" rx="11" ry="5" fill="${C.tongue}"/>`,
  open: `<path d="M236 348 Q262 342 288 348 Q284 384 262 386 Q240 384 236 348Z" fill="${C.lip}"/><rect x="242" y="348" width="40" height="8" rx="3" fill="${C.teeth}"/><ellipse cx="262" cy="376" rx="13" ry="6" fill="${C.tongue}"/>`,
  o: `<ellipse cx="262" cy="362" rx="13" ry="17" fill="${C.lip}"/>`,
};

function cooker(steam) {
  // signature prop: the pressure cooker whose whistle ("seeti") means the AI hack is ready; sits by the right hand
  return `<g id="prop-cooker"><g transform="translate(436 690)">
<g id="steam" opacity="${steam ? 1 : 0}" fill="#FFFFFF"><circle cx="2" cy="-128" r="13"/><circle cx="18" cy="-154" r="17"/><circle cx="2" cy="-186" r="21"/><circle cx="26" cy="-214" r="15"/></g>
<rect x="-9" y="-104" width="18" height="34" rx="6" fill="${C.handle}"/><rect x="-20" y="-76" width="40" height="12" rx="6" fill="#3A3A3E"/>
<path d="M-92 -58 h184 q12 0 12 12 v12 h-208 v-12 q0 -12 12 -12z" fill="${C.steelDark}"/><rect x="92" y="-52" width="92" height="18" rx="9" fill="${C.handle}"/>
<path d="M-100 -34 h200 v86 q0 32 -32 32 h-136 q-32 0 -32 -32z" fill="url(#pSteel)"/><rect x="-100" y="-34" width="200" height="10" fill="${C.steelDark}"/>
</g></g>`;
}

const DEFS = `<defs>
<linearGradient id="pSweat" x1="0" x2="1"><stop offset="0" stop-color="${C.sweatA}"/><stop offset="1" stop-color="${C.sweatB}"/></linearGradient>
<linearGradient id="pSkin" x1="0" x2="1"><stop offset="0" stop-color="${C.skinA}"/><stop offset="1" stop-color="${C.skinB}"/></linearGradient>
<radialGradient id="pSkinH" cx="40%" cy="35%"><stop offset="0" stop-color="${C.skinA}"/><stop offset="1" stop-color="${C.skinB}"/></radialGradient>
<linearGradient id="pSteel" x1="0" x2="1"><stop offset="0" stop-color="${C.steelLight}"/><stop offset=".45" stop-color="${C.steel}"/><stop offset="1" stop-color="${C.steelDark}"/></linearGradient>
</defs>`;

const BODY = `<path d="M90 760 L100 590 Q110 500 200 478 L260 466 L320 478 Q410 500 420 590 L430 760 Z" fill="url(#pSweat)"/>
<path d="M212 476 Q260 512 308 476" stroke="${C.rib}" stroke-width="18" fill="none" stroke-linecap="round"/>
<path d="M232 400 L288 400 L294 478 Q260 500 226 478Z" fill="#9B6240"/>`;
const HEAD = `<path d="M180 220 Q178 110 262 104 Q346 110 344 220 L342 300 Q336 380 290 410 Q262 426 234 410 Q188 380 182 300 Z" fill="url(#pSkin)"/>
<ellipse cx="180" cy="270" rx="16" ry="28" fill="${C.ear}"/><ellipse cx="344" cy="270" rx="16" ry="28" fill="${C.ear}"/>
<path d="M170 230 Q160 90 262 82 Q368 88 356 232 Q350 172 322 156 Q312 196 290 166 Q276 200 252 168 Q236 198 214 170 Q196 196 184 182 Q172 200 170 230Z" fill="${C.hair}"/>
<path d="M206 128 Q250 104 300 108" stroke="${C.hairLight}" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M262 270 Q256 300 252 312 Q262 318 274 312" stroke="${C.skinShade}" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M196 320 Q206 392 262 402 Q318 392 328 320 Q316 370 262 378 Q208 370 196 320Z" fill="${C.beard}" opacity=".35"/>
<path d="M236 336 Q262 328 288 336 Q282 344 262 342 Q242 344 236 336Z" fill="${C.hair}"/>`;

const layer = (id, on, inner) => `<g id="${id}"${on ? '' : ' style="opacity:0"'}>${inner}</g>`;

/** Every layer in one SVG; only the given state is visible. ids are prefixed so several hosts could share a page. */
function layered({ mood = 'normal', mouth = 'closed', pose = 'idle', prop = 'cooker', steam = false, idp = 'h' } = {}) {
  const [eyeOn, browOn] = MOODS[mood] || MOODS.normal;
  const eyes = Object.keys(EYES).map((k) => layer(`${idp}-eyes-${k}`, k === eyeOn, EYES[k](226) + EYES[k](298))).join('');
  const brows = Object.keys(BROWS).map((k) => layer(`${idp}-brows-${k}`, k === browOn, `<path d="${BROWS[k]}" stroke="${C.hair}" stroke-width="8" fill="none" stroke-linecap="round"/>`)).join('');
  const mouths = Object.keys(MOUTHS).map((k) => layer(`${idp}-mouth-${k}`, k === mouth, MOUTHS[k])).join('');
  const poses = Object.keys(POSES).map((k) => layer(`${idp}-arms-${k}`, k === pose, arms(k))).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 760" width="520" height="760">${DEFS}
${BODY}<g id="${idp}-head">${HEAD}${eyes}${brows}${mouths}</g>${poses}${prop === 'cooker' ? cooker(steam).replace('id="prop-cooker"', `id="${idp}-cooker"`).replace('id="steam"', `id="${idp}-steam"`) : ''}
</svg>`;
}

/** One still image (cover, character sheet). */
function svg(opts = {}) { return layered({ prop: 'none', ...opts }); } // hidden layers have opacity 0, so this is one clean still

module.exports = { layered, svg, POSES, MOODS, EYES: Object.keys(EYES), BROWS: Object.keys(BROWS), MOUTHS: Object.keys(MOUTHS), COLORS: C };
