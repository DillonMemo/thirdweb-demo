'use client'
import styled from 'styled-components'
import styles from '../app/[locale]/page.module.css'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'

export default function Slider() {
  const translate = useTranslations()

  console.warn('lang', translate('test'))
  const onClickButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { target } = e
    const slider = document.querySelector('.slider')
    const items = document.querySelectorAll('.page_item__hRoyi')
    if (target instanceof HTMLButtonElement && slider instanceof HTMLUListElement) {
      target.matches('.next') && slider.append(items[0])
      target.matches('.prev') && slider.prepend(items[items.length - 1])
    }
  }, [])
  return (
    <section className={styles.section}>
      <ul className="slider">
        <ListItem
          className={[styles.item].join(' ')}
          style={
            {
              // backgroundImage: "url('https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg')",
            }
          }>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;Lossless Youths&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.{' '}
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
        <ListItem
          className={[styles.item].join(' ')}
          style={
            {
              // backgroundImage: "url('https://i.redd.it/tc0aqpv92pn21.jpg')",
            }
          }>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;Estrange Bond&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.{' '}
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
        <ListItem
          className={[styles.item].join(' ')}
          style={
            {
              // backgroundImage: "url('https://wharferj.files.wordpress.com/2015/11/bio_north.jpg')",
            }
          }>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;The Gate Keeper&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.{' '}
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
        <ListItem
          className={[styles.item].join(' ')}
          style={
            {
              // backgroundImage: "url('https://images7.alphacoders.com/878/878663.jpg')",
            }
          }>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;Last Trace Of Us&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
        <ListItem
          className={[styles.item].join(' ')}
          style={
            {
              // backgroundImage:
              //   "url('https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg')",
            }
          }>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;Urban Decay&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
        <ListItem
          className={[styles.item].join(' ')}
          style={{
            backgroundImage: "url('https://da.se/app/uploads/2015/09/simon-december1994.jpg')",
          }}>
          <div className={[styles.content, 'content'].join(' ')}>
            <h2 className={styles.title}>&quot;The Migration&quot;</h2>
            <p className={styles.description}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum,
              iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.{' '}
            </p>
            <button className={styles.read_button}>Start</button>
          </div>
        </ListItem>
      </ul>
      <nav className={styles.nav}>
        <button className="btn prev" name="arrow-back-outline" onClick={onClickButton}>
          ←
        </button>
        <button className="btn next" name="arrow-forward-outline" onClick={onClickButton}>
          →
        </button>
      </nav>
    </section>
  )
}

const ListItem = styled.li`
  width: 200px;
  height: 300px;
  list-style-type: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 20px 30px rgba(255, 255, 255, 0.3) inset;
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s;

  @media (max-width: 700px) {
    width: 130px;
    height: 220px;
  }

  @media (min-width: 701px) and (max-width: 1120px) {
    width: 160px;
    height: 270px;
  }

  &:nth-child(1),
  &:nth-child(2) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: none;
    border-radius: 0;
    box-shadow: none;
    opacity: 1;
  }

  &:nth-child(3) {
    left: 50%;
  }
  &:nth-child(4) {
    left: calc(50% + 220px);

    @media (max-width: 700px) {
      left: calc(50% + 140px);
    }

    @media (min-width: 701px) and (max-width: 1120px) {
      left: calc(50% + 170px);
    }
  }
  &:nth-child(5) {
    left: calc(50% + 440px);

    @media (max-width: 700px) {
      left: calc(50% + 280px);
    }

    @media (min-width: 701px) and (max-width: 1120px) {
      left: calc(50% + 340px);
    }
  }
  &:nth-child(6) {
    left: calc(50% + 660px);
    opacity: 0;

    @media (max-width: 700px) {
      left: calc(50% + 420px);
    }

    @media (min-width: 701px) and (max-width: 1120px) {
      left: calc(50% * 510px);
    }
  }

  &:nth-of-type(2) .content {
    display: block;
    animation: show 0.75s ease-in-out 0.3s forwards;
  }

  @keyframes show {
    0% {
      filter: blur(5px);
      transform: translateY(calc(-50% + 75px));
    }
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }
`
