// Ten skins for the page around the game. Colour only: the type, the layout and the pixel screen
// stay exactly as they are, so a choice here is a choice about mood, not about structure.
// Joe picks up to three; the winners move into site/css/site.css behind a data-skin attribute.
export const SKINS = [
  { id: 'paper',     name: 'Paper (current)',  vars: { paper:'#f7f6fb', ink:'#16112b', muted:'#5c5673', rule:'#d9d5e6', hot:'#c4107f', hotfill:'#ff2bd6', field:'#ffffff', 'on-hot':'#ffffff' } },
  { id: 'newsprint', name: 'Newsprint',        vars: { paper:'#f6f2e9', ink:'#14120f', muted:'#5f5a4e', rule:'#ddd6c5', hot:'#b01e2e', hotfill:'#d7263d', field:'#fffdf7', 'on-hot':'#ffffff' } },
  { id: 'blueprint', name: 'Blueprint',        vars: { paper:'#eef2f7', ink:'#0f1e35', muted:'#4a5b73', rule:'#cbd7e6', hot:'#12509b', hotfill:'#1f6feb', field:'#ffffff', 'on-hot':'#ffffff' } },
  { id: 'cabinet',   name: 'Cabinet (dark)',   vars: { paper:'#0f0c18', ink:'#efedf6', muted:'#a39dbb', rule:'#2c2640', hot:'#ff5ad8', hotfill:'#ff2bd6', field:'#17122a', 'on-hot':'#16112b' } },
  { id: 'mint',      name: 'Mint',             vars: { paper:'#eff6f1', ink:'#12251b', muted:'#4d6357', rule:'#cfe0d5', hot:'#0b7a4b', hotfill:'#12a862', field:'#ffffff', 'on-hot':'#ffffff' } },
  { id: 'sunset',    name: 'Sunset',           vars: { paper:'#fdf5ec', ink:'#2a1a12', muted:'#6b5546', rule:'#e6d6c3', hot:'#c2410c', hotfill:'#f2711c', field:'#fffaf4', 'on-hot':'#ffffff' } },
  { id: 'grape',     name: 'Grape',            vars: { paper:'#f4f0fb', ink:'#1d1233', muted:'#5a4d7a', rule:'#ded2f0', hot:'#5b21b6', hotfill:'#7c3aed', field:'#ffffff', 'on-hot':'#ffffff' } },
  { id: 'mono',      name: 'Mono and gold',    vars: { paper:'#ffffff', ink:'#111111', muted:'#5b5b5b', rule:'#d9d9d9', hot:'#111111', hotfill:'#ffd23f', field:'#ffffff', 'on-hot':'#111111' } },
  { id: 'lagoon',    name: 'Lagoon',           vars: { paper:'#edf6f6', ink:'#0e2429', muted:'#456065', rule:'#c9e0e1', hot:'#0b6b66', hotfill:'#12a19a', field:'#ffffff', 'on-hot':'#ffffff' } },
  { id: 'cherry',    name: 'Cherry',           vars: { paper:'#fff4f3', ink:'#2b1214', muted:'#6d4c4e', rule:'#f0d6d4', hot:'#b1162f', hotfill:'#e8253f', field:'#fffafa', 'on-hot':'#ffffff' } }
];
