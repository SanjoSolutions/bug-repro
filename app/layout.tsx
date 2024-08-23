import type { Metadata } from 'next'
import '@aws-amplify/ui-react/styles.css'
import { ConfigureAmplifyClientSide } from '@/components/ConfigureAmplify'

export const metadata: Metadata = {
  title: 'Repro',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-100'>
      <body>
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  )
}
