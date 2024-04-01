'use client'

import styled from 'styled-components'

export const HeaderWrap = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  color: #fff;
  z-index: 1000;
  height: 4rem;
  line-height: 4rem;
  overflow: hidden;
  -webkit-transition: height 0.3s;
  -moz-transition: height 0.3s;
  transition: height 0.3s;
  text-align: center;

  .right {
    height: 100%;
    padding: 0 1.5rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    .connect-wallet-button {
      font-size: 1rem;
      color: #ffffff;
      background-color: transparent;
      border: 2px solid #ffffff;

      width: fit-content;
      min-width: fit-content !important;
      height: 2.5rem;
      line-height: 1rem;
      padding: 0 1.5rem;

      transition: border-color 0.3s ease, color 0.3s ease !important;

      &.tw-connected-wallet {
        height: 2.75rem;
        img {
          width: 1.5rem !important;
          height: 1.5rem !important;
        }
        > div {
          gap: 0.1875rem !important;
          .tw-connected-wallet__address {
            font-size: 0.75rem;
          }
          .tw-connected-wallet__balance {
            font-size: 0.625rem;
            color: lightgray;
          }
        }
      }
      &:hover,
      &:focus {
        border-color: lightgray;
        color: lightgray;
      }
      svg {
        circle {
          stroke: #ffffff;
        }
      }
    }
  }
`
