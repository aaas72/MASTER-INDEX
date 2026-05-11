import fs from 'fs';
const data = JSON.parse(fs.readFileSync('d:/2026/index/data/algorithms.json', 'utf8'));
console.log(Object.keys(data));
