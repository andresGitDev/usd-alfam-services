const metadata = require('../metadata.json')

// Hora de Argentina (el servidor en Vercel corre en UTC): 2026-11-11T18:48:00
const ahora = () => new Date()
    .toLocaleString('sv-SE', { timeZone: 'America/Argentina/Buenos_Aires' })
    .replace(' ', 'T')

const meta = () => ({
    timestamp: ahora(),
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
