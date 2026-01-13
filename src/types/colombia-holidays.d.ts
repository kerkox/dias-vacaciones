declare module 'colombia-holidays' {
  interface Holiday {
    holiday: string;
    name: string;
    date: string;
    [key: string]: any;
  }

  export function getColombiaHolidaysByYear(year: number): Holiday[];
  export function getColombiaHolidays(): Holiday[];
}
