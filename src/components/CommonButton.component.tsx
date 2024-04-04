'use client'

import { CSSProperties } from 'react'
import { omit } from 'lodash'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  fontSize?: CSSProperties['fontSize']
}

const CommonButton: React.FC<Props> = (props) => {
  const { children, width = '6rem', height = '2.5rem' } = props
  return (
    <ButtonWrapper width={width} height={height} {...omit(props, ['width', 'height', 'children'])}>
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

  color: #ffffff;
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  text-decoration: none;
  text-align: center;
  letter-spacing: 1px;

  background-color: transparent;

  width: ${({ width }) => width};
  height: ${({ height }) => height};

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: color 0.2s ease;

  &:hover,
  &:focus {
    color: blueviolet;

    > .btn-top,
    > .btn-bottom {
      height: 0.125rem;
    }
    > .btn-right,
    > .btn-left {
      width: 0.125rem;
    }
    span.btn-top,
    span.btn-bottom {
      background: linear-gradient(to right, #f05d5e 15%, transparent 15% 85%, #f05d5e 85%);
    }
  }

  > span {
    /* transition: background 0.3s ease-in; */

    &.btn-top,
    &.btn-right,
    &.btn-bottom,
    &.btn-left {
      position: absolute;
      display: block;
      background: #f05d5e;
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
