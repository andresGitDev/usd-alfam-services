// Incrementa buildRevision en metadata.json y actualiza buildTag.
// Lo ejecuta el workflow .github/workflows/bump-version.yml en cada push a main.
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'metadata.json')
const meta = JSON.parse(fs.readFileSync(file, 'utf8'))

meta.buildRevision += 1
meta.buildTag = new Date().toISOString()

fs.writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
console.log(`${meta.buildMajor}.${meta.buildMinor}.${meta.buildRevision}`)
