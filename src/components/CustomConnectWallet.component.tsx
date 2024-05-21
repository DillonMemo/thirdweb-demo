'use client'

import { ConnectButton, ConnectButtonProps } from 'thirdweb/react'
import { Wallet, inAppWallet } from 'thirdweb/wallets'
import { LocaleType } from '@/i18n'
import { ThirdwebClient } from 'thirdweb'
import UserProfile from '../../public/svgs/UserProfile'
import { accountState } from '@/recoil/account'
import { defaultPalette } from '@/styles'
import { getUserEmail } from 'thirdweb/wallets/embedded'
import { polygon } from 'thirdweb/chains'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
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

  const onConnect = useCallback(async (wallet: Wallet) => {
    try {
      const email = await getUserEmail({ client })
      setAccount((prev) => ({
        ...prev,
        ...(email && { email, nickname: email.split('@')[0] }),
        wallet,
      }))

      toast.success('Successed connect to wallet')
    } catch (error) {
      toast.error('Failed connect to wallet')
      console.error(error)
    }
  }, [])

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
      chain={polygon}
      wallets={[inAppWallet({ auth: { options: ['email', 'google'] } })]}
      recommendedWallets={[inAppWallet({ auth: { options: ['email', 'google'] } })]}
      showAllWallets={false}
      locale={locale === 'ja' ? 'ja_JP' : 'en_US'}
      connectButton={{ ...connectButton, label: 'Sign in' }}
      detailsButton={{
        ...detailsButton,
        render: () => (
          <DetailButton className={`${detailsButton?.className} rounded-xl`}>
            <div className="detail-image-wrap">
              <UserProfile />
            </div>
            <div className="detail-profile-wrap">
              <div className="detail-nickname">{account.nickname}</div>
              <div className="detail-email">{account.email}</div>
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
      color: rgba(169, 169, 169, 1);
      font-size: 0.875rem;
      line-height: 1.125rem;
    }
    .detail-email {
      color: rgba(169, 169, 169, 0.5);
      font-size: 0.75rem;
      line-height: 1.125rem;
    }
  }
`
