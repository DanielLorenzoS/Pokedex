import Image from 'next/image'
import styles from './page.module.css'
import CardPokemon from './components/CardPokemon'
import FetchPokemon from './components/FetchPokemon'
import Nav from './nav/Nav'


export default function Home() {
  return (
    <main className={styles.main}>
      <Nav />
      <FetchPokemon />
    </main>
  )
}
