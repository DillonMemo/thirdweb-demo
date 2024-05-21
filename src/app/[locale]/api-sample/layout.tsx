import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'

const query = gql`
  query SeriesFormats {
    seriesFormats {
      id
      name
      nameShortened
    }
  }
`
export default async function TestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const client = getClient()

  const { data } = await client.query({
    query,
  })

  console.warn('test', data)

  return children
}
