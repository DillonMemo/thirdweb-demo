'use client'

import { gql, useQuery } from '@apollo/client'
import CounterStrikeSrc from '../../public/images/counter-strike.png'
import Dota2 from '../../public/images/dota2.png'
import Image from 'next/image'
import LeagueOfLegendsSrc from '../../public/images/league_of_legends.png'
import Valorant from '../../public/images/valorant.png'
import { accountState } from '@/recoil/account'
import dayjs from 'dayjs'
import { some } from 'lodash'
import { useRecoilValue } from 'recoil'
import { useTransition } from 'react'

const GET_ALL_SERIES_IN_NEXT_24_HOURS = gql`
  query GetAllSeriesInNext24Hours($gteDate: String!, $lteDate: String!) {
    allSeries(
      filter: { startTimeScheduled: { gte: $gteDate, lte: $lteDate } }
      orderBy: StartTimeScheduled
    ) {
      totalCount
    }
  }
`

export default function Series() {
  const translate = useTransition()
  const account = useRecoilValue(accountState)

  const { loading, error, data } = useQuery(GET_ALL_SERIES_IN_NEXT_24_HOURS, {
    variables: { gteDate: dayjs().add(-1, 'd').format(), lteDate: dayjs().format() },
  })

  if (some([account.connectionStatus === 'connecting', loading])) {
    return (
      <div className="flex w-full animate-pulse flex-col items-center space-y-4 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-6 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="mb-2.5 h-2.5 w-36 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-2 w-52 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {Array(30)
          .fill(undefined)
          .map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex w-full items-center justify-between pt-4">
              <div>
                <div className="mb-2.5 h-2.5 w-36 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-2 w-52 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-medium">Live-In Play</h1>
      <div className="filter-container mb-2 flex flex-row justify-between lg:flex-col lg:gap-2">
        <div className="button-group flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800  text-center text-sm font-medium text-gray-900 hover:border-[var(--light-primary-color)] hover:bg-[var(--light-primary-color)] hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-[var(--primary-color)] dark:hover:bg-[var(--primary-color)] dark:hover:text-white dark:focus:ring-gray-800">
            ALL
          </button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 text-center text-sm font-medium text-gray-900 hover:border-[var(--light-primary-color)] hover:bg-[var(--light-primary-color)] focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-[var(--primary-color)] dark:hover:bg-[var(--primary-color)] dark:focus:ring-gray-800">
            <Image src={CounterStrikeSrc} alt="counter-strike" width={24} height={24} />
          </button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 text-center text-sm font-medium text-gray-900 hover:border-[var(--light-primary-color)] hover:bg-[var(--light-primary-color)] focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-[var(--primary-color)] dark:hover:bg-[var(--primary-color)] dark:focus:ring-gray-800">
            <Image src={LeagueOfLegendsSrc} alt="league-of-legends" width={24} height={24} />
          </button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 text-center text-sm font-medium text-gray-900 hover:border-[var(--light-primary-color)] hover:bg-[var(--light-primary-color)] focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-[var(--primary-color)] dark:hover:bg-[var(--primary-color)] dark:focus:ring-gray-800">
            <Image src={Dota2} alt="dota2" width={24} height={24} />
          </button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 text-center text-sm font-medium text-gray-900 hover:border-[var(--light-primary-color)] hover:bg-[var(--light-primary-color)] focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-[var(--primary-color)] dark:hover:bg-[var(--primary-color)] dark:focus:ring-gray-800">
            <Image src={Valorant} alt="valorant" width={24} height={24} />
          </button>
        </div>
        <div className="group inline-flex flex-row items-center justify-between gap-2">
          <div>Show only live matches</div>
          <div>day of date</div>
        </div>
      </div>
      <div className="flex w-full divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white p-6 shadow dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-500">
        Hello Series!!
      </div>
    </div>
  )
}
