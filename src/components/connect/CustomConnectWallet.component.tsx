'use client'

import AuthService, { SignInResponse } from '@/service/auth/auth.service'
import { ConnectButton, ConnectButtonProps } from 'thirdweb/react'
import { useCallback, useRef, useState } from 'react'
import DetailConnectButton from './DetailConnectButton.component'
import EmptyProfile from '../../../public/images/no-profile.png'
import Image from 'next/image'
import { LocaleType } from '@/i18n'
import { Modal } from 'flowbite-react'
import { ThirdwebClient } from 'thirdweb'
import { accountRefresh } from '@/hooks/useSetAccount'
import { accountState } from '@/recoil/account'
import { base } from 'thirdweb/chains'
import { inAppWallet } from 'thirdweb/wallets'
import { isEditProfileModalState } from '@/recoil/modal'
import styled from 'styled-components'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { useTranslations } from 'next-intl'

interface Props extends Pick<ConnectButtonProps, 'connectButton' | 'detailsButton'> {
  locale: LocaleType
  client: ThirdwebClient
}
export default function CustomConnectWallet({
  client,
  connectButton,
  detailsButton,
  locale,
}: Props) {
  const translate = useTranslations()
  const [isNicknameDisable, setIsNicknameDisable] = useState(true)
  const [account, setAccount] = useRecoilState(accountState)
  const [isEditProfileModal, setIsEditProfileModal] = useRecoilState(isEditProfileModalState)

  const nickNameRef = useRef() as React.MutableRefObject<HTMLInputElement>

  const { mutate: imageUpload } = useMutation({
    mutationFn: (props: { formData: FormData }) => {
      return AuthService.profileImageUpload(props.formData)
    },
    onError: async (error) => {
      console.error('[Error] profile image upload', error)

      const tokens = await accountRefresh(account, {
        token_expired: translate('token_expired'),
        token_refresh: translate('token_refresh'),
      })
      typeof tokens === 'boolean'
        ? setIsEditProfileModal(false)
        : setAccount((prev) => ({
            ...prev,
            accessToken: tokens.accessToken,
            ...(tokens.refreshToken && { refreshToken: tokens.refreshToken }),
          }))
    },
    onSuccess: ({ profileUrl }) => setAccount((prev) => ({ ...prev, profileUrl })),
  })
  const { mutate: editNickName } = useMutation({
    mutationFn: (props: { nickName: SignInResponse['nickName'] }) => {
      return AuthService.editNickName(props.nickName)
    },
    onError: async (error) => {
      console.error('[Error] edit nickname', error)

      const tokens = await accountRefresh(account, {
        token_expired: translate('token_expired'),
        token_refresh: translate('token_refresh'),
      })
      typeof tokens === 'boolean'
        ? setIsEditProfileModal(false)
        : setAccount((prev) => ({
            ...prev,
            accessToken: tokens.accessToken,
            ...(tokens.refreshToken && { refreshToken: tokens.refreshToken }),
          }))

      account.nickName && (nickNameRef.current.value = account.nickName)
    },
    onSuccess: () => setAccount((prev) => ({ ...prev, nickName: nickNameRef.current.value })),
  })

  /**
   * @description 닉네임 수정 클릭 이벤트 핸들러
   */
  const onEditNickname = useCallback(() => {
    if (nickNameRef.current instanceof HTMLInputElement) {
      setIsNicknameDisable(false)
      nickNameRef.current.focus()
    }
  }, [setIsNicknameDisable, nickNameRef])

  /**
   * @description cancle nickName button click handler
   */
  const onClickCancel = useCallback(() => {
    if (nickNameRef.current instanceof HTMLInputElement) {
      setIsNicknameDisable(true)
      nickNameRef.current.value = account.nickName || ''
    }
  }, [account.nickName, nickNameRef])

  /**
   * @description save nickname button click handler
   */
  const onClickSave = useCallback(async () => {
    try {
      if (nickNameRef.current.value) {
        editNickName({ nickName: nickNameRef.current.value })
        setIsNicknameDisable(true)
      }
    } catch (error) {
      console.error('nickname save failed')
    }
  }, [nickNameRef])

  /**
   * @description change profile image button click handler
   */
  const onProfileImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('file', file)

        account.accessToken && imageUpload({ formData })
      }
    },
    [account.accessToken]
  )

  /**
   * @example contract
   * @deprecated
   */
  // setTimeout(async () => {
  //   const contract = getContract({
  //     client,
  //     chain: base,
  //     address: '0xF2d3d488626a117984fda70F8106abC0049018D3',
  //   })
  //   const metadata = await getContractMetadata({ contract })

  //   console.log('timeout', contract, metadata)
  // }, 5000)

  return (
    <>
      <ConnectButton
        client={client}
        chain={base}
        wallets={[inAppWallet({ auth: { options: ['email', 'google'] } })]}
        recommendedWallets={[inAppWallet({ auth: { options: ['email', 'google'] } })]}
        showAllWallets={false}
        // locale={locale === 'ja' ? 'ja_JP' : 'en_US'}
        locale={(locale + '_US') as 'en_US'}
        connectButton={{ ...connectButton, label: translate('sign_in') }}
        detailsButton={{
          ...detailsButton,
          render: () => <DetailConnectButton />,
        }}
        connectModal={{
          size: 'compact',
          title: translate('sign_in'),
          // /** @example */
          // titleIcon: 'https://marineinsurer.co.uk/wp-content/uploads/2020/05/logo-dummy.png',
          titleIcon:
            'https://polygon.miracleplay.gg/static/media/miracle-wallet-logo.fc4f85e929ed4f42ffba971f031e0c0b.svg',
          welcomeScreen: {
            title: 'welcom title',
            subtitle: 'welcome sub title',
          },
        }}
        // onConnect={onConnect}
        autoConnect={{ timeout: 1000 * 60 * 30 }} // 30 minute
      />

      <Modal
        show={isEditProfileModal}
        position="center"
        theme={{
          root: {
            base: 'backdrop-blur-md z-50',
          },
          content: { base: 'h-auto w-full' },
        }}
        onClose={() => setIsEditProfileModal(false)}>
        <Modal.Header>{translate('edit_profile_modal_title')}</Modal.Header>
        <Modal.Body className="">
          <ModalContainer className="space-y-6">
            <div className="avatar-upload">
              <div className="avatar-edit">
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  onChange={onProfileImageUpload}
                />
                <label
                  htmlFor="imageUpload"
                  className="bg-gray-600 hover:border-gray-600 hover:bg-blue-600 dark:bg-gray-200 dark:hover:border-gray-200 dark:hover:bg-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 16 16"
                    className="text-gray-200 dark:text-gray-600">
                    <path
                      fill="currentColor"
                      d="M11.498 5.501a1.002 1.002 0 1 1-2.003 0a1.002 1.002 0 0 1 2.003 0M2 4.5A2.5 2.5 0 0 1 4.5 2h6.998a2.5 2.5 0 0 1 2.5 2.5v1.558a2.6 2.6 0 0 0-1-.023V4.5a1.5 1.5 0 0 0-1.5-1.5H4.5A1.5 1.5 0 0 0 3 4.5v6.998c0 .232.052.451.146.647l3.651-3.651a1.7 1.7 0 0 1 2.404 0l.34.34l-.706.707l-.341-.34a.7.7 0 0 0-.99 0l-3.651 3.65c.196.094.415.147.647.147h1.796l-.25 1H4.5a2.5 2.5 0 0 1-2.5-2.5zm11.263 2.507a1.56 1.56 0 0 0-.927.447L8.05 11.742a2.8 2.8 0 0 0-.722 1.256l-.009.033l-.303 1.211a.61.61 0 0 0 .74.74l1.21-.303a2.8 2.8 0 0 0 1.29-.73l4.288-4.288a1.56 1.56 0 0 0-1.28-2.654"
                    />
                  </svg>
                </label>
              </div>
              <div className="avatar-preview border-gray-600 dark:border-gray-200">
                <Image
                  className="h-full w-full rounded-full"
                  src={
                    account.profileUrl
                      ? `https://static.tipsplay.gg/${account.profileUrl}`
                      : EmptyProfile
                  }
                  alt="empty-profile-image"
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <div className="edit-nickname">
              <input
                type="text"
                ref={nickNameRef}
                name="nickname"
                id="nickname"
                placeholder="Nickname"
                className="w-full border border-gray-300 bg-gray-300 text-gray-900 focus:border-gray-300 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:focus:border-gray-600 disabled:dark:bg-gray-700"
                defaultValue={account.nickName}
                disabled={isNicknameDisable}
              />
              <div className="edit-button-group">
                {isNicknameDisable ? (
                  <button
                    className="bg-gray-600  text-gray-200 hover:bg-blue-600 dark:bg-gray-500 dark:text-white dark:hover:bg-blue-500"
                    onClick={onEditNickname}>
                    {translate('edit_profile_modal_edit_button')}
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-gray-600  text-gray-200 hover:bg-blue-600 dark:bg-gray-500 dark:text-white dark:hover:bg-blue-500"
                      onClick={onClickCancel}>
                      {translate('edit_profile_modal_cancel_button')}
                    </button>
                    <button
                      className="bg-gray-600  text-gray-200 hover:bg-blue-600 dark:bg-gray-500 dark:text-white dark:hover:bg-blue-500"
                      onClick={onClickSave}>
                      {translate('edit_profile_modal_save_button')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </ModalContainer>
        </Modal.Body>
      </Modal>
    </>
  )
}

const ModalContainer = styled.div`
  .avatar-upload {
    position: relative;
    max-width: 6.8125rem;
    margin: 2.125rem auto;

    .avatar-edit {
      position: absolute;
      right: 0.5rem;
      top: 0;
      z-index: 1;

      input {
        display: none;

        & + label {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 1.75rem;
          height: 1.75rem;
          margin-bottom: 0;
          border-radius: 100%;
          border: 1px solid transparent;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          font-weight: normal;
          transition: all 0.2s ease-in-out;

          svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      }
    }

    .avatar-preview {
      width: 6rem;
      height: 6rem;

      position: relative;
      border-radius: 100%;
      border-width: 2px;
      border-style: solid;

      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);

      > div {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }

  .edit-nickname {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;

    height: 2.625rem;
    max-height: 2.625rem;

    > * {
      height: 100%;
    }
    input[type='text'] {
      outline: none;
      border-radius: 0.5rem;

      &:focus {
        box-shadow: none;
      }
      &:disabled {
        cursor: not-allowed;
      }
    }

    .edit-button-group {
      display: flex;
      flex-flow: row nowrap;
      gap: 0.5rem;

      button {
        height: 100%;
        white-space: nowrap;
        padding: 0 1rem;

        border-radius: 0.5rem;

        transition: background-color 0.2s ease-in-out;
      }
    }
  }
`
