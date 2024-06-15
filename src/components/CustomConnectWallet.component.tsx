'use client'

import { ConnectButton, ConnectButtonProps } from 'thirdweb/react'
import { Wallet, inAppWallet } from 'thirdweb/wallets'
import { useCallback, useRef, useState } from 'react'
import AuthService from '@/service/auth/auth.service'
import EmptyProfile from '../../public/images/no-profile.png'
import Image from 'next/image'
import { LocaleType } from '@/i18n'
import { Modal } from 'flowbite-react'
import { ThirdwebClient } from 'thirdweb'
import { accountState } from '@/recoil/account'
import { base } from 'thirdweb/chains'
import { createHmac } from 'crypto'
import { debounce } from 'lodash'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { isEditProfileModalState } from '@/recoil/modal'
import styled from 'styled-components'
import { toast } from 'react-toastify'
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

  /**
   * @description REST API 테스트
   * {@link https://cwdeveloper.tistory.com/61 React-Query Sample}
   * {@link https://soobing.github.io/react/next-app-router-react-query/ React-Query Sample}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['photos'] as const,
  //   queryFn: () => TestService.getPhotos(),
  // })

  const { mutate: signIn } = useMutation({
    mutationFn: (props: { walletAddress: string; verifyValue: string }) =>
      AuthService.signIn(props.walletAddress, props.verifyValue),
    onError: () => console.error('error auth'),
    onSuccess:
      /** @todo 타입정의 하기 */
      (res: { accessToken: string; nickName: string; refreshToken: string; userSeq: number }) => {
        debugger
        console.log(res)

        setAccount((prev) => ({
          ...prev,
          nickname: res.nickName,
        }))

        toast.success('Successed connect to wallet')
      },
  })

  const onConnect = useCallback(
    debounce(async (wallet: Wallet) => {
      try {
        const address = wallet.getAccount()?.address

        if (address) {
          const email = await getUserEmail({ client })

          if (email) {
            /** @todo hash api request */
            console.log('env 1', process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY)
            const hash = createHmac('sha256', process.env.NEXT_PUBLIC_CRYPTO_HASH_KEY || '')
              .update(email)
              .digest('hex')

            signIn({ walletAddress: address, verifyValue: hash })
            debugger

            setAccount((prev) => ({ ...prev, ...(email && { email }), wallet }))
          } else throw new SyntaxError('not found email')
        } else throw new SyntaxError('not found address')
      } catch (error) {
        toast.error('Failed connect to wallet', (error as any).message)
        console.error(error)
      }
    }, 300),
    []
  )

  /**
   * @description 프로필 수정 모달 열기 클릭 이벤트 핸들러
   */
  const onEditProfile = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsEditProfileModal(true)
  }, [])

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
   * @description cancle nickname button click handler
   */
  const onClickCancel = useCallback(() => {
    if (nickNameRef.current instanceof HTMLInputElement) {
      setIsNicknameDisable(true)
      nickNameRef.current.value = account.nickname || ''
    }
  }, [account.nickname, nickNameRef])

  /**
   * @description save nickname button click handler
   */
  const onClickSave = useCallback(async () => {
    try {
      setIsNicknameDisable(true)
    } catch (error) {
      console.error('nickname save failed')
    }
  }, [nickNameRef])

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
        connectButton={{ ...connectButton, label: 'Sign in' }}
        detailsButton={{
          ...detailsButton,
          render: () => (
            <>
              <DetailButton
                type="button"
                className={`${detailsButton?.className} rounded-xl shadow-blue-600 dark:shadow-blue-500`}>
                <div
                  className="detail-image-wrap bg-slate-300 dark:bg-gray-600"
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal">
                  <Image
                    src={account.profileImage || EmptyProfile}
                    alt="empty-profile-image"
                    width={40}
                    height={40}
                  />
                  <div
                    className="edit-profile-overlay bg-gray-300 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                    onClick={onEditProfile}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25rem"
                      height="1.25rem"
                      viewBox="0 0 24 24">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844l2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565l6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="detail-profile-wrap">
                  <div className="detail-nickname text-mi text-black dark:text-[#a9a9a9]">
                    {account.nickname}
                  </div>
                  {/* <div className="detail-email text-gray-700 dark:text-[#a9a9a9f7]">
                {account.email}
              </div> */}
                </div>
              </DetailButton>
            </>
          ),
        }}
        connectModal={{
          size: 'compact',
          title: 'Sample Modal Title',
          /** @example */
          titleIcon: 'https://marineinsurer.co.uk/wp-content/uploads/2020/05/logo-dummy.png',
          // titleIcon:
          //   'https://polygon.miracleplay.gg/static/media/miracle-wallet-logo.fc4f85e929ed4f42ffba971f031e0c0b.svg',
          welcomeScreen: {
            title: 'welcom title',
            subtitle: 'welcome sub title',
          },
        }}
        onConnect={onConnect}
        autoConnect={{ timeout: 1000 * 60 * 10 }} // 10 minute
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
                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
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
                  id="imagePreview"
                  src={account.profileImage || EmptyProfile}
                  alt="preview-profile"
                  width={96}
                  height={96}
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
                defaultValue={account.nickname}
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

const DetailButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;

  font-size: 0.875rem;
  font-weight: 500;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 3px var(--tw-shadow-color);
  }

  .detail-image-wrap {
    position: relative;

    overflow: hidden;
    border-radius: 9999px;

    width: 2.5rem;
    height: 2.5rem;

    &:hover {
      .edit-profile-overlay {
        opacity: 1;
      }
    }

    .no-image {
      position: absolute;
      left: -0.25rem;
      height: 3rem;
      width: 3rem;
      /* background-color: currentColor; */
    }

    .edit-profile-overlay {
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 0.75rem;

      opacity: 0;
      transition-property: opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
  }

  .detail-profile-wrap {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    .detail-nickname {
      font-size: 1rem;
      line-height: 1.25rem;
    }
    /* .detail-email {
      font-size: 0.75rem;
      line-height: 1.125rem;
    } */
  }
`

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
