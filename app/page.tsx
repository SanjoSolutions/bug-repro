'use client'

import { useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '@/amplify/data/resource'

const client = generateClient<Schema>()

export default function App() {
  useEffect(function () {
    async function f() {
      const result = await client.queries.retrieveOrganization(
        {},
        {
          authMode: 'identityPool',
        }
      )
      console.log('result', result)
    }

    f()
  }, [])

  return <div></div>
}
