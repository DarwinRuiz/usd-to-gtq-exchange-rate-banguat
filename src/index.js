const express = require('express')
const { format } = require('date-fns')

const { obtenerTipoCambioUSDDiaBanguat } = require('./utils/obtenerTipoCambioUSDDiaBanguat')


const app = express()
const port = 3000

app.get('/', async (req, res) => {
    try {
        const tipoCambioFechaActual = await obtenerTipoCambioUSDDiaBanguat()
        const fechaActual = format(new Date(), 'yyyy-MM-dd')

        res.status(200).json({
            message: `Tipo de cambio del día ${fechaActual}`,
            data: tipoCambioFechaActual
        })
    } catch (error) {
        res.status(500).json({ message: error.message, data: null })
    }

})

app.listen(port, () => {
    console.log(`API ADD UMG Conexión a BANGUAT ${port}`)
})