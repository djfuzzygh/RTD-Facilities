import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

// This would typically come from your backend
const requests = [
  { id: 1, category: 'Vehicle', description: 'Need a car for airport pickup', status: 'Pending', priority: 'Medium', createdAt: '2023-06-01', contactPerson: 'John Doe' },
  { id: 2, category: 'Flight', description: 'Book flight to London', status: 'Approved', priority: 'High', createdAt: '2023-06-02', contactPerson: 'Jane Smith' },
  { id: 3, category: 'Maintenance', description: 'AC not working in room 201', status: 'In Progress', priority: 'Low', createdAt: '2023-06-03', contactPerson: 'Bob Johnson' },
]

export default function Requests() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-r from-yellow-100 via-orange-200 to-red-200">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Requests</h1>
            <Link href="/requests/new">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">New Request</Button>
            </Link>
          </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>
                      <Badge variant={request.status === 'Approved' ? 'success' : request.status === 'Pending' ? 'warning' : 'default'}>
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

