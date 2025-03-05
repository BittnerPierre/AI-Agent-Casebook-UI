import "./globals.css"
import { Inter } from 'next/font/google'
import { Metadata } from "next"
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Engineering Bootcamp | Learn to Build LLM-Powered Applications",
  description: "Become an AI Engineer in 3 days. Build LLM-powered applications and autonomous AI agents with our comprehensive bootcamp.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}