'use client'

import { ConnectButton, ConnectButtonProps } from 'thirdweb/react'
import { Wallet, inAppWallet } from 'thirdweb/wallets'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { LocaleType } from '@/i18n'
import { ThirdwebClient } from 'thirdweb'
import UserProfile from '../../public/svgs/UserProfile'
import { accountState } from '@/recoil/account'
import { base } from 'thirdweb/chains'
// import { createHmac } from 'crypto'
import { debounce } from 'lodash'
import { defaultPalette } from '@/styles'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { isEditProfileModalState } from '@/recoil/modal'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useCallback } from 'react'

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
  const setIsEditProfileModal = useSetRecoilState(isEditProfileModalState)

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
          <DetailButton className={`${detailsButton?.className} rounded-xl`}>
            <div className="detail-image-wrap">
              <UserProfile />
            </div>
            <div className="detail-profile-wrap">
              <div className="detail-nickname text-black dark:text-[#a9a9a9]">
                {account.nickname}
              </div>
              <div className="detail-email text-gray-700 dark:text-[#a9a9a9f7]">
                {account.email}
              </div>
            </div>
            <div
              className="edit-profile rounded-xl p-2 text-gray-600 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600"
              onClick={onEditProfile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
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
          </DetailButton>
        ),
      }}
      connectModal={{
        size: 'wide',
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
  )
}

const DetailButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  height: 3.5rem;
  padding: 0 1rem;

  border: 1px solid ${defaultPalette.default};

  .detail-image-wrap {
    display: contents;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
    .detail-image {
      object-fit: contain;
      width: 100%;
      height: 100%;
      user-select: none;
      visibility: visible;
      opacity: 1;
      transition: opacity 0.4s ease 0s;
      border-radius: 8px;
    }
  }

  .detail-profile-wrap {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    .detail-nickname {
      font-size: 0.875rem;
      line-height: 1.125rem;
    }
    .detail-email {
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
  }
`
