'use strict';
// ---------- 4. BACK SEAT BATTLE: button masher, with a grown-up watching in the mirror.
// Ported from Fionn vs Sean on 20 Sep 2026: the two boys become the two players, Ted becomes
// whatever pet the family has, and Dad in the mirror becomes a spare grown-up (or nobody).
function gSeat() {
  // whoever is not playing watches from the front seat. With nobody spare, it is just the driver.
  const watcher = helper() ? helper().name : 'LE CONDUCTEUR';
  const s = { name: 'BAGARRE A L\'ARRIERE', how: ['MARTELE TIR POUR POUSSER LA LIGNE', 'DU COTE DE ' + PL[0].name + ' DANS LA VOITURE.', 'NE BOUGE PLUS QUAND ' + watcher + ' REGARDE DANS LE RETRO !'], ctl: 'MARTELE : TIR', pts: [0, 0], done: -1 };
  let line = 240, dad = 'safe', dT = 200, lookT = 0, caught = [false, false], jig = [0, 0], time = 1800, scroll = 0, aiT = 0, aiReact = 0;
  s.init = () => { };
  s.sub = () => Math.ceil(time / 60) + 's';
  s.ai = () => { if (--aiT > 0) return EMPTY; if (dad === 'look' && lookT >= aiReact) return EMPTY; aiT = rint(7, 11); return { aP: true }; };
  s.update = () => {
    scroll++; time--;
    if (--dT <= 0) {
      if (dad === 'safe') { dad = 'warn'; dT = 38; aiReact = R() < .3 ? 16 : 0; sfx.blip(); }
      else if (dad === 'warn') { dad = 'look'; dT = 75; lookT = 0; sfx.siren(); }
      else { dad = 'safe'; dT = rint(110, 240); caught = [false, false]; }
    }
    if (dad === 'look') lookT++;
    for (let i = 0; i < 2; i++) {
      if (jig[i] > 0) jig[i]--;
      if (!inp(i).aP || caught[i]) continue;
      if (dad === 'look') { caught[i] = true; line += i === 0 ? -30 : 30; shake = 8; sfx.buzz(); floatText('PRIS !', i === 0 ? 150 : 330, 150, '#fff', 16); }
      else { line += i === 0 ? 3 : -3.3; jig[i] = 5; sfx.tick(); }
    }
    line = clamp(line, 60, 420);
    if (line >= 420) s.done = 0; else if (line <= 60) s.done = 1;
    else if (time <= 0) { if (Math.abs(line - 240) < 1) time = 300; else s.done = line > 240 ? 0 : 1; }
    s.pts = [Math.round((line - 60) / 3.6), Math.round((420 - line) / 3.6)];
  };
  s.draw = () => {
    rect(0, AY, W, H - AY, '#1a1026');
    // rear window with the road rolling away
    g.save(); g.beginPath(); g.rect(70, 46, 340, 92); g.clip();
    const gr = g.createLinearGradient(0, 46, 0, 110); gr.addColorStop(0, '#ff8a3d'); gr.addColorStop(1, '#ffd36b'); g.fillStyle = gr; g.fillRect(70, 46, 340, 70);
    g.fillStyle = '#fff2b0'; g.beginPath(); g.arc(240, 108, 18, 0, Math.PI * 2); g.fill();
    rect(70, 108, 340, 30, '#2e8b57'); g.fillStyle = '#3a3a48'; g.beginPath(); g.moveTo(232, 108); g.lineTo(248, 108); g.lineTo(300, 138); g.lineTo(180, 138); g.closePath(); g.fill();
    for (let k = 0; k < 3; k++) { const z = ((k * 10 + scroll * .5) % 30) / 30; rect(239 - z * 2, 108 + z * 30, 2 + z * 3, 3 + z * 4, '#ffd23f'); }
    for (let k = 0; k < 4; k++) { const z = ((k * 25 + scroll * .6) % 100) / 100, side = k % 2 ? 1 : -1, x = 240 + side * (20 + z * 170), hgt = 10 + z * 50, base = 108 + z * 30; rect(x - 1, base - hgt, 2 + z * 2, hgt, '#3b2412'); g.strokeStyle = '#14532d'; g.lineWidth = 2; g.beginPath(); for (let a = 0; a < 5; a++) { g.moveTo(x, base - hgt); g.lineTo(x + Math.cos(a * 1.2 + 3.5) * (6 + z * 16), base - hgt + Math.sin(a * 1.2 + 3.5) * (4 + z * 8) + 4); } g.stroke(); }
    g.restore();
    g.strokeStyle = '#0a0416'; g.lineWidth = 4; g.strokeRect(70, 46, 340, 92);
    // the pet in the boot. A fish in a bowl does not slide about, so it sits still.
    if (PET) pet(240, 140 + Math.round(Math.sin(scroll / 12) * (petRuns() ? 2 : 0)), 2, false, petRuns() ? Math.floor(scroll / 10) : 0);
    // seat
    rect(40, 136, 400, 134, '#5a2440'); rect(40, 136, 400, 6, '#7a3358'); rect(90, 118, 60, 26, '#6b2b4c'); rect(330, 118, 60, 26, '#6b2b4c');
    rect(0, AY, 40, H, '#120a1e'); rect(440, AY, 40, H, '#120a1e');
    g.fillStyle = 'rgba(255,210,63,.22)'; g.fillRect(60, 142, line - 60, 128); g.fillStyle = 'rgba(255,46,77,.22)'; g.fillRect(line, 142, 420 - line, 128);
    boy(0, 150 + (jig[0] ? 5 : 0), 264, 4, false, 0); boy(1, 330 - (jig[1] ? 5 : 0), 264, 4, true, 0);
    g.shadowColor = COL.hot; g.shadowBlur = 10; for (let y = 140; y < H; y += 8) rect(line - 1, y, 3, 5, '#fff'); g.shadowBlur = 0;
    txt(PL[0].name + ' : SON COTE', 64, 146, 8, PL[0].col); txt(PL[1].name + ' : SON COTE', 416, 146, 8, PL[1].col, 'right');
    // mirror
    rect(196, 30, 88, 20, '#0a0416'); rect(198, 32, 84, 16, dad === 'look' ? '#ff2e4d' : '#3b4a66'); if (dad !== 'safe') rect(212, 32, 56, 3, '#1a1210');
    if (dad !== 'safe') { const o = dad === 'look' ? 0 : 3; for (const ex of [222, 250]) { rect(ex, 36 + o, 10, 7 - o, '#fff'); rect(ex + 3, 37 + o, 4, 5 - o, '#3a2210'); rect(ex - 1, 34 + o, 12, 2, '#3a2210'); } }
    if (dad === 'look') { rect(0, 52, W, 18, 'rgba(255,46,77,.9)'); txt(watcher + ' REGARDE ! NE BOUGEZ PLUS !', W / 2, 57, 8, '#fff', 'center'); }
    else if (dad === 'warn') txt('OH OH...', W / 2, 57, 8, '#fff', 'center');
  };
  return s;
}
addGame('BAGARRE A L\'ARRIERE', gSeat);
