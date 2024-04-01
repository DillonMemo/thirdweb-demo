import { Fragment } from 'react'
import Slider from '@/components/Slider'
import styles from './page.module.css'

export default function Home() {
  return (
    <Fragment>
      <main className={styles.main}>
        <Slider />
      </main>
    </Fragment>
  )
}
