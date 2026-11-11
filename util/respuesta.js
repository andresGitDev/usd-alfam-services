const metadata = require('../metadata.json')

const meta = () => ({
    timestamp: new Date().toISOString().slice(0, 19),
    version: `${metadata.buildMajor}.${metadata.buildMinor}.${metadata.buildRevision}`,
    source: 'usd-alfam-services'
})

// Respuesta exitosa: success, message y metadata, seguidos de los datos del endpoint.
const ok = (data) => ({
    success: true,
    message: 'Operación realizada correctamente',
    metadata: meta(),
    ...data
})

// Respuesta de error: mismo formato, con success false y el detalle en message y error.
const fail = (message) => ({
    success: false,
    message,
    metadata: meta(),
    error: message
})

module.exports = { ok, fail }
