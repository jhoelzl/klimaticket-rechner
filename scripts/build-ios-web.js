const { cpSync, mkdirSync, rmSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const destination = join(root, 'dist');
const assets = ['index.html', 'manifest.json', 'sw.js', 'css', 'js', 'partials'];

mkdirSync(destination, { recursive: true });
for (const asset of assets) {
    rmSync(join(destination, asset), { recursive: true, force: true });
    cpSync(join(root, asset), join(destination, asset), { recursive: true });
}
