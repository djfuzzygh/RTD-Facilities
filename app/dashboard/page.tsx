'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Car, Plane, Wrench } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useNotifications } from '@/contexts/NotificationContext'

// Sample data - In a real app, this would come from your backend
const analyticsData = [
  { month: 'Jan', approved: 40, pending: 24, declined: 10 },
  { month: 'Feb', approved: 30, pending: 13, declined: 5 },
  { month: 'Mar', approved: 45, pending: 20, declined: 8 },
  { month: 'Apr', approved: 35, pending: 15, declined: 12 },
  { month: 'May', approved: 50, pending: 18, declined: 7 },
  { month: 'Jun', approved: 42, pending: 22, declined: 9 },
]

const staff = [
  { id: '1', name: 'John Doe', department: 'Maintenance' },
  { id: '2', name: 'Jane Smith', department: 'Transportation' },
  { id: '3', name: 'Mike Johnson', department: 'Facilities' },
]

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const { addNotification } = useNotifications()
  const [timeRange, setTimeRange] = useState('6m')

  const handleAssign = (staffMember: typeof staff[0]) => {
    // Here you would typically make an API call to assign the request
    addNotification({
      type: 'assignment',
      message: `Request #${selectedRequest.id} has been assigned to ${staffMember.name}`,
    })
    setSelectedRequest(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-r from-cyan-200 to-blue-300">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="bg-white rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vehicle Requests</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flight Requests</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">-2 from last week</p>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Same as last week</p>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-lg shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">General Inquiries</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Chart */}
          <Card className="bg-white rounded-lg shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Request Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  approved: {
                    label: "Approved",
                    color: "hsl(var(--chart-1))",
                  },
                  pending: {
                    label: "Pending",
                    color: "hsl(var(--chart-2))",
                  },
                  declined: {
                    label: "Declined",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="approved" fill="var(--color-approved)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="declined" fill="var(--color-declined)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Requests with Assignment */}
          <Card className="bg-white rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  { id: 1, title: 'Vehicle Request', status: 'Pending', type: 'Vehicle' },
                  { id: 2, title: 'AC Repair', status: 'Pending', type: 'Maintenance' },
                  { id: 3, title: 'Flight Booking', status: 'Pending', type: 'Flight' },
                ].map((request) => (
                  <div key={request.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">#{request.id} - {request.type}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedRequest(request)}
                        >
                          Assign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Request</DialogTitle>
                          <DialogDescription>
                            Select a staff member to handle this request.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Staff Members</Label>
                            <div className="space-y-2">
                              {staff.map((member) => (
                                <Button
                                  key={member.id}
                                  variant="outline"
                                  className="w-full justify-start"
                                  onClick={() => handleAssign(member)}
                                >
                                  <span>{member.name}</span>
                                  <span className="ml-auto text-sm text-muted-foreground">
                                    {member.department}
                                  </span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

