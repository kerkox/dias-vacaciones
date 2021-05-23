const moment = require('moment');
const Holidays = require('colombia-holidays');


module.exports = calcularFecha = (fechaBaseInput, cantidadDiasVacaciones = 15) => {
    let fechaBase = moment(fechaBaseInput);
    let year = fechaBase.year();
    const festivos = Holidays.getColombiaHolidaysByYear(year);

    for (let x = 1; x < cantidadDiasVacaciones; x++) {
        fechaBase = fechaBase.add(1, 'd');
        while (!isWorkDay(festivos, fechaBase)) {
            fechaBase = fechaBase.add(1, 'd');
        }
    }
    let dias =  daysBetween(moment(fechaBaseInput), fechaBase);
    return {fecha: fechaBase, dias };
}

const daysBetween = (fechaInicial, fechaFinal) => {
    return fechaFinal.diff(fechaInicial, 'days');
}

const isWorkDay = (festivos, date) => {
    let day = Number(date.format('d'))
    switch (day) {
        case 0:
        case 6:
            return false;
    }
    return !isHoliday(festivos, date);
}
const isHoliday = (festivos, date) => {
    return festivos.some(day => moment(day.holiday).isSame(date));
}

const dateToString = (fecha) => {
    return fecha.format('DD/MMMM/YYYY')
}