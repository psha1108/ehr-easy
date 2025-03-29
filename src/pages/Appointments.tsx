
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Filter, Plus, Search, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  dateTime: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
}

const Appointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (!loginStatus) {
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Simulate loading data
    setTimeout(() => {
      const mockAppointments: Appointment[] = [
        {
          id: "1",
          doctorName: "Dr. Sarah Johnson",
          specialty: "General Practitioner",
          dateTime: "June 15, 2023 • 10:30 AM",
          status: "upcoming",
          location: "University Health Center, Room 302",
        },
        {
          id: "2",
          doctorName: "Dr. Michael Chen",
          specialty: "Dermatologist",
          dateTime: "June 22, 2023 • 2:15 PM",
          status: "upcoming",
          location: "Medical Arts Building, Suite 105",
        },
        {
          id: "3",
          doctorName: "Dr. Robert Wilson",
          specialty: "Psychologist",
          dateTime: "May 30, 2023 • 3:00 PM",
          status: "completed",
          location: "Student Wellness Center, Room 210",
        },
        {
          id: "4",
          doctorName: "Dr. Lisa Garcia",
          specialty: "Nutritionist",
          dateTime: "May 10, 2023 • 11:45 AM",
          status: "completed",
          location: "University Health Center, Room 145",
        },
        {
          id: "5",
          doctorName: "Dr. James Miller",
          specialty: "General Practitioner",
          dateTime: "April 25, 2023 • 9:15 AM",
          status: "cancelled",
          location: "University Health Center, Room 302",
        },
      ];
      
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  // Filter appointments based on search query and filters
  useEffect(() => {
    let filtered = [...appointments];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          appointment.doctorName.toLowerCase().includes(query) ||
          appointment.specialty.toLowerCase().includes(query) ||
          appointment.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }
    
    // Filter by specialty
    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.specialty === selectedSpecialty
      );
    }
    
    setFilteredAppointments(filtered);
  }, [searchQuery, selectedStatus, selectedSpecialty, appointments]);

  const handleNewAppointment = () => {
    navigate("/appointments/new");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const specialties = ["General Practitioner", "Dermatologist", "Psychologist", "Nutritionist"];

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <PageContainer>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
              <p className="text-muted-foreground">
                View and manage your appointments with healthcare providers
              </p>
            </div>
            <div className="flex items-start">
              <Button onClick={handleNewAppointment} className="bg-medical-500 hover:bg-medical-600">
                <Plus className="mr-2 h-4 w-4" /> New Appointment
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by doctor or specialty..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Specialty" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            {isLoading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse-light">
                    <CardContent className="p-6">
                      <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAppointments.length > 0 ? (
              <div className="grid gap-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{appointment.doctorName}</h3>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{appointment.specialty}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{appointment.dateTime}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          {appointment.status === "upcoming" && (
                            <>
                              <Button variant="outline" size="sm" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                                View Details
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => {
                                  toast({
                                    title: "Appointment cancelled",
                                    description: "Your appointment has been cancelled successfully.",
                                  });
                                  
                                  // Update local state for demo
                                  const updatedAppointments = appointments.map(a => 
                                    a.id === appointment.id ? {...a, status: "cancelled" as const} : a
                                  );
                                  setAppointments(updatedAppointments);
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {appointment.status === "completed" && (
                            <Button variant="outline" size="sm" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                              View Summary
                            </Button>
                          )}
                          {appointment.status === "cancelled" && (
                            <Button variant="outline" size="sm" onClick={handleNewAppointment}>
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No appointments found matching your criteria.</p>
                  <Button onClick={handleNewAppointment} className="bg-medical-500 hover:bg-medical-600">
                    <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Appointments;
