'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function RequestCompletion() {
  const router = useRouter()

  useEffect(() => {
    // Trigger confetti effect when the component mounts
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-500">Request Submitted!</CardTitle>
            <CardDescription>Your request has been successfully submitted and is being processed.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt="Request submitted illustration" 
                className="mx-auto rounded-lg shadow-md"
              />
            </div>
            <p className="text-gray-600">You will receive a confirmation email shortly with further details.</p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button onClick={() => router.push('/dashboard')} variant="outline">Go to Dashboard</Button>
            <Button onClick={() => router.push('/requests/new')}>Submit Another Request</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

