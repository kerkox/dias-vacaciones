const calcularFecha = require("../helpers/getDateFinalVacation.js");

describe('Calculo de fecha final de vacaciones', () => {
    it('debe de retornar 28/agosto/2020 con la fecha de inicial 05/agosto/2020', () => {
        let fecha_inicial  = '2020-08-05';
        let {fecha} = calcularFecha(fecha_inicial)
        let fecha_texto = fecha.format('DD/MM/YYYY')
        expect(fecha_texto).toBe('28/08/2020')
    })

    it('debe de retornar 23 dias de diferencia entre 05/agosto/2020 y 28/agosto/2020', () => {
        let fecha_inicial = '2020-08-05';
        let { dias } = calcularFecha(fecha_inicial)
        expect(dias).toBe(23)
    })
})