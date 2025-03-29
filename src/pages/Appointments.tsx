
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock appointment data
  const appointments = {
    upcoming: [
      {
        id: "1",
        doctor: "Dr. Sarah Johnson",
        specialty: "General Physician",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format",
        date: "June 28, 2023",
        time: "10:30 AM",
        location: "University Health Center",
        status: "confirmed",
        type: "Regular Checkup"
      },
      {
        id: "2",
        doctor: "Dr. Michael Chen",
        specialty: "Dermatologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format",
        date: "July 5, 2023",
        time: "2:00 PM",
        location: "Medical Arts Building",
        status: "pending",
        type: "Skin Consultation"
      },
      {
        id: "3",
        doctor: "Dr. Emily Rodriguez",
        specialty: "Psychiatrist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500&auto=format",
        date: "July 10, 2023",
        time: "11:15 AM",
        location: "Mental Health Clinic",
        status: "confirmed",
        type: "Therapy Session"
      }
    ],
    past: [
      {
        id: "4",
        doctor: "Dr. Sarah Johnson",
        specialty: "General Physician",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format",
        date: "May 15, 2023",
        time: "9:00 AM",
        location: "University Health Center",
        status: "completed",
        type: "Annual Physical"
      },
      {
        id: "5",
        doctor: "Dr. James Wilson",
        specialty: "Dentist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500&auto=format",
        date: "April 20, 2023",
        time: "1:30 PM",
        location: "Dental Care Center",
        status: "completed",
        type: "Dental Cleaning"
      },
      {
        id: "6",
        doctor: "Dr. Michael Chen",
        specialty: "Dermatologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500&auto=format",
        date: "March 8, 2023",
        time: "11:00 AM",
        location: "Medical Arts Building",
        status: "cancelled",
        type: "Skin Check"
      }
    ]
  };

  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800"
  };

  const filteredAppointments = (type: "upcoming" | "past") => {
    return appointments[type].filter(appointment => {
      // Filter by search query
      const matchesSearch = 
        appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || 
        appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by status
      const matchesStatus = filterStatus === "all" || appointment.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <PageContainer>
      <div className="container px-4 py-6 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">Manage your healthcare appointments</p>
          </div>
          <Button asChild>
            <Link to="/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctor, specialty..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {filteredAppointments("upcoming").length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No upcoming appointments found.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/appointments/new">Schedule An Appointment</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments("upcoming").map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge className={`${statusColors[appointment.status as keyof typeof statusColors]} px-2 py-1 text-xs capitalize`}>
                          {appointment.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {appointment.type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.image} alt={appointment.doctor} />
                          <AvatarFallback>{appointment.doctor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                        <Button size="sm" className="flex-1" asChild>
                          <Link to={`/appointments/${appointment.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {filteredAppointments("past").length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No past appointments found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments("past").map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge className={`${statusColors[appointment.status as keyof typeof statusColors]} px-2 py-1 text-xs capitalize`}>
                          {appointment.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {appointment.type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.image} alt={appointment.doctor} />
                          <AvatarFallback>{appointment.doctor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-start">
                          <svg className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      {appointment.status === "completed" ? (
                        <Button size="sm" className="w-full" asChild>
                          <Link to={`/appointments/${appointment.id}`}>View Summary</Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/appointments/${appointment.id}`}>View Details</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Appointments;
