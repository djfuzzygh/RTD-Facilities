'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// This would typically come from your backend
const initialRequests = [
  { id: 1, category: 'Vehicle', description: 'Need a car for airport pickup', status: 'Pending', priority: 'Medium', createdAt: '2023-06-01', contactPerson: 'John Doe' },
  { id: 2, category: 'Flight', description: 'Book flight to London', status: 'Pending', priority: 'High', createdAt: '2023-06-02', contactPerson: 'Jane Smith' },
  { id: 3, category: 'Maintenance', description: 'AC not working in room 201', status: 'Pending', priority: 'Low', createdAt: '2023-06-03', contactPerson: 'Bob Johnson' },
]

export default function AdminPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null)
  const [approvalNotes, setApprovalNotes] = useState('')

  const handleApprove = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ))
    setSelectedRequest(null)
    setApprovalNotes('')
  }

  const handleReject = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ))
    setSelectedRequest(null)
    setApprovalNotes('')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200">
        <div className="container px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>
                      <Badge variant={request.status === 'Approved' ? 'success' : request.status === 'Pending' ? 'warning' : 'destructive'}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={request.priority === 'High' ? 'destructive' : request.priority === 'Medium' ? 'warning' : 'default'}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.contactPerson}</TableCell>
                    <TableCell>{request.createdAt}</TableCell>
                    <TableCell>
                      {request.status === 'Pending' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setSelectedRequest(request)}>Review</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Review Request</DialogTitle>
                              <DialogDescription>
                                Review and approve or reject the request.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Category</Label>
                                <p>{request.category}</p>
                              </div>
                              <div>
                                <Label>Description</Label>
                                <p>{request.description}</p>
                              </div>
                              <div>
                                <Label htmlFor="approvalNotes">Approval Notes</Label>
                                <Textarea
                                  id="approvalNotes"
                                  value={approvalNotes}
                                  onChange={(e) => setApprovalNotes(e.target.value)}
                                  placeholder="Enter any notes for approval or rejection"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => handleReject(request.id)}>Reject</Button>
                              <Button onClick={() => handleApprove(request.id)}>Approve</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  )
}

