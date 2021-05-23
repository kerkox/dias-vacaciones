import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import calcularFecha from '../helpers/getDateFinalVacation';

export default function Home() {

  let fecha_inicial;

  const [inputValue, setInputValue] = useState('')
  const [fechaFinal, setFechaFinal] = useState('')
  const [dias, setDias] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleDiasVacaciones = (e) => {
    setDias(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 2) {
      console.log("inputValue", inputValue)
      let dateValue = inputValue.split('-');
      let date = new Date(dateValue[0], Number(dateValue[1]) - 1, dateValue[2]);
      console.log("date", date)
      console.log("date String", date.toString())
      let { fecha: fecha_resultado, dias } = calcularFecha(date, dias);
      let fecha_texto = dateToString(fecha_resultado);
      setFechaFinal(fecha_texto);
      setDias(dias);
    }
  }
  const dateToString = (fecha) => {
    return fecha.format('DD/MMMM/YYYY')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.grid}>
        <div className={styles.card}>
          <TextField id="fecha_inicial" label="Fecha Inicio Vacaciones" type="date" variant="filled" onChange={handleInputChange} name="fecha_inicial" value=""/>
        </div>
        <div className={styles.card}>
          <TextField id="dias_vacaciones" type="number" label="Cant. Dias Vacaciones" variant="filled" onChange={handleDiasVacaciones} name="dias_vacaciones" value="15" />
        </div>
        <br />
        <Button variant="contained" type="submit" color="primary" >Calcular</Button>
        <br />
      </form>
      <div>
        <p>Dias de vacaciones: <strong>{dias}</strong></p>
        <p>Fecha final de vacaciones: <strong>{fechaFinal}</strong></p>

      </div>

    </div>
  )
}

