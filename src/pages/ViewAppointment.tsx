
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, MessageSquare, Phone, User, FileText, Edit, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const ViewAppointment = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // Mock appointment data
  const appointment = {
    id: id || "1",
    status: "confirmed",
    date: "June 28, 2023",
    time: "10:30 AM",
    duration: "30 minutes",
    type: "Regular Checkup",
    location: "University Health Center, Building B",
    reason: "Follow-up on medication and symptoms",
    notes: "Please bring your health card and previous prescription.",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "General Physician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=500&auto=format",
      rating: 4.8,
      experience: "15 years"
    },
    medicalHistory: [
      { date: "May 15, 2023", description: "Annual Physical Examination", doctor: "Dr. Sarah Johnson" },
      { date: "Feb 3, 2023", description: "Flu Treatment", doctor: "Dr. Michael Chen" },
      { date: "Nov 20, 2022", description: "Dermatology Consultation", doctor: "Dr. Emma Rodriguez" }
    ],
    prescriptions: [
      { medication: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", startDate: "May 15, 2023", endDate: "May 25, 2023" },
      { medication: "Loratadine", dosage: "10mg", frequency: "Once daily", startDate: "Feb 3, 2023", endDate: "Ongoing" }
    ]
  };

  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800"
  };

  return (
    <PageContainer>
      <div className="container px-4 py-6 md:py-10">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Appointment Details</h1>
              <p className="text-muted-foreground">View your appointment information</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/appointments">
                  <X className="mr-2 h-4 w-4" />
                  Back to List
                </Link>
              </Button>
              <Button asChild>
                <Link to={`/appointments/edit/${id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Appointment
                </Link>
              </Button>
            </div>
          </div>
          
          <Card className="border-medical-100">
            <CardHeader className="pb-0">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge className={`${statusColors[appointment.status as keyof typeof statusColors]} px-3 py-1 text-xs font-medium capitalize`}>
                    {appointment.status}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {appointment.time} ({appointment.duration})
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">Medical History</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Appointment Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Type</p>
                            <p className="font-medium">{appointment.type}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                              <p className="font-medium">{appointment.location}</p>
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Reason for Visit</p>
                            <p className="font-medium">{appointment.reason}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Notes</p>
                            <p className="font-medium">{appointment.notes}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Pre-Appointment Checklist</h3>
                        <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <p className="text-sm">Appointment confirmed</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-3">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <p className="text-sm">Insurance verification complete</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full border border-dashed border-muted-foreground flex items-center justify-center mr-3">
                            </div>
                            <p className="text-sm">Complete pre-appointment questionnaire</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-5 w-5 rounded-full border border-dashed border-muted-foreground flex items-center justify-center mr-3">
                            </div>
                            <p className="text-sm">Prepare questions for your doctor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-medium mb-2">Healthcare Provider</h3>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex flex-col items-center text-center mb-4">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarImage src={appointment.doctor.image} alt={appointment.doctor.name} />
                            <AvatarFallback>{appointment.doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium">{appointment.doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(appointment.doctor.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs ml-1">{appointment.doctor.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{appointment.doctor.experience} experience</p>
                        </div>
                        
                        <div className="space-y-3 mt-4">
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button variant="outline" className="w-full">
                                <Phone className="mr-2 h-4 w-4" />
                                Contact
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              <DrawerHeader>
                                <DrawerTitle>Contact {appointment.doctor.name}</DrawerTitle>
                                <DrawerDescription>Choose how you'd like to reach your healthcare provider</DrawerDescription>
                              </DrawerHeader>
                              <div className="p-4 space-y-3">
                                <Button variant="outline" className="w-full justify-start">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Office
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </Button>
                              </div>
                              <DrawerFooter>
                                <DrawerClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>
                          
                          <Button variant="outline" className="w-full">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Medical History</h3>
                    <div className="space-y-4">
                      {appointment.medicalHistory.map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <div className="border-l-4 border-medical-500 p-4">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <div>
                                <h4 className="font-medium">{item.description}</h4>
                                <p className="text-sm text-muted-foreground">{item.doctor}</p>
                              </div>
                              <Badge variant="outline" className="bg-muted/50">{item.date}</Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="prescriptions" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Prescriptions</h3>
                    <div className="space-y-4">
                      {appointment.prescriptions.map((prescription, index) => (
                        <div key={index} className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <h4 className="font-medium">{prescription.medication} ({prescription.dosage})</h4>
                            <Badge variant="outline" className={prescription.endDate === "Ongoing" ? "bg-green-100 text-green-800" : "bg-muted/50"}>
                              {prescription.endDate === "Ongoing" ? "Active" : "Completed"}
                            </Badge>
                          </div>
                          <p className="text-sm mb-1"><span className="text-muted-foreground">Frequency:</span> {prescription.frequency}</p>
                          <p className="text-sm"><span className="text-muted-foreground">Duration:</span> {prescription.startDate} to {prescription.endDate}</p>
                          <div className="mt-3 flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                              <FileText className="mr-1 h-3 w-3" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-xs">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Ask Questions
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="border-t flex flex-wrap justify-between gap-3 pt-4">
              <Button variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200">
                <X className="mr-2 h-4 w-4" />
                Cancel Appointment
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Reschedule</Button>
                <Button>Check In Online</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default ViewAppointment;
