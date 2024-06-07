'use client'

import { ConnectButton, ConnectButtonProps } from 'thirdweb/react'
import { Wallet, inAppWallet } from 'thirdweb/wallets'
import { LocaleType } from '@/i18n'
import { Modal } from 'flowbite-react'
import TestService from '@/service/example/example.service'
import { ThirdwebClient } from 'thirdweb'
import UserProfile from '../../public/svgs/UserProfile'
import { accountState } from '@/recoil/account'
import { base } from 'thirdweb/chains'
// import { createHmac } from 'crypto'
import { debounce } from 'lodash'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { isEditProfileModalState } from '@/recoil/modal'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'

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
  const [account, setAccount] = useRecoilState(accountState)
  const [isEditProfileModal, setIsEditProfileModal] = useRecoilState(isEditProfileModalState)

  /**
   * @description REST API 테스트
   * {@link https://cwdeveloper.tistory.com/61 React-Query Sample}
   * {@link https://soobing.github.io/react/next-app-router-react-query/ React-Query Sample}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error } = useQuery({
    queryKey: ['photos'] as const,
    queryFn: () => TestService.getPhotos(),
  })
  // eslint-disable-next-line no-console
  console.log(data, isLoading, error)

  const onConnect = useCallback(
    debounce(async (wallet: Wallet) => {
      try {
        const address = wallet.getAccount()?.address

        if (address) {
          const email = await getUserEmail({ client })

          if (email) {
            /** @todo hash api request */
            // const hash = createHmac('sha256', 'sevenlinelabs_tipster').update(email).digest('hex')

            setAccount((prev) => ({
              ...prev,
              ...(email && { email, nickname: email.split('@')[0] }),
              wallet,
            }))

            toast.success('Successed connect to wallet')
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
  const onEditProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsEditProfileModal(true)
  }

  /**
   * @example contract
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
                className={`${detailsButton?.className} rounded-xl shadow-[var(--light-primary-color)] dark:shadow-[var(--primary-color)]`}>
                <div
                  className="detail-image-wrap bg-slate-300 dark:bg-gray-600"
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal">
                  <UserProfile />
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
        dismissible
        show={isEditProfileModal}
        position="center"
        theme={{
          content: { base: 'h-auto w-full' },
        }}
        onClose={() => setIsEditProfileModal(false)}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body className="">
          <div className="space-y-6">
            <p>Hello Edit Profile</p>
          </div>
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
