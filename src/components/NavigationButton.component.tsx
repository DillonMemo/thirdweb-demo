'use client'

import { lg, md } from '@/styles'
import { CSSProperties } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: CSSProperties['width']
  fontWeight?: CSSProperties['fontWeight']
  $isBorder?: boolean
  $colorSet?: string[]
  letterSpacing?: 'normal' | 'tight' | 'wide'
}

const NavigationButton: React.FC<Props> = (props) => {
  const {
    children,
    width,
    fontWeight = 'normal',
    $isBorder = false,
    $colorSet = ['#ffffff', 'var(--primary-color)'],
    letterSpacing = 'normal',
  } = props
  return (
    <ButtonWrapper {...{ width, fontWeight, $isBorder, $colorSet, letterSpacing }}>
      <span className="btn-top"></span>
      <span className="btn-right"></span>
      <span className="btn-bottom"></span>
      <span className="btn-left"></span>
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button<Props>`
  cursor: pointer;

  margin: 0;
  padding: 0 1rem;
  border: none;
  outline: none;

  ${({ $colorSet }) => $colorSet && `color: ${$colorSet[0]}`};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: 1rem;
  font-family: var(--font-pretendard-std);
  text-decoration: none;
  text-align: center;
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing === 'normal' ? 'normal' : letterSpacing === 'tight' ? '-0.625px' : '1.2px'};

  background-color: transparent;

  width: ${({ width }) => width};
  height: 2.375rem;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 0.2s ease;

  ${lg} {
    padding: 0 0.5rem;
    font-size: 0.75rem;
  }

  ${md} {
    padding: 0;
    font-size: 1.125rem;
    height: 1.4375rem;
    color: var(--text-color);

    &:hover {
      padding: 0 0.75rem;
    }
  }

  &:hover {
    ${({ $colorSet }) => $colorSet && `color: ${$colorSet[1]}`};
    font-weight: 500;
    > .btn-right,
    > .btn-left {
      ${({ $isBorder }) =>
        !$isBorder &&
        `
        background: var(--primary-color);
      `}
    }
    span.btn-top,
    span.btn-bottom {
      background: linear-gradient(
        to right,
        var(--primary-color) 10%,
        transparent 10% 90%,
        var(--primary-color) 90%
      );

      ${md} {
        background: linear-gradient(
          to right,
          var(--primary-color) 5%,
          transparent 5% 95%,
          var(--primary-color) 95%
        );
      }
    }
  }

  > span {
    &.btn-top,
    &.btn-right,
    &.btn-bottom,
    &.btn-left {
      position: absolute;
      display: block;
      ${({ $isBorder }) =>
        $isBorder
          ? `
        background: var(--primary-color);
      `
          : `background: transparent`};
    }
    &.btn-top,
    &.btn-bottom {
      width: 100%;
      height: 0.0625rem;
    }
    &.btn-right,
    &.btn-left {
      width: 0.0625rem;
      height: 100%;
    }
    &.btn-top {
      top: 0px;
      left: 0;
    }
    &.btn-right {
      top: 0px;
      right: 0px;
    }
    &.btn-bottom {
      bottom: 0px;
      right: 0px;
    }
    &.btn-left {
      top: 0px;
      left: 0;
    }
  }
`

export default NavigationButton