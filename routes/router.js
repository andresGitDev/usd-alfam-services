const express = require('express');
const router = express.Router();

const { fail } = require('../util/respuesta')
const util = require('../util/util')
const cotizacionesService = require('../services/cotizacionesService')
const cotizacionesController = require('../controller/cotizacionesController')

const c = new cotizacionesController(new cotizacionesService(), new util())

router.get('/api/all', c.getAllValues)

// Dolar
router.get('/api/dolaroficial', c.dolar('oficial'))
router.get('/api/dolarblue', c.dolar('blue'))
router.get('/api/contadoliqui', c.dolar('contadoconliqui'))
router.get('/api/dolarbolsa', c.dolar('bolsa'))
router.get('/api/dolarturista', c.dolar('tarjeta'))
router.get('/api/dolarcripto', c.dolar('cripto'))
router.get('/api/mayorista', c.dolar('mayorista'))

// Euro y Real (oficial)
router.get('/api/euro/oficial', c.moneda('eur'))
router.get('/api/real/oficial', c.moneda('brl'))

router.get('/api/riesgopais', c.getRiesgoPais)

router.get('/api/bcra/reservas', c.bcra(1, 'USD'))
router.get('/api/bcra/circulante', c.bcra(16, 'ARS'))

router.get('/api/evolucion/dolaroficial', c.evolucionDolar('oficial'))
router.get('/api/evolucion/dolarblue', c.evolucionDolar('blue'))

// Endpoints que dependian de dolarsi.com y que las nuevas fuentes no ofrecen.
const noDisponibles = [
    '/api/dolarpromedio',
    '/api/bbva', '/api/piano', '/api/hipotecario', '/api/galicia', '/api/santander', '/api/ciudad',
    '/api/supervielle', '/api/patagonia', '/api/comafi', '/api/nacion', '/api/bind', '/api/chaco',
    '/api/pampa', '/api/bancor',
    '/api/euro/nacion', '/api/euro/galicia', '/api/euro/bbva', '/api/euro/pampa', '/api/euro/chaco',
    '/api/euro/hipotecario',
    '/api/real/nacion', '/api/real/bbva', '/api/real/chaco',
    '/api/evolucion/realoficial', '/api/evolucion/eurooficial',
    '/api/casas/caba/metropolis', '/api/casas/caba/alpe', '/api/casas/caba/vaccaro',
    '/api/casas/caba/transatlantica', '/api/casas/lp/tilos', '/api/casas/mdp/jonestur',
    '/api/casas/mdp/moneta', '/api/casas/mdp/exchange', '/api/casas/rosario/daminato',
    '/api/casas/mendoza/montemar', '/api/casas/tucuman/maguitur'
]
noDisponibles.forEach(ruta => router.get(ruta, (req, res) => {
    res.status(501).send(fail('Cotizacion no disponible: la fuente original (dolarsi.com) dejo de funcionar'))
}))

module.exports = router
