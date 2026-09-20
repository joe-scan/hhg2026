'use strict';
// ---------- THE FREE GAMES PAGE
// One harness for every theme at /free/: the start screen, the minute of play, and the end
// card with the player's name in lights and a picture worth sending. A theme page is a name,
// a game file and one call to freePage(), so the next season costs an afternoon.
//
// The game object it expects, on top of the usual init/update/draw/over:
//   name      the title on the start screen
//   howto     two or three short lines, already in capitals
//   endTitle  the greeting on the end card
//   result()  the one number worth sending, like CAUGHT 9 SWEETS
//   note()    an optional second line, or ''
//   bg(t)     the background, drawn behind every screen so the page never flashes
//   prop()    something small in the corner of the end card, or nothing
//   cols      the confetti colours
//   shareLine(name) what goes in the message when someone shares the picture

function freePage(make, opt) {
  opt = opt || {};
  const $ = id => document.getElementById(id);
  const cv = $('game'), input = $('who'), msg = $('msg');
  let game = make(opt.seconds || 60), live = false, t = 0, ending = 0;
  const look = heroLook();

  const hero = () => applyConfig(Object.assign({}, DEMO, {
    // the placeholder is translated with the page, so the empty state is too
    hero: Object.assign({}, DEMO.hero, look, { name: input.value || input.placeholder }),
    occasion: opt.occasion || 'star'
  }));

  const waiting = () => {
    game.bg(t);
    rect(0, 0, W, H, opt.veil || 'rgba(10,4,22,.62)');
    txt(game.name, W / 2, 40, 20, COL.gold, 'center', true);
    game.howto.forEach((line, i) => txt(line, W / 2, 96 + i * 22, 10, '#fff', 'center'));
    if (t % 50 < 34) txt(touchMode ? 'TAP START' : 'PRESS START', W / 2, 190, 16, COL.hot, 'center', true);
  };

  const ended = () => {
    game.bg(t);
    rect(0, 0, W, H, opt.veil || 'rgba(10,4,22,.7)');
    const n = HERO.name, size = n.length > 10 ? 24 : n.length > 8 ? 32 : 40;
    txt(game.endTitle, W / 2, 14, 16, COL.gold, 'center', true);
    namePlate(n, W / 2, 40 + 4, size);
    nameLogo(n, W / 2, 44, size);
    txt(game.result(), W / 2, 110, 20, COL.cyan, 'center', true);
    const note = game.note();
    if (note) txt(note, W / 2, 140, 10, COL.dim, 'center');
    drawSpec(HERO, 402, 240, 4, false, Math.floor(t / 10));
    if (game.prop) game.prop();
    txt('HappyHeroGames.com', W / 2, 252, 8, COL.dim, 'center');
    if (t % 50 < 34) txt(touchMode ? 'TAP TO PLAY AGAIN' : 'PRESS START TO PLAY AGAIN', W / 2, 182, 10, '#fff', 'center');
  };

  function frame() {
    requestAnimationFrame(frame); t++;
    if (!live) { waiting(); fxTick(); fxDraw(); clearLatches(); return; }
    game.update();
    game.draw();
    fxTick(); fxDraw();
    if (game.over) {
      if (!ending) {
        ending = t; confetti(40, game.cols); $('save').hidden = false;
        // the one moment somebody is pleased with us is the only moment worth asking anything
        if ($('next')) $('next').hidden = false;
      }
      if (t - ending > 40) ended();
    }
    clearLatches();
  }

  // A tap during play is the jump button in some games, so a finished game ignores taps for a
  // moment: otherwise the tap that ended it starts the next one.
  const done = () => game.over && t - ending > 60;
  const start = () => {
    audioInit(); hero();
    $('save').hidden = true; if ($('next')) $('next').hidden = true; if (msg) msg.textContent = '';
    ending = 0; game = make(opt.seconds || 60); game.init(); live = true;
    try { cv.focus(); } catch (e) {}
  };

  $('play').addEventListener('click', start);
  cv.addEventListener('click', () => { if (!live || done()) start(); });
  window.addEventListener('keydown', e => {
    if ((e.code === 'Space' || e.code === 'Enter') && (!live || done())) { e.preventDefault(); start(); }
  });

  const picture = () => new Promise(res => cv.toBlob(res, 'image/png'));
  const fileName = () => opt.file + '-' + (input.value || 'game').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';
  $('save').addEventListener('click', async () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await picture()); a.download = fileName(); a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    if (msg) msg.textContent = 'Saved.';
  });
  if (navigator.canShare && navigator.canShare({ files: [new File([''], 'x.png', { type: 'image/png' })] })) {
    $('share').hidden = false;
    $('share').addEventListener('click', async () => {
      try {
        const file = new File([await picture()], fileName(), { type: 'image/png' });
        await navigator.share({ files: [file], text: game.shareLine(input.value || HERO.name) });
      } catch (e) { if (msg) msg.textContent = 'Not shared.'; }
    });
  }

  input.addEventListener('input', hero);
  heroPick($('look'), look, hero, true);
  hero();
  frame();
  // the smoke test drives the page through this
  window.__free = { start, game: () => game, tick: () => { if (live) { game.update(); game.draw(); } } };
}
