'use strict';
// ===================== THE HERO'S RUN =====================
// title > (vs > howto > count > play > result) for every game > bossIntro > boss > finale
// The hero is player slot 1. Slot 0 is the family member they're facing, played by the computer,
// or by a real grown-up on WASD / Space / the left touch pad in 2-player mode.
const TAUNT = {
  dad: ['TI HO INSEGNATO TUTTO IO.', 'VACCI PIANO, LE MIE GINOCCHIA.', 'AI MIEI TEMPI ERO FORTISSIMO.'],
  mum: ['IO NON PERDO. CHIEDI A TUO PADRE.', 'CHI PERDE LAVA I PIATTI.', 'MI SONO ALLENATA.'],
  granny: ['GIOCO A QUESTO DA ANNI.', 'NON FARTI INGANNARE DAL GOLFINO.', 'CHI VINCE PRENDE UN BISCOTTO.'],
  grandad: ['AI MIEI TEMPI C\'ERA UN TASTO SOLO.', 'MI STO SOLO SCALDANDO.', 'NESSUNO BATTE IL NONNO.'],
  auntie: ['LA ZIA PREFERITA E TORNATA!', 'OGGI NIENTE PIETA.', 'SONO PIU BRAVO DI TUO ZIO.'],
  uncle: ['TI DO UN VANTAGGIO.', 'GUARDA E IMPARA.', 'SALUTAMI TUO PADRE.'],
  brother: ['VAI GIU!', 'NEANCHE IL COMPLEANNO TI SALVA.', 'SE IMBROGLI LO DICO.'],
  sister: ['PRONTO A PERDERE?', 'LA CAMPIONESSA DI CASA SONO IO.', 'NIENTE PIANTI SE PERDI.'],
  friend: ['SAPPIAMO TUTTI E DUE CHI VINCE.', 'POI NON SI TORNA INDIETRO.', 'CHI PERDE PORTA LE BORSE.'],
  bestfriend: ['AMICI FINO AL FISCHIO.', 'CONOSCO TUTTI I TUOI TRUCCHI.', 'QUESTO ME LO HAI INSEGNATO TU.'],
  cousin: ['E IN GIOCO L\'ONORE DI FAMIGLIA.', 'ASPETTO DA UN ANNO.', 'VINCE IL MIO RAMO DELLA FAMIGLIA.'],
  teacher: ['QUESTO NON E NEL COMPITO.', 'FAI VEDERE I PASSAGGI.', 'IO CORREGGO DURO.'],
  coach: ['TI SEI SCALDATO?', 'LI FUORI NIENTE SCUSE.', 'HO VISTO I TUOI ALLENAMENTI.']
};
const CHEERS_END = { birthday: 'BUON COMPLEANNO!', christmas: 'BUON NATALE!', fathers: 'BUONA FESTA DEL PAPA!', mothers: 'BUONA FESTA DELLA MAMMA!', star: 'BRAVO!' };
let S = { name: 'title', t: 0 }, game = null, round = 0, won = [0, 0], two = false, bossTime = 0;
// Party mode: a birthday party is six children in a room, so they take turns as the challenger
// against the hero. No typing (a name box on a canvas is a misery), just PLAYER 1 to PLAYER 6.
let party = null;
function go(name, data) {
  S = Object.assign({ name, t: 0 }, data || {}); parts = []; floats = [];
  if (ST[name].enter) ST[name].enter();
}
function hud(title, sub) {
  rect(0, 0, W, AY - 2, '#0a0416'); rect(0, AY - 2, W, 2, COL.hot);
  txt(PL[0].name, 6, 4, 8, PL[0].col); txt(PL[1].name, W - 6, 4, 8, PL[1].col, 'right');
  txt(title, W / 2, 4, 8, COL.cyan, 'center'); if (sub) txt(sub, W / 2, 15, 8, '#fff', 'center');
  for (let k = 0; k < GAMES.length; k++) rect(W - 6 - (GAMES.length - k) * 10, 15, 7, 7, k < round - 1 ? COL.green : k === round - 1 ? '#fff' : COL.off);
}
function pressFire(y, label) { if (S.t % 50 < 34) txt(label || (touchMode ? 'TOCCA O PREMI FUOCO' : 'PREMI FUOCO'), W / 2, y, 8, '#fff', 'center', COL.hot); }
function whistle() { tone(2100, .35, 'square', .12); tone(2250, .35, 'square', .08, 0, .02); }
// the referee: the dog if there is one, otherwise a spare grown-up
function referee(cx, fy, sc) { if (petRuns()) pet(cx, fy, sc + 1, true, 0); else if (helper()) person(helper(), cx, fy, sc, false, 0); }
const refName = () => petRuns() ? PET.name : helper() ? helper().name : '';
function cake(cx, by, t) {
  rect(cx - 40, by - 30, 80, 30, '#ff8fb0'); rect(cx - 40, by - 30, 80, 6, '#fff'); for (let x = cx - 38; x < cx + 38; x += 8) rect(x, by - 25, 4, 4 + (x % 3), '#fff');
  rect(cx - 30, by - 52, 60, 22, '#ffd23f'); rect(cx - 30, by - 52, 60, 5, '#fff'); rect(cx - 48, by, 96, 4, '#cfc8e6');
  for (let k = 0; k < 5; k++) { const x = cx - 22 + k * 11; rect(x, by - 62, 3, 10, ['#22e6ff', '#ff2bd6', '#3dff8b', '#ff6b1a', '#7a3cff'][k]); rect(x, by - 67 - (t / 4 + k) % 2, 3, 4, t % 10 < 5 ? '#ffd23f' : '#ff6b1a'); }
}
function tree(cx, by, t) {
  for (let k = 0; k < 4; k++) { const w = 70 - k * 16, y = by - 20 - k * 20; g.fillStyle = '#1e7a34'; g.beginPath(); g.moveTo(cx - w / 2, y); g.lineTo(cx + w / 2, y); g.lineTo(cx, y - 30); g.closePath(); g.fill(); }
  rect(cx - 6, by - 20, 12, 20, '#6b3f1d');
  for (let k = 0; k < 9; k++) rect(cx - 26 + (k * 37) % 52, by - 30 - (k * 23) % 70, 4, 4, ['#ff2e4d', '#ffd23f', '#22e6ff'][(k + Math.floor(t / 15)) % 3]);
  rect(cx - 3, by - 110, 6, 6, '#ffd23f');
}
function trophy(cx, by) { rect(cx - 20, by - 50, 40, 26, '#ffd23f'); rect(cx - 28, by - 48, 8, 12, '#ffd23f'); rect(cx + 20, by - 48, 8, 12, '#ffd23f'); rect(cx - 5, by - 24, 10, 12, '#e0b64a'); rect(cx - 16, by - 12, 32, 12, '#6b3f1d'); rect(cx - 10, by - 44, 6, 14, '#fff2c2'); }

