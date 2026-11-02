// The website is now more pages than macOS lets one program have open at once, and `expo export` writes them all at
// the same time. Load this before it (NODE_OPTIONS='--require ./scripts/limit-open-files.cjs') to write a few at a time.
const fs = require('fs');
const writeFile = fs.promises.writeFile;
const waiting = [];
let open = 0;
fs.promises.writeFile = async (...args) => {
  if (open >= 200) await new Promise((resolve) => waiting.push(resolve));
  open += 1;
  try {
    return await writeFile(...args);
  } finally {
    open -= 1;
    waiting.shift()?.();
  }
};
