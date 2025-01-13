'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import api from '@/lib/api'
import { useToast } from "@/components/ui/use-toast"

interface Request {
  id: number
  category: string
  description: string
  status: string
  priority: string
  createdAt: string
  contactPerson: string
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests')
      setRequests(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch requests",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Requests</h1>
          <Link href="/requests/new">
            <Button>New Request</Button>
          </Link>
        </div>
        
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Contact Person</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell>
                    <Badge variant={
                      request.status === 'Pending' ? 'default' :
                      request.status === 'Approved' ? 'success' :
                      request.status === 'Rejected' ? 'destructive' : 'secondary'
                    }>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      request.priority === 'High' ? 'destructive' :
                      request.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {request.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{request.contactPerson}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  )
}

