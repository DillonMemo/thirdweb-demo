'use client'

import { CSSProperties, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: CSSProperties['width']
  fontWeight?: CSSProperties['fontWeight']
  $isBorder?: boolean
  $colorSet?: string[]
  letterSpacing?: 'normal' | 'tight' | 'wide'
}

const NavigationButton: React.FC<Props> = (props) => {
  const { children, className } = props
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>

  useEffect(() => {
    if (buttonRef.current instanceof HTMLButtonElement) {
      buttonRef.current.innerHTML = `
        <div>
          <span>${buttonRef.current.textContent?.trim().split('').join('</span><span>')}</span>
        </div>
      `
    }
  }, [])

  return (
    <ButtonWrapper
      ref={buttonRef}
      className={`${className} text-gray-900  hover:text-[var(--light-primary-color)] dark:text-white dark:hover:text-[var(--primary-color)]`}>
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  --font-size: 1rem;
  --duration: 0.44s;
  --move-hover: -0.25rem;
  --shadow: 0 2px 8px -1px color-mix(in srgb, currentColor 34%, transparent);
  --shadow-hover: 0 4px 20px -2px color-mix(in srgb, currentColor 50%, transparent);
  --font-shadow: var(--font-size);
  --y: var(--move-hover);

  padding: 0 1rem;
  font-weight: 500;
  line-height: var(--font-size);
  /* border-radius: 1.5rem; */

  display: block;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  text-decoration: none;
  font-size: var(--font-size);
  letter-spacing: 0.5px;
  /* box-shadow: var(--shadow); */

  transform: translateY(var(--y)) translateZ(0);
  transition:
    transform var(--duration) ease,
    color var(--duration) ease;

  -webkit-font-smoothing: antialiased;

  &:hover {
    --y: var(--move-hover);
    --shadow: var(--shadow-hover);
    span {
      --m: calc(var(--font-size) * -1);
    }
  }

  &.reverse {
    --font-shadow: calc(var(--font-size) * -1);

    &:hover span {
      --m: calc(var(--font-size));
    }
  }

  div {
    display: flex;
    overflow: hidden;
    text-shadow: 0 var(--font-shadow) 0 currentColor;
  }
  div span {
    display: block;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transition: transform var(--duration) ease;
    transform: translateY(var(--m)) translateZ(0);

    &:nth-child(1) {
      transition-delay: 0.05s;
    }
    &:nth-child(2) {
      transition-delay: 0.1s;
    }
    &:nth-child(3) {
      transition-delay: 0.15s;
    }
    &:nth-child(4) {
      transition-delay: 0.2s;
    }
    &:nth-child(5) {
      transition-delay: 0.25s;
    }
    &:nth-child(6) {
      transition-delay: 0.3s;
    }
    &:nth-child(7) {
      transition-delay: 0.35s;
    }
    &:nth-child(8) {
      transition-delay: 0.4s;
    }
    &:nth-child(9) {
      transition-delay: 0.45s;
    }
    &:nth-child(10) {
      transition-delay: 0.5s;
    }
    &:nth-child(11) {
      transition-delay: 0.55s;
    }
    &:nth-child(12) {
      transition-delay: 0.6s;
    }
    &:nth-child(13) {
      transition-delay: 0.65s;
    }
    &:nth-child(14) {
      transition-delay: 0.7s;
    }
    &:nth-child(15) {
      transition-delay: 0.75s;
    }
    &:nth-child(16) {
      transition-delay: 0.8s;
    }
  }
`

export default NavigationButton
