'use client'

import { omit } from 'lodash'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  width?: string | number
  height?: string | number
}

const CommonButton: React.FC<Props> = (props) => {
  const { children, width = '6rem', height = '2.5rem' } = props
  return (
    <ButtonWrapper width={width} height={height} {...omit(props, ['width', 'height', 'children'])}>
      {children}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button<Props>`
  cursor: pointer;

  margin: 0;
  padding: 0;
  outline: none;

  background-color: transparent;
  border: none;

  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

export default CommonButton