const ST = {
  title: {
    enter() { mus.mode = 'title'; mus.fast = false; round = 0; won = [0, 0]; bossTime = 0; cpu = 0; party = null; S.sel = 0; setOpponent(0); },
    update() {
      const I = anyIn();
      if (I.uP) { S.sel = (S.sel + MENU.length - 1) % MENU.length; sfx.tick(); }
      if (I.dP) { S.sel = (S.sel + 1) % MENU.length; sfx.tick(); }
      if ((I.aP || clicked) && S.t > 20) {
        audioInit(); sfx.coin(); party = null;
        two = S.sel > 0; cpu = two ? -1 : 0;
        go(S.sel === 2 ? 'partySetup' : 'vs');
      }
    },
    draw() {
      const t = S.t; bgSynth(t);
      // The three lines that sell the whole thing, so they are the biggest text on the screen.
      txt('STARRING', W / 2, 12, 16, COL.cyan, 'center', true);
      const n = HERO.name, size = n.length > 9 ? 24 : n.length > 7 ? 28 : 32;
      // a dark plate behind the name, so it reads against the sun rather than sitting in it
      rect(W / 2 - (n.length * size) / 2 - 10, 30, n.length * size + 20, size + 10, 'rgba(10,4,22,.55)');
      logo(n, W / 2, 34, size, '#ffffff', PL[1].col, mix(PL[1].col, '#000000', .35));
      const occ = CFG.occasion === 'star' ? 'UN\'AVVENTURA ARCADE' : OCCASIONS[CFG.occasion] + ' EDITION';
      const ow = occ.length * 12, oh = 22;
      rect(W / 2 - ow / 2 - 8, 74, ow + 16, oh, 'rgba(10,4,22,.9)');
      rect(W / 2 - ow / 2 - 8, 74, ow + 16, 2, COL.gold);
      txt(occ, W / 2, 79, 12, COL.gold, 'center');
      // the whole cast lined up along the horizon
      const cast = [HERO].concat(FAM), gap = 64, x0 = W / 2 - (cast.length - 1) * gap / 2;
      cast.forEach((sp, k) => { shadow(x0 + k * gap, 172, 12); drawSpec(sp, x0 + k * gap, 172, 3, false, Math.floor(t / 20 + k)); });
      // the pet crosses the screen, or sits on the left in its bowl
      if (petRuns()) { const c = t % 900; pet((c * 1.1) % (W + 120) - 60, 262, 2, true, Math.floor(t / 6)); }
      else if (PET) pet(40, 262, 2, true, Math.floor(t / 22));
      MENU.forEach((o, k) => {
        const on = S.sel === k, y = 190 + k * 15;
        if (on) arrow('r', W / 2 - o.length * 4 - 14, y + 4, 5, COL.hot);
        txt(o, W / 2, y, 8, on ? '#fff' : COL.dim, 'center');
      });
      pressFire(240, touchMode ? 'TOCCA PER INIZIARE' : 'PREMI FUOCO O CLICCA');
    }
  },
  vs: {
    enter() {
      round++; setOpponent(round - 1); game = GAMES[round - 1].make();
      S.taunt = pick(TAUNT[CHAR[0].role] || ['SI COMINCIA!']);
      say(SAYNAME[1] + ', contro, ' + SAYNAME[0] + '!'); mus.mode = 'match'; mus.fast = round === GAMES.length;
    },
    update() { if ((S.t > 80 && (anyIn().aP || clicked)) || S.t > 480) go('howto'); },
    draw() {
      const t = S.t; rect(0, 0, W, H, '#12062b');
      g.fillStyle = mix(PL[0].col, '#12062b', .78); g.beginPath(); g.moveTo(0, 0); g.lineTo(260, 0); g.lineTo(220, H); g.lineTo(0, H); g.closePath(); g.fill();
      g.fillStyle = mix(PL[1].col, '#12062b', .78); g.beginPath(); g.moveTo(260, 0); g.lineTo(W, 0); g.lineTo(W, H); g.lineTo(220, H); g.closePath(); g.fill();
      const slide = Math.max(0, 30 - t) * 8;
      boy(0, 100 - slide, 176, 6, false, 0); boy(1, 380 + slide, 176, 6, true, 0);
      txt(PL[0].name, 100, 184, 16, PL[0].col, 'center', true); txt(PL[1].name, 380, 184, 16, PL[1].col, 'center', true);
      txt('ROUND ' + round + ' DI ' + GAMES.length, W / 2, 14, 8, COL.dim, 'center');
      if (t > 20) logo('VS', W / 2, 30, 32, '#fff', COL.hot, '#7a0a66');
      txt(game.name, W / 2, 76, 8, COL.gold, 'center');
      if (t > 50) bubble(S.taunt, 150, 100, 18);
      if (t > 80) pressFire(246);
    }
  },
  howto: {
    enter() { game.init(); cheerReset(); },
    update() { if ((S.t > 45 && (anyIn().aP || clicked)) || S.t > 540) go('count'); },
    draw() {
      game.draw(); rect(0, 0, W, H, 'rgba(10,4,22,.86)'); hud('ROUND ' + round, '');
      txt(game.name, W / 2, 46, 16, COL.gold, 'center', true);
      game.how.forEach((l, k) => txt(l, W / 2, 78 + k * 15, 8, '#fff', 'center'));
      rect(60, 146, 360, 1, COL.hot); txt(game.ctl, W / 2, 156, 8, COL.cyan, 'center');
      txt(touchMode ? 'TOCCO: FRECCE PER MUOVERTI, TASTO GRANDE PER SPARARE' : two ? PL[0].name + ': WASD + SPAZIO    ' + PL[1].name + ': FRECCE + INVIO' : 'FRECCE O WASD.  FUOCO: SPAZIO O INVIO', W / 2, 176, 8, COL.dim, 'center');
      if (S.t > 45) pressFire(212, 'PREMI FUOCO QUANDO SEI PRONTO');
    }
  },
  count: {
    enter() { say('Round ' + round + '. Go!'); },
    update() { if (S.t % 40 === 1 && S.t < 120) sfx.count(); if (S.t === 121) whistle(); if (S.t > 150) go('play'); },
    draw() {
      game.draw(); hud(game.name, game.sub ? game.sub() : '');
      const n = S.t < 120 ? String(3 - Math.floor(S.t / 40)) : 'VIA!';
      rect(0, 106, W, 58, 'rgba(10,4,22,.72)'); txt(n, W / 2, 120, 32, S.t < 120 ? '#fff' : COL.green, 'center', true);
      if (refName()) { referee(110, 162, 3); txt('ARBITRO:', 356, 122, 8, COL.dim, 'center'); txt(refName(), 356, 136, 16, COL.purple, 'center', '#fff'); }
    }
  },
  play: {
    enter() { S.endT = 0; },
    update() {
      if (game.done < 0) { cpuIn = (cpu >= 0 && game.ai) ? game.ai(cpu) : null; game.update(); }
      else if (++S.endT > 60) { won[game.done]++; go('result', { w: game.done }); }
    },
    draw() { game.draw(); hud(game.name, game.sub ? game.sub() : ''); }
  },
  result: {
    enter() { sfx.score(); whistle(); burst(W / 2, 120, 50, [PL[S.w].col, '#fff'], 5); if (S.w === 1) say(SAYNAME[1] + ' vince!'); },
    update() { if ((S.t > 90 && (anyIn().aP || clicked)) || S.t > 330) go(party ? 'partyNext' : round < GAMES.length ? 'vs' : TEASER ? 'locked' : 'bossIntro', party ? { w: S.w } : null); },
    draw() {
      rect(0, 0, W, H, '#12062b'); stars(S.t, H); hud('ROUND ' + round, PL[1].name + ' ' + won[1] + ' - ' + won[0] + ' FAMIGLIA');
      const hop = Math.abs(Math.sin(S.t / 8)) * 16, L = 1 - S.w;
      boy(S.w, W / 2, 176 - hop, 6, false, 0);
      boy(L, 400, 176, 4, true, 0); if (S.t > 30) bubble(CATCH[L], 400, 60, 14);
      txt(PL[S.w].name + ' VINCE!', W / 2, 196, 16, PL[S.w].col, 'center', true);
      txt(S.w === 1 ? 'ORA LA FAMIGLIA E NEI GUAI.' : 'IL PROSSIMO E TUO, ' + PL[1].name + '!', W / 2, 220, 8, '#fff', 'center');
      if (S.t > 90) pressFire(246);
    }
  },
  // ---- party mode: pick how many are playing, then each one takes a turn
  partySetup: {
    enter() { S.n = 3; mus.mode = 'title'; mus.fast = false; },
    update() {
      const I = anyIn();
      if (I.uP || I.rP) { S.n = Math.min(6, S.n + 1); sfx.tick(); }
      if (I.dP || I.lP) { S.n = Math.max(2, S.n - 1); sfx.tick(); }
      if ((I.aP || clicked) && S.t > 20) {
        sfx.coin();
        party = { n: S.n, i: 1, wins: new Array(S.n).fill(0) };
        round = 0; won = [0, 0]; two = true; cpu = -1;
        go('partyVs');
      }
    },
    draw() {
      bgSynth(S.t); rect(0, 0, W, H, 'rgba(10,4,22,.82)');
      txt('MODALITA FESTA', W / 2, 26, 16, COL.gold, 'center', true);
      txt('TUTTI GIOCANO UN TURNO CONTRO ' + HERO.name + '.', W / 2, 56, 8, '#fff', 'center');
      txt('QUANTI SFIDANTI?', W / 2, 92, 8, COL.cyan, 'center');
      for (let k = 2; k <= 6; k++) {
        const on = S.n === k, x = W / 2 + (k - 4) * 56;
        rect(x - 22, 112, 44, 44, on ? COL.hot : 'rgba(255,255,255,.08)');
        txt(String(k), x, 124, 24, on ? '#fff' : COL.dim, 'center');
      }
      txt('SU E GIU PER CAMBIARE', W / 2, 174, 8, COL.dim, 'center');
      txt('OGNUNO GIOCA UN GIOCO. L\'EROE LI GIOCA TUTTI.', W / 2, 196, 8, '#fff', 'center');
      if (S.t > 20) pressFire(228);
    }
  },
  partyVs: {
    enter() {
      round++; setOpponent(round - 1);
      PL[0].name = 'GIOCATORE ' + party.i;
      game = GAMES[(party.i - 1) % GAMES.length].make();
      mus.mode = 'match'; mus.fast = false;
      say('Giocatore ' + party.i + ', contro, ' + SAYNAME[1] + '!');
    },
    update() { if ((S.t > 60 && (anyIn().aP || clicked)) || S.t > 400) go('howto'); },
    draw() {
      rect(0, 0, W, H, '#12062b'); stars(S.t, H);
      txt('MODALITA FESTA', W / 2, 12, 8, COL.dim, 'center');
      logo('GIOCATORE ' + party.i, W / 2, 28, 24, '#ffffff', PL[0].col, mix(PL[0].col, '#000000', .35));
      txt('SFIDI ' + HERO.name + '.', W / 2, 64, 8, '#fff', 'center');
      boy(0, 120, 190, 6, false, 0); boy(1, 360, 190, 6, true, 0);
      txt(game.name, W / 2, 96, 16, COL.gold, 'center', true);
      txt('TASTI DELL\'ADULTO: WASD E SPAZIO', W / 2, 206, 8, COL.dim, 'center');
      if (S.t > 60) pressFire(232);
    }
  },
  partyNext: {
    enter() {
      if (S.w === 0) party.wins[party.i - 1]++;
      party.i++;
      if (party.i > party.n) { go('partyEnd'); return; }
      go('partyVs');
    },
    update() {}, draw() {}
  },
  partyEnd: {
    enter() {
      mus.mode = 'title'; mus.fast = true; sfx.clap();
      confetti(60, [COL.gold, COL.hot, COL.cyan, '#fff']);
      const best = Math.max(...party.wins);
      S.champs = party.wins.map((w, k) => w === best && best > 0 ? k + 1 : 0).filter(Boolean);
      say(S.champs.length ? 'Abbiamo un campione!' : SAYNAME[1] + ' ha battuto tutti!');
    },
    update() { if (S.t > 90 && (anyIn().aP || clicked)) go('title'); },
    draw() {
      bgSynth(S.t); rect(0, 0, W, H, 'rgba(10,4,22,.86)');
      txt('RISULTATI DELLA FESTA', W / 2, 18, 16, COL.gold, 'center', true);
      const rows = party.n, gap = Math.min(24, Math.floor(120 / rows)), top = 54;
      party.wins.forEach((w, k) => {
        const y = top + k * gap, champ = S.champs.includes(k + 1);
        rect(110, y, 260, gap - 4, champ ? 'rgba(255,210,63,.18)' : 'rgba(255,255,255,.06)');
        txt('GIOCATORE ' + (k + 1), 122, y + 4, 8, champ ? COL.gold : '#fff');
        txt(w ? 'HA BATTUTO ' + HERO.name : 'HA PERSO CON ' + HERO.name, 360, y + 4, 8, w ? COL.green : COL.dim, 'right');
      });
      const line = S.champs.length === 0 ? HERO.name + ' HA BATTUTO TUTTI!'
        : S.champs.length === 1 ? 'CAMPIONE: GIOCATORE ' + S.champs[0]
        : 'CAMPIONI: GIOCATORE ' + S.champs.join(' E ');
      txt(line, W / 2, top + rows * gap + 12, 12, COL.cyan, 'center', true);
      boy(1, W / 2, 250, 4, false, Math.floor(S.t / 10));
      if (S.t > 90) pressFire(top + rows * gap + 38, 'PREMI FUOCO PER IL MENU');
    }
  },

  // the end of the teaser: what they just played, against what the full game has
  locked: {
    enter() { mus.mode = 'title'; mus.fast = false; say('Questa era la demo.'); },
    update() { if (S.t > 60 && (anyIn().aP || clicked)) go('title'); },
    draw() {
      bgSynth(S.t); rect(0, 0, W, H, 'rgba(10,4,22,.82)');
      txt('QUESTA ERA LA DEMO', W / 2, 26, 16, COL.gold, 'center', true);
      txt('IL GIOCO COMPLETO CONTINUA:', W / 2, 54, 8, '#fff', 'center');
      // the list sizes itself, so adding a game to LOCKED never pushes the last line off screen
      const rows = LOCKED.length, gap = Math.min(24, Math.floor(120 / rows)), h = gap - 4, top = 70;
      LOCKED.forEach((name, k) => {
        const y = top + k * gap;
        rect(96, y, 288, h, 'rgba(255,255,255,.07)'); rect(96, y, 2, h, COL.off);
        txt(name, 116, y + Math.round((h - 8) / 2), 8, COL.dim);
        // a padlock, drawn small enough to read as one at this size
        const lx = 352, ly = y + Math.round((h - 12) / 2); rect(lx, ly + 4, 10, 8, COL.dim); rect(lx + 2, ly, 6, 2, COL.dim); rect(lx + 2, ly + 2, 2, 3, COL.dim); rect(lx + 6, ly + 2, 2, 3, COL.dim);
      });
      txt('E ' + HERO.name + ' VEDE IL SUO NOME A LUCI ALLA FINE.', W / 2, top + rows * gap + 8, 8, COL.cyan, 'center');
      if (S.t > 60) pressFire(top + rows * gap + 30, 'PREMI FUOCO PER RIGIOCARE');
    }
  },
  bossIntro: {
    enter() {
      setOpponent(0); S.bed = CFG.occasion === 'birthday' || CFG.occasion === 'christmas'; game = gBoss(S.bed ? 1 : 0); mus.mode = 'boss'; mus.step = 0; mus.fast = false;
      say(S.bed ? 'Oh no. È ora di dormire. ' + SAYNAME[1] + ' e ' + SAYNAME[0] + ', in squadra!' : 'Il mostro dei compiti! ' + SAYNAME[1] + ' e ' + SAYNAME[0] + ', in squadra!');
    },
    update() { if ((S.t > 120 && (anyIn().aP || clicked)) || S.t > 480) go('boss', { bed: S.bed }); },
    draw() {
      game.draw(); rect(0, 110, W, 142, 'rgba(10,4,22,.88)');
      txt('UN\'ULTIMA SFIDA. IN SQUADRA!', W / 2, 116, 8, COL.red, 'center');
      txt(S.bed ? 'L\'OROLOGIO DELLA NANNA' : 'IL MOSTRO DEI COMPITI', W / 2, 132, 16, '#fff', 'center', true);
      txt(S.bed ? (CFG.occasion === 'christmas' ? 'BABBO NATALE NON ARRIVA SE NON DORMI!' : 'IL GIORNO DEL COMPLEANNO? SCORDATELO!') : 'VUOLE TUTTO IL TUO WEEKEND!', W / 2, 154, 8, COL.gold, 'center');
      txt(PL[1].name + ' E ' + PL[0].name + ' NELLA STESSA SQUADRA.', W / 2, 170, 8, COL.cyan, 'center');
      txt('TIENI FUOCO PER SPARARE. RIEMPI LA BARRA,', W / 2, 186, 8, '#fff', 'center');
      txt(two ? 'POI PREMETE FUOCO INSIEME!' : 'POI PREMI FUOCO PER IL COLPO DI FAMIGLIA!', W / 2, 198, 8, '#fff', 'center');
      txt('PRENDI IL CIBO. I PIATTI ' + CHAR[1].letter + ' E ' + CHAR[0].letter + ' SONO TUOI.', W / 2, 214, 8, COL.green, 'center');
      if (S.t > 120) pressFire(234);
    }
  },
  boss: {
    enter() { if (!game || !game.boss || game.done >= 0) game = gBoss(S.bed ? 1 : 0); mus.mode = 'boss'; },
    update() {
      if (game.done < 0) { cpuIn = cpu >= 0 ? game.ai(cpu) : null; game.update(); }
      else if (game.done === 1) { bossTime = Math.round(game.time / 60); go('finale'); }
      else go('cont', { bed: S.bed });
    },
    draw() { game.draw(); }
  },
  cont: {
    enter() { mus.mode = 'off'; sfx.buzz(); },
    update() { if (S.t > 30 && (anyIn().aP || clicked)) { sfx.coin(); game = null; go('boss', { bed: S.bed }); } else if (S.t % 60 === 0 && S.t <= 540) sfx.count(); else if (S.t > 600) { game = null; go('boss', { bed: S.bed }); } },
    draw() {
      rect(0, 0, W, H, '#0a0416'); boy(1, 200, 200, 4, false, 0); boy(0, 280, 200, 4, true, 0);
      txt('PER POCO!', W / 2, 40, 24, '#fff', 'center', true); txt('ANCORA?', W / 2, 80, 16, COL.gold, 'center');
      pressFire(226, 'FUOCO: UN ALTRO GIRO!');
    }
  },
  // ---- the gift moment
  finale: {
    enter() { mus.mode = 'title'; mus.fast = true; S.lines = FAM.map(m => pick([CHEERS_END[CFG.occasion], 'BRAVO, ' + HERO.name + '!', 'SEI IL MIGLIORE!'])); },
    update() {
      if (S.t === 60) { sfx.clap(); sfx.power(); burst(W / 2, 150, 60, ['#fff', COL.gold, PL[1].col], 5); shake = 6; say(titleCase(OCCASIONS[CFG.occasion].toLowerCase()) + ', ' + SAYNAME[1] + '!'); }
      if (S.t > 60 && S.t % 60 === 0) confetti(50, ['#fff', COL.gold, COL.hot, COL.cyan, PL[1].col]);
      if (S.t > 360 && (anyIn().aP || clicked)) go('title');
    },
    draw() {
      const t = S.t; bgSynth(t);
      const head = OCCASIONS[CFG.occasion] + ',', name = HERO.name + '!';
      if (t > 40) { logo(head, W / 2, 10, 16, '#fff', COL.gold, '#ff6b1a'); logo(name, W / 2, 32, name.length > 8 ? 24 : 32, '#fff', PL[1].col, mix(PL[1].col, '#000', .35)); }
      if (CFG.occasion === 'birthday') cake(W / 2, 230, t); else if (CFG.occasion === 'christmas') tree(W / 2, 236, t); else trophy(W / 2, 236);
      const k = clamp(t / 60, 0, 1), hop = t > 60 ? Math.abs(Math.sin(t / 9)) * 14 : 0;
      drawSpec(HERO, W / 2 - 90 + (1 - k) * -120, 252 - hop, 4, false, t < 60 ? Math.floor(t / 6) : 0);
      FAM.forEach((m, i) => { const f = clamp((t - 90 - i * 30) / 50, 0, 1), x = W + 40 - f * (170 - i * 52); if (f > 0) drawSpec(m, x, 252, 4, true, Math.floor(t / 16)); if (t > 170 + i * 50 && i < 2) bubble(S.lines[i], x, 88 + i * 30, 14); });
      if (PET && t > 60) pet(W / 2 + 70, 262 - (petRuns() ? Math.abs(Math.sin(t / 7)) * 14 : 0), 3, false, Math.floor(t / (petRuns() ? 6 : 22)));
      if (t > 150) bubble(CATCH[1], W / 2 - 90, 96, 14);
      if (t > 240) txt('HA VINTO ' + won[1] + ' DI ' + GAMES.length + ' GIOCHI. BOSS BATTUTO IN ' + bossTime + 'S.', W / 2, 74, 8, '#fff', 'center', '#0a0416');
      if (t > 360) pressFire(258, 'PREMI CONDIVIDI E MANDALO ALLA FAMIGLIA');
    }
  }
};

