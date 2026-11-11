const axios = require('axios')

const DOLAR_API = 'https://dolarapi.com/v1'
const ARGENTINA_DATOS = 'https://api.argentinadatos.com/v1'
const BCRA = 'https://api.bcra.gob.ar/estadisticas/v4.0/monetarias'

const TTL_CORTO = 60 * 1000
const TTL_LARGO = 60 * 60 * 1000

// Cache en memoria para no golpear a las APIs externas en cada request.
const cache = new Map()

const get = async (url, ttl = TTL_CORTO) => {
    const hit = cache.get(url)
    if (hit && hit.expira > Date.now()) return hit.data
    const { data } = await axios.get(url, { timeout: 10000 })
    cache.set(url, { data, expira: Date.now() + ttl })
    return data
}

class cotizacionesService {
    // [{ moneda, casa, nombre, compra, venta, fechaActualizacion }]
    getDolares = () => get(`${DOLAR_API}/dolares`)

    getDolar = (casa) => get(`${DOLAR_API}/dolares/${casa}`)

    getCotizaciones = () => get(`${DOLAR_API}/cotizaciones`)

    getCotizacion = (moneda) => get(`${DOLAR_API}/cotizaciones/${moneda}`)

    // { valor, fecha }
    getRiesgoPais = () => get(`${ARGENTINA_DATOS}/finanzas/indices/riesgo-pais/ultimo`)

    // [{ casa, compra, venta, fecha }] desde 2011
    getHistoricoDolar = (casa) => get(`${ARGENTINA_DATOS}/cotizaciones/dolares/${casa}`, TTL_LARGO)

    // { fecha, valor } ultimo dato de una variable monetaria del BCRA
    getVariableBcra = async (id) => {
        const data = await get(`${BCRA}/${id}?limit=1`, TTL_LARGO)
        return data.results[0].detalle[0]
    }
}

module.exports = cotizacionesService
