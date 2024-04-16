'use client'

import { lg, md } from '@/styles'
import styled, { css } from 'styled-components'

const headerBackgroundColor = '#0a0f1e'
const translateCss = css`
  user-select: none;
  display: inline-flex;
  align-items: center;
  svg {
    margin-right: 0.125rem;
  }
  span {
    font-size: 0.75rem;
  }
`
export const Navigate = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  /* background-color: ${headerBackgroundColor}; */

  height: var(--header-static-height);

  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);

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
      justify-content: flex-start;
      padding: 0 2.875rem;

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
      .nav-mobile-services {
        display: none;
      }
    }

    .nav-toggle {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;

      &.hamburger {
        width: 1.5rem;
        height: 1.5rem;

        .bar {
          display: block;
          margin: auto;
          width: 100%;
          height: 3px;
          border-radius: 0.3125rem;
          transition: all 0.6s ease;
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
      background: linear-gradient(105deg, transparent 5%, var(--background-second-color) 0%);

      padding-right: 3rem;

      ${lg} {
        padding-right: 1rem;
      }

      > .translate-pc-wrap {
        ${translateCss}
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

        background-color: var(--background-color);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        width: 80%;
        height: 100%;
        padding: 0;
        border-right: 1px solid #333b45;
        transition: left 0.4s;

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
            padding: 0 0 0 1rem;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;

            height: var(--header-static-height);
            max-height: var(--header-static-height);

            box-shadow:
              0 0 #0000,
              0 0 #0000,
              0 1px 3px 0 rgb(0 0 0 / 0.1),
              0 1px 2px -1px rgb(0 0 0 / 0.1);

            .close {
              flex-basis: 5rem;

              height: 100%;
              background: linear-gradient(
                105deg,
                transparent 25%,
                var(--background-second-color) 0%
              );
            }
          }

          .nav-mobile-account {
            display: flex;
            justify-content: center;

            padding: 1rem;
            border-bottom: 1px solid #333b45;
          }
        }

        .nav-list {
          flex: 3;
          flex-direction: column;
          row-gap: 2.5rem;

          padding: 0 1rem;
          margin: 1.5rem 0;
        }

        .nav-mobile-services {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;

          padding: 0 1rem;

          > .translate-mobile-wrap {
            ${translateCss}
            > span {
              font-size: 1rem;
              line-height: 1.5rem;
            }
          }
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
