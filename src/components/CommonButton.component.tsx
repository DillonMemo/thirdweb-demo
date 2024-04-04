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

  > span {
    transition: transform 0.3s ease-in;

    &.btn-top {
      @include span(100%, 4px);
      top: 0;
      left: 0;
    }
  }

  @mixin span($width, $height) {
    position: absolute;
    display: block;
    width: $width;
    height: $height;
    background: #f05d5e;
  }
`

export default CommonButton
