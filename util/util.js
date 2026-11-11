const pad = (n) => String(n).padStart(2, '0')

class util {

    getDateTime = (fecha) => {
        const d = fecha ? new Date(fecha) : new Date()
        const date = `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`
        const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
        return `${date} ${time}`
    }

    formatNumber = (value, decimalPlaces = 2) => {
        const n = Number(value)
        return Number.isFinite(n) ? n.toFixed(decimalPlaces) : 'No cotiza'
    }

    // Ultimo valor de venta de cada mes, de los ultimos 12 meses, ordenado por anio y mes.
    getEvolucion = (historico) => {
        const porMes = new Map()
        for (const dia of historico) {
            porMes.set(dia.fecha.slice(0, 7), dia)
        }
        const meses = [...porMes.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-12)
            .map(([key, dia]) => {
                const [anio, mes] = key.split('-')
                return { anio, mes: String(Number(mes)), valor: this.formatNumber(dia.venta) }
            })

        return { fecha: this.getDateTime(), meses }
    }
}

module.exports = util
