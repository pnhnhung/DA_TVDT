const fs = require('fs');
const html = fs.readFileSync('ai_debug/org_structure.html', 'utf8');
const classes = new Set();
let m;
const re = /class="([^"]+)"/g;
while ((m = re.exec(html)) !== null) {
  m[1].split(' ').forEach(c => classes.add(c));
}
console.log([...classes].filter(c => c.includes('tree') || c.includes('org')).join(', '));
