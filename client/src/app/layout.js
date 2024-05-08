import './globals.css'
import { Roboto_Slab, PT_Sans } from 'next/font/google'
import Header from '@/components/header'

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

const pt_sans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata = {
  title: 'Media Share',
  description: 'App to share your media',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pt_sans.className} ${roboto_slab.className}`}>
      <body>
        <div className='bg-gray-100 min-h-screen'>
          <div className='container mx-auto'>
            <Header />
            <main className='mt-12'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
