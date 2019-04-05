
const fs = require('fs');
const path = require('path');

const toDelete = ['scripts', 'build', 'devDependencies', 'dependencies'];
const data = fs.readFileSync(path.resolve(__dirname, '../package.json'));
let jsonData = JSON.parse(data);

toDelete.forEach(toDel => toDel in jsonData && delete jsonData[toDel]);
fs.writeFileSync(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(jsonData, null, 2));
console.log(`package.json copied to dist/ with [${toDelete.join(', ')}] removed`);
