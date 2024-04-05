import { createGlobalStyle } from 'styled-components'

export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`

export const { xxs, xs, sm, md, lg, xl, xxl, _4xl } = {
  xxs: '@media (max-width: 20rem)', // 320px
  xs: '@media (max-width: 32rem)', // 512px
  sm: '@media (max-width: 48rem)', // 768px
  md: '@media (max-width: 62rem)', // 992px
  lg: '@media (max-width: 80rem)', // 1280px
  xl: '@media (max-width: 90rem)', // 1440px
  xxl: '@media (max-width: 120rem)', // 1920px
  _4xl: '@media (max-width: 160rem)', // 2560px
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
    
    --primary-color: #80BAD6;
    --text-color: #A9A9A9;
    --white-opacity-95-bg: rgba(255, 255, 255, 0.05);

    --border-radius: 0.75rem;
  }
  body {
    overscroll-behavior: auto;
    user-select: none;
    color: rgb(var(--foreground-rgb));
    background: linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb));
    /* background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}; */
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};

    &:hover {
    color: ${({ theme }) => theme.text_hover};
    }
  }
  ul {
    list-style: none;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: inherit;
  }
  p {
    margin: 0;
    padding: 0;
  }
  /** 스크롤바 커스텀 */
  ::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(34, 45, 50, 0.5);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 45, 50, 1);
  }
`
