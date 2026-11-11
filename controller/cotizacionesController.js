const { ok, fail } = require('../util/respuesta')

// Envuelve un handler async: si falla la fuente externa responde 502.
const handle = (fn) => async (req, res) => {
    try {
        res.send(ok(await fn()))
    } catch (e) {
        console.log(e.message)
        res.status(502).send(fail('No se pudo obtener la cotizacion de la fuente externa'))
    }
}

class cotizacionesController {
    constructor(service, util) {
        this.service = service
        this.util = util
    }

    cotizacion = (data) => ({
        fecha: this.util.getDateTime(data.fechaActualizacion),
        compra: this.util.formatNumber(data.compra),
        venta: this.util.formatNumber(data.venta)
    })

    getAllValues = handle(async () => {
        const [dolares, otras] = await Promise.all([this.service.getDolares(), this.service.getCotizaciones()])
        return { valores: [...dolares, ...otras] }
    })

    // casa: oficial | blue | bolsa | contadoconliqui | mayorista | cripto | tarjeta
    dolar = (casa) => handle(async () => this.cotizacion(await this.service.getDolar(casa)))

    // moneda: eur | brl
    moneda = (moneda) => handle(async () => this.cotizacion(await this.service.getCotizacion(moneda)))

    getRiesgoPais = handle(async () => {
        const data = await this.service.getRiesgoPais()
        return {
            fecha: this.util.getDateTime(),
            valor: this.util.formatNumber(data.valor, 3)
        }
    })

    evolucionDolar = (casa) => handle(async () => this.util.getEvolucion(await this.service.getHistoricoDolar(casa)))

    // BCRA: variable 1 = reservas (millones de USD), 16 = circulacion monetaria (millones de ARS)
    bcra = (id, moneda) => handle(async () => {
        const { fecha, valor } = await this.service.getVariableBcra(id)
        return {
            fecha: this.util.getDateTime(`${fecha}T00:00:00`),
            valor: Math.round(valor * 1000000).toString(),
            moneda
        }
    })
}

module.exports = cotizacionesController
