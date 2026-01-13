import dayjs, { Dayjs } from 'dayjs';
import * as Holidays from 'colombia-holidays';

interface CalculateResult {
  fecha: Dayjs;
  dias: number;
}

interface Holiday {
  holiday: string;
  [key: string]: any;
}

export default function calcularFecha(
  fechaBaseInput: string | Date | Dayjs, 
  cantidadDiasVacaciones: number = 15
): CalculateResult {
  let fechaBase = dayjs(fechaBaseInput);
  const year = fechaBase.year();
  const festivos: Holiday[] = Holidays.getColombiaHolidaysByYear(year);

  // Empezamos desde el día siguiente a la fecha inicial
  for (let x = 1; x <= cantidadDiasVacaciones; x++) {
    fechaBase = fechaBase.add(1, 'd');
    while (!isWorkDay(festivos, fechaBase)) {
      fechaBase = fechaBase.add(1, 'd');
    }
  }
  
  const dias = daysBetween(dayjs(fechaBaseInput), fechaBase);
  return { fecha: fechaBase, dias };
}

const daysBetween = (fechaInicial: Dayjs, fechaFinal: Dayjs): number => {
  return fechaFinal.diff(fechaInicial, 'days');
}

const isWorkDay = (festivos: Holiday[], date: Dayjs): boolean => {
  const day = Number(date.format('d'));
  if (day === 0 || day === 6) {
    return false;
  }
  return !isHoliday(festivos, date);
}

const isHoliday = (festivos: Holiday[], date: Dayjs): boolean => {
  return festivos.some(day => dayjs(day.holiday).isSame(date));
}

export const dateToString = (fecha: Dayjs): string => {
  return fecha.format('DD/MMMM/YYYY');
}
