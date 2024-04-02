'use client'

import styled from 'styled-components'

export const Navigate = styled.header`
  @media screen and (min-width: 1150px) {
    .nav {
      .nav-list {
        flex-direction: row;
        column-gap: 2.5rem;
      }
    }
  }

  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 100;
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    height: calc(3.5rem + 1rem);
    padding: 1rem;

    background-color: lightgray;

    .nav-logo {
      color: hsl(28, 88%, 62%);
      transition: color 0.4s;
      font-size: 1.25rem;
    }

    .nav-menu {
      .nav-mobile-profile {
        display: none;
      }
      .nav-list {
        display: flex;

        .nav-item {
          .nav-link {
            color: hsl(0, 0%, 95%);
            font-weight: 600;
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
    }

    .hamburger {
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
  // Mobile + Tablat
  @media (max-width: 1150px) {
    .nav {
      height: 3.5rem;
      .nav-menu {
        background-color: lightblue;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        width: 80%;
        height: 100%;
        padding: 6rem 3rem 0;
        transition: right 0.4s;

        position: fixed;
        top: 0;
        &:not(.show-menu) {
          right: -100%;
        }
        &.show-menu {
          right: 0;
        }

        .nav-mobile-profile {
          display: block;
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
