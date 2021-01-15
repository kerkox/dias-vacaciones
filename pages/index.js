import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <label htmlFor="fecha-inicial">Fecha de inicio de vacaciones</label>
      <input id="fecha-inicial" type="date" />
    </div>
  )
}
