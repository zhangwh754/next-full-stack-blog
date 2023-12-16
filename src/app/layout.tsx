import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next博客',
  description: 'Next+tailwindcss全栈博客',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
