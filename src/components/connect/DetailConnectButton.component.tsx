import { useRecoilValue, useSetRecoilState } from 'recoil'
import EmptyProfile from '../../../public/images/no-profile.png'
import Image from 'next/image'
import { accountState } from '@/recoil/account'
import { isEditProfileModalState } from '@/recoil/modal'
import { md } from '@/styles'
import styled from 'styled-components'
import { useCallback } from 'react'
import { useDisconnect } from 'thirdweb/react'
import { useTranslations } from 'next-intl'

export default function DetailConnectButton() {
  const translate = useTranslations()

  const account = useRecoilValue(accountState)
  const setIsEditProfileModal = useSetRecoilState(isEditProfileModalState)
  const { disconnect } = useDisconnect()

  /**
   * @description 프로필 수정 모달 열기 클릭 이벤트 핸들러
   */
  const onClickEditProfile = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation()
    setIsEditProfileModal(true)
  }, [])

  const onClickSignout = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation()
    account.wallet && disconnect(account.wallet)
  }, [])

  return (
    <Dropdown role="navigation">
      <ul>
        <li>
          <button aria-haspopup="true" onClick={(e) => e.stopPropagation()}>
            <Image
              className="max-h-10 max-w-10 rounded-full"
              src={
                account.profileUrl
                  ? `https://static.tipsplay.gg/${account.profileUrl}`
                  : EmptyProfile
              }
              alt="empty-profile-image"
              width={40}
              height={40}
            />
          </button>
          <ul
            className="dropdown header cursor-default border-b border-solid border-b-[#b8bcc3] bg-gray-300 dark:border-b-slate-600 dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}>
            <li className="text-gray-700 dark:text-gray-200">
              <p className="text-sm md:text-xs">{account.nickName}</p>
              <p className="text-xs md:text-[10px]">{account.email}</p>
            </li>
          </ul>
          <ul
            className="dropdown bg-gray-300 dark:bg-gray-700"
            aria-label="submenu"
            onClick={onClickEditProfile}>
            <li className="focus-within:bg-gray-400 hover:bg-gray-400 dark:focus-within:bg-gray-600 dark:hover:bg-gray-600">
              <button className="text-gray-700 dark:text-gray-200" type="button">
                {translate('edit_profile_modal_title')}
              </button>
            </li>
          </ul>
          <ul className="dropdown border-b border-solid border-b-[#b8bcc3] bg-gray-300 dark:border-b-slate-600 dark:bg-gray-700">
            <li className="focus-within:bg-gray-400 hover:bg-gray-400 dark:focus-within:bg-gray-600 dark:hover:bg-gray-600">
              <button className="text-gray-700 dark:text-gray-200" type="button">
                {translate('my_wallet_button')}
              </button>
            </li>
          </ul>
          <ul className="dropdown bg-gray-300 dark:bg-gray-700" onClick={onClickSignout}>
            <li className="focus-within:bg-gray-400 hover:bg-gray-400 dark:focus-within:bg-gray-600 dark:hover:bg-gray-600">
              <button className="text-gray-700 dark:text-gray-200" type="button">
                {translate('sign_out')}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </Dropdown>
  )
}

const Dropdown = styled.nav`
  ul li ul li {
    clear: both;
    width: 100%;
  }
  > ul:not(.dropdown) {
    list-style: none;
    margin: 0;
    padding-left: 0;

    > li {
      max-width: 2.5rem;
      max-height: 2.5rem;
      background: transparent;

      display: block;
      float: left;

      position: relative;
      text-decoration: none;
      transition-duration: 0.5s;

      &:hover,
      &:focus-within {
        cursor: pointer;

        button {
          outline: none;
        }

        > .dropdown {
          visibility: visible;
          opacity: 1;
          display: block;
        }
      }

      .dropdown {
        visibility: hidden;
        opacity: 0;
        min-width: 5rem;
        width: 12.5rem;
        height: 2.5rem;
        position: relative;
        inset: auto auto auto -9rem;
        transition: all 0.5s ease;

        display: none;
        z-index: 9;

        &.header {
          height: auto;

          > li {
            display: inline-flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            padding: 1rem;

            p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              line-height: 1rem;
            }
          }
        }

        &:first-of-type {
          border-top-right-radius: 0.5rem;
          border-top-left-radius: 0.5rem;

          li {
            &:hover,
            &:focus-within {
              border-top-right-radius: 0.5rem;
              border-top-left-radius: 0.5rem;
            }
          }
        }
        &:last-of-type {
          border-bottom-right-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;

          li {
            &:hover,
            &:focus-within {
              border-bottom-right-radius: 0.5rem;
              border-bottom-left-radius: 0.5rem;
            }
          }
        }

        ${md} {
          left: 0;
        }

        &:hover,
        &:focus {
          visibility: visible;
          opacity: 1;
          display: block;
        }

        li {
          height: 100%;
          display: inline-flex;
          align-items: center;
          padding: 0 1rem;

          > button {
            font-size: 0.875rem;

            ${md} {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
`
