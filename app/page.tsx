import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to Right to Dream Facilities
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Streamline your facility management with our intuitive platform. Manage requests, track progress, and optimize operations.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">Go to Dashboard</Button>
                </Link>
                <Link href="/requests/new">
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600">New Request</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

