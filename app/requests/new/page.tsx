'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon, Upload } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function NewRequest() {
  const [requestType, setRequestType] = useState('general')
  const [formData, setFormData] = useState({
    requesterName: '',
    phoneNo: '',
    department: '',
    description: '',
    priority: '',
    lineManagerApproval: '',
    mdApproval: '',
    // Vehicle specific
    departureTime: '',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    numberOfPassengers: '',
    destinationOfJourney: '',
    flightDetail: '',
    purposeOfRequest: '',
    // Flight specific
    passengerName: '',
    destination: '',
    businessPurpose: '',
    departmentResponsible: '',
    roundTrip: '',
    // Fault specific
    faultDescription: '',
    faultLocation: '',
    accessDay: null as Date | null,
    timeAccess: '',
    photos: [] as File[]
  })

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Request submitted",
      description: "Your request has been successfully submitted.",
    })
    router.push('/requests/completion')
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: Array.from(e.target.files || [])
      }))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="bg-red-700 text-white">
              <CardTitle>{requestType === 'general' ? 'General Request Form' : 
                         requestType === 'vehicle' ? 'Vehicle Request Form' :
                         requestType === 'flight' ? 'Flight Request Form' :
                         'Fault Maintenance Form'}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={requestType} onValueChange={setRequestType} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                  <TabsTrigger value="flight">Flight</TabsTrigger>
                  <TabsTrigger value="fault">Fault</TabsTrigger>
                </TabsList>

                {/* General Request Form */}
                <TabsContent value="general" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requesterName">Requester Name</Label>
                      <Input
                        id="requesterName"
                        value={formData.requesterName}
                        onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label>Request Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.departureDate || undefined}
                            onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description Of Item Requested</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Vehicle Request Form */}
                <TabsContent value="vehicle" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requesterName">Requester Name</Label>
                      <Input
                        id="requesterName"
                        value={formData.requesterName}
                        onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNo">Phone No.</Label>
                      <Input
                        id="phoneNo"
                        value={formData.phoneNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Departure Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.departureDate || undefined}
                              onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="departureTime">Departure Time</Label>
                        <Input
                          id="departureTime"
                          type="time"
                          value={formData.departureTime}
                          onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="numberOfPassengers">Number Of Passengers</Label>
                      <Input
                        id="numberOfPassengers"
                        type="number"
                        min="0"
                        value={formData.numberOfPassengers}
                        onChange={(e) => setFormData(prev => ({ ...prev, numberOfPassengers: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="destinationOfJourney">Destination Of Journey</Label>
                      <Input
                        id="destinationOfJourney"
                        value={formData.destinationOfJourney}
                        onChange={(e) => setFormData(prev => ({ ...prev, destinationOfJourney: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="purposeOfRequest">Purpose Of The Request</Label>
                      <Textarea
                        id="purposeOfRequest"
                        value={formData.purposeOfRequest}
                        onChange={(e) => setFormData(prev => ({ ...prev, purposeOfRequest: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Flight Request Form */}
                <TabsContent value="flight" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="passengerName">Passenger Name</Label>
                      <Input
                        id="passengerName"
                        value={formData.passengerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, passengerName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNo">Phone No</Label>
                      <Input
                        id="phoneNo"
                        value={formData.phoneNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessPurpose">Business Purpose for Flight?</Label>
                      <Textarea
                        id="businessPurpose"
                        value={formData.businessPurpose}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessPurpose: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Departure Date & Time</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.departureDate ? format(formData.departureDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.departureDate || undefined}
                              onSelect={(date) => setFormData(prev => ({ ...prev, departureDate: date }))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Return Date & Time</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {formData.returnDate ? format(formData.returnDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={formData.returnDate || undefined}
                              onSelect={(date) => setFormData(prev => ({ ...prev, returnDate: date }))}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="roundTrip">Round Trip?</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, roundTrip: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Fault Maintenance Form */}
                <TabsContent value="fault" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requesterName">Requester Name</Label>
                      <Input
                        id="requesterName"
                        value={formData.requesterName}
                        onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNo">Phone No.</Label>
                      <Input
                        id="phoneNo"
                        value={formData.phoneNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNo: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="faultDescription">Fault Description</Label>
                      <Textarea
                        id="faultDescription"
                        value={formData.faultDescription}
                        onChange={(e) => setFormData(prev => ({ ...prev, faultDescription: e.target.value }))}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="faultLocation">Fault Location</Label>
                      <Input
                        id="faultLocation"
                        value={formData.faultLocation}
                        onChange={(e) => setFormData(prev => ({ ...prev, faultLocation: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Access Day For Maintenance Team</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.accessDay ? format(formData.accessDay, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.accessDay || undefined}
                            onSelect={(date) => setFormData(prev => ({ ...prev, accessDay: date }))}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="timeAccess">Time Access For Maintenance Team</Label>
                      <Input
                        id="timeAccess"
                        type="time"
                        value={formData.timeAccess}
                        onChange={(e) => setFormData(prev => ({ ...prev, timeAccess: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="photos">Upload Photo</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Label
                          htmlFor="photos"
                          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 w-full text-center hover:border-gray-400 transition-colors"
                        >
                          <Upload className="h-6 w-6 mx-auto mb-2" />
                          Tap or click to add a picture
                          <Input
                            id="photos"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                        </Label>
                      </div>
                      {formData.photos.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {formData.photos.length} file(s) selected
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">Submit Request</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

