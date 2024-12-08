const axios = require('axios')
const xml2js = require('xml2js')

const obtenerTipoCambioUSDDiaBanguat = async () => {
    const XMLBody = `<?xml version='1.0' encoding='utf-8'?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://www.banguat.gob.gt/variables/ws/">
           <soapenv:Header/>
           <soapenv:Body>
              <ws:TipoCambioDia>
              </ws:TipoCambioDia>
           </soapenv:Body>
        </soapenv:Envelope>`

    const API_TIPO_CAMBIO_BANGUAT =
        'https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx'
    const headers = {
        headers: {
            'Content-Type': 'text/xml',
            Accept: 'text/xml',
        },
    }

    const response = await axios.post(API_TIPO_CAMBIO_BANGUAT, XMLBody, headers)

    const parserXML = new xml2js.Parser()
    const respuestaXML = await parserXML.parseStringPromise(response.data, { explicitArray: false })

    const objetoTipoCambioJson = respuestaXML['soap:Envelope']['soap:Body'][0]['TipoCambioDiaResponse'][0]['TipoCambioDiaResult'][0]['CambioDolar'][0]

    return {
        USD: 1.0,
        GTQ: parseFloat(objetoTipoCambioJson.VarDolar[0].referencia[0]),
        fecha: objetoTipoCambioJson.VarDolar[0].fecha[0],
    }
}

module.exports = {
    obtenerTipoCambioUSDDiaBanguat
}