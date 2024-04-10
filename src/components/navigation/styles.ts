'use client'

import { lg, md } from '@/styles'
import styled from 'styled-components'

const headerHeight = '5rem'
const headerBackgroundColor = '#0a0f1e'
export const Navigate = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${headerBackgroundColor};

  height: ${headerHeight};

  z-index: 100;
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    height: 100%;
    padding: 0 0 0 3rem;

    ${lg} {
      padding: 0 0 0 1rem;
    }

    .nav-logo {
      .logo {
        color: hsl(28, 88%, 62%);
        transition: color 0.4s;
        font-size: 1.25rem;
      }
    }

    .nav-menu {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5rem;

      ${lg} {
        padding: 0 1.5rem;
      }

      .nav-mobile-profile {
        display: none;
      }
      .nav-list {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;

        .nav-item {
          .nav-link {
            color: hsl(0, 0%, 95%);
            transition: color 0.4s;

            &:hover {
              color: hsl(28, 88%, 62%);
            }
          }
        }
      }
    }

    .nav-toggle {
      display: none;
      font-size: 1.5rem;
      color: hsl(0, 0%, 95%);
      cursor: pointer;

      &.hamburger {
        width: 1.5rem;
        height: 1.5rem;

        .bar {
          display: block;
          margin: auto;
          background-color: white;
          width: 100%;
          height: 3px;
          border-radius: 0.3125rem;
          transition: all 0.5s ease;
        }

        &:hover {
          .bar:first-child {
            transform: translateY(-1px);
          }
          .bar:last-child {
            transform: translateY(1px);
          }
        }

        &.is-opened {
          .bar {
            &:first-child {
              transform: translateY(10px) rotate(45deg);
            }
            &:nth-child(2) {
              transform: scaleX(0);
            }
            &:last-child {
              transform: translateY(-6px) rotate(-45deg);
            }
          }
        }
      }
    }

    .nav-pc-profile {
      flex-basis: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1.5rem;

      height: 100%;
      background: linear-gradient(105deg, transparent 5%, #191f31 0%);

      padding-right: 3rem;

      ${lg} {
        padding-right: 1rem;
      }

      > .translate-wrap {
        user-select: none;
        display: inline-flex;
        align-items: center;
        svg {
          margin-right: 0.125rem;
        }
        span {
          font-size: 0.75rem;
        }
      }
      > .profile-wrap {
      }
    }
  }
  // Mobile
  ${md} {
    .nav {
      padding: 0 1rem;

      &:has(> .nav-menu.show-menu) {
        width: 80%;
      }

      .nav-menu {
        display: flex;
        flex-flow: column nowrap;
        align-items: initial;
        justify-content: flex-start;

        background-color: #0d1426;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        width: 80%;
        height: 100%;
        padding: 0;
        transition: right 0.4s;

        position: fixed;
        top: 0;
        &:not(.show-menu) {
          left: -100%;
        }
        &.show-menu {
          left: 0;
        }

        .nav-mobile-profile {
          display: block;

          .nav-mobile-header {
            height: ${headerHeight};
            max-height: ${headerHeight};

            background-color: ${headerBackgroundColor};
          }
        }

        .nav-list {
          flex-direction: column;
          row-gap: 2.5rem;
        }
      }

      .nav-pc-profile {
        display: none;
      }
      .nav-toggle.hamburger {
        display: inline-flex;
        flex-flow: column nowrap;
      }
    }
  }
`
