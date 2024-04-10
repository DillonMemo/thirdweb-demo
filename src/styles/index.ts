export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`

export const { xxs, xs, sm, md, lg, xl, xxl } = {
  xxs: '@media (max-width: 32rem)', // 512px
  xs: '@media (max-width: 38rem)', // 608px
  sm: '@media (max-width: 48rem)', // 768px
  md: '@media (max-width: 62rem)', // 992px
  lg: '@media (max-width: 80rem)', // 1280px
  xl: '@media (max-width: 90rem)', // 1440px
  xxl: '@media (max-width: 120rem)', // 1920px
}

type LightnessName =
  | 'background'
  | 'accent1'
  | 'accent2'
  | 'accent3'
  | 'accent4'
  | 'accent5'
  | 'accent6'
  | 'default'
  | 'accent8'
  | 'foreground'
  | 'grey'

export const defaultPalette: Record<LightnessName, string> = {
  /** Default */
  background: '#FFFFFF',
  accent1: '#D6D6D6',
  accent2: '#BCBCBC',
  accent3: '#A3A3A3',
  accent4: '#8A8A8A',
  accent5: '#707070',
  accent6: '#58595b',
  default: '#3D3D3D',
  accent8: '#242424',
  foreground: '#000000',
  grey: '#888888',
}

/**
 * key: _xx(%) percent
 * value: convert to hex
 */
export const opacityHex = {
  _0: '00',
  _10: '16',
  _20: '32',
  _30: '48',
  _40: '64',
  _50: '80',
  _60: '96',
  _70: 'aa',
  _80: 'cc',
  _90: 'ee',
}
