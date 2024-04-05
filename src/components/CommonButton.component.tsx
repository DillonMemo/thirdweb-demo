'use client'

import { CSSProperties } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  fontSize?: CSSProperties['fontSize']
  fontWeight?: CSSProperties['fontWeight']
  isBorder?: boolean
}

const CommonButton: React.FC<Props> = (props) => {
  const {
    children,
    width = '6rem',
    height = '2.5rem',
    fontSize,
    fontWeight = 'normal',
    isBorder = false,
    color,
  } = props
  return (
    <ButtonWrapper {...{ width, height, fontSize, fontWeight, isBorder, color }}>
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
  padding: 0;
  border: none;
  outline: none;

  color: ${({ color }) => (color ? color : `var(--primary-color)`)};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  text-decoration: none;
  text-align: center;
  letter-spacing: 0;

  background-color: transparent;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 0.2s ease;

  &:hover {
    > .btn-top,
    > .btn-bottom {
      height: 0.09375rem;
    }
    > .btn-right,
    > .btn-left {
      width: 0.09375rem;

      ${({ isBorder }) =>
        !isBorder &&
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
    }
  }

  > span {
    &.btn-top,
    &.btn-right,
    &.btn-bottom,
    &.btn-left {
      position: absolute;
      display: block;
      ${({ isBorder }) =>
        isBorder
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

export default CommonButton
