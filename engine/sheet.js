// node sheet.js <postDir> t1,t2,... -> <postDir>/sheet.png
const fs = require('fs'), path = require('path'); const { createCanvas, loadImage } = require('@napi-rs/canvas');
(async () => {
  const d = path.resolve(process.argv[2]), ts = process.argv[3].split(','); const cols = Math.min(5, ts.length), rows = Math.ceil(ts.length / cols);
  const w = 270, h = 480, c = createCanvas(cols * w, rows * h), x = c.getContext('2d');
  for (let i = 0; i < ts.length; i++) x.drawImage(await loadImage(fs.readFileSync(path.join(d, `stills/t${Number(ts[i]).toFixed(2)}.png`))), (i % cols) * w, Math.floor(i / cols) * h, w, h);
  fs.writeFileSync(path.join(d, 'sheet.png'), c.toBuffer('image/png'));
})();