// ===================== MAIN LOOP =====================
const STEP = 1000 / 60; let last = 0, acc = 0;
function tick() {
  if (flashT > 0) flashT--;
  if (freeze > 0) { freeze--; clearLatches(); return; }
  S.t++; ST[S.name].update(); musicTick(); fxTick();
  clearLatches();
}
function render() {
  g.save();
  if (shake > 0) g.translate(Math.round(rnd(-shake, shake)), Math.round(rnd(-shake, shake)));
  ST[S.name].draw(); fxDraw();
  if (flashT > 0) { g.globalAlpha = flashT / 9 * .3; rect(0, 0, W, H, flashC); g.globalAlpha = 1; }
  g.restore();
  if (muted) txt('MUTO', W - 4, H - 10, 8, COL.dim, 'right');
}
function frame(ts) {
  requestAnimationFrame(frame);
  const dt = Math.min(100, ts - last); last = ts; acc += dt;
  pollPads();
  let n = 0; while (acc >= STEP && n < 5) { tick(); acc -= STEP; n++; }
  if (n) render();
}
function startGame(cfg) { applyConfig(cfg); go('title'); requestAnimationFrame(frame); }

// ---- share: a picture of the screen plus this game's link
async function shareGame(btn) {
  const text = S.name === 'finale' ? HERO.name.charAt(0) + HERO.name.slice(1).toLowerCase() + ' ha battuto tutta la famiglia. Vieni a giocare:' : 'Vieni a giocare al gioco arcade di ' + titleCase(HERO.name) + ':';
  const url = location.href;
  try {
    const big = document.createElement('canvas'); big.width = W * 3; big.height = H * 3;
    const bg = big.getContext('2d'); bg.imageSmoothingEnabled = false; bg.drawImage(cv, 0, 0, big.width, big.height);
    const blob = await new Promise(r => big.toBlob(r, 'image/png'));
    const file = blob && new File([blob], 'happy-hero-games.png', { type: 'image/png' });
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], text: text + ' ' + url });
    else if (navigator.share) await navigator.share({ title: 'Happy Hero Games', text, url });
    else { await navigator.clipboard.writeText(text + ' ' + url); btn.textContent = 'Link copiato'; setTimeout(() => { btn.textContent = 'Condividi'; }, 2000); }
  } catch (e) {}
}
window.__hhg = { go, state: () => S, game: () => game, setCpu: v => { cpu = v; }, setDemo: v => { demo = v; }, tick, render, games: () => GAMES.map(x => x.name), won: () => won };
