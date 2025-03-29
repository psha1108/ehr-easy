
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, FileText, Heart, Plus, Pill, Stethoscope, TrendingUp, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpcomingAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  dateTime: string;
  location: string;
}

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  prescribed: string;
  expires: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState<Prescription[]>([]);
  const [healthStats, setHealthStats] = useState({
    nextCheckup: "2 months",
    appointmentsThisYear: 3,
    lastVisit: "May 15, 2023",
  });
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
      setUpcomingAppointments([
        {
          id: "1",
          doctorName: "Dr. Sarah Johnson",
          specialty: "General Practitioner",
          dateTime: "June 15, 2023 • 10:30 AM",
          location: "University Health Center, Room 302",
        },
        {
          id: "2",
          doctorName: "Dr. Michael Chen",
          specialty: "Dermatologist",
          dateTime: "June 22, 2023 • 2:15 PM",
          location: "Medical Arts Building, Suite 105",
        },
      ]);
      
      setRecentPrescriptions([
        {
          id: "1",
          name: "Amoxicillin",
          dosage: "500mg",
          instructions: "Take 1 capsule 3 times daily with food for 10 days",
          prescribed: "May 15, 2023",
          expires: "May 15, 2024",
        },
        {
          id: "2",
          name: "Loratadine",
          dosage: "10mg",
          instructions: "Take 1 tablet daily as needed for allergies",
          prescribed: "April 3, 2023",
          expires: "April 3, 2024",
        },
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleBookAppointment = () => {
    navigate("/appointments/new");
  };

  const handleViewAllAppointments = () => {
    navigate("/appointments");
  };

  const handleViewAllPrescriptions = () => {
    navigate("/prescriptions");
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <PageContainer>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          {/* Welcome Section */}
          <section>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
                <p className="text-muted-foreground">Here's an overview of your health information.</p>
              </div>
              <div className="flex items-start">
                <Button onClick={handleBookAppointment} className="bg-medical-500 hover:bg-medical-600">
                  <Plus className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthStats.nextCheckup}</div>
                  <p className="text-xs text-muted-foreground">Annual physical scheduled</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthStats.appointmentsThisYear}</div>
                  <p className="text-xs text-muted-foreground">This year</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Last Visit</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthStats.lastVisit}</div>
                  <p className="text-xs text-muted-foreground">30 days ago</p>
                </CardContent>
              </Card>
              <Card className="hover-scale">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Health Status</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Good</div>
                  <div className="mt-2">
                    <Progress value={75} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Button variant="outline" size="sm" onClick={handleViewAllAppointments}>View all</Button>
            </div>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
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
            ) : upcomingAppointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center mt-3 text-sm">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{appointment.dateTime}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/appointments/${appointment.id}`)}>
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No upcoming appointments.</p>
                  <Button onClick={handleBookAppointment} className="mt-4 bg-medical-500 hover:bg-medical-600">
                    <Plus className="mr-2 h-4 w-4" /> Book Appointment
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Recent Prescriptions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Prescriptions</h2>
              <Button variant="outline" size="sm" onClick={handleViewAllPrescriptions}>View all</Button>
            </div>
            
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
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
            ) : recentPrescriptions.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {recentPrescriptions.map((prescription) => (
                  <Card key={prescription.id} className="hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <Pill className="mr-2 h-5 w-5 text-medical-500" />
                            <h3 className="font-medium">{prescription.name} {prescription.dosage}</h3>
                          </div>
                          <p className="mt-2 text-sm">{prescription.instructions}</p>
                          <div className="flex items-center mt-3 text-xs text-muted-foreground">
                            <span>Prescribed: {prescription.prescribed}</span>
                            <span className="mx-2">•</span>
                            <span>Expires: {prescription.expires}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No recent prescriptions.</p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Health Trends Section */}
          <section>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Health Trends</CardTitle>
                    <CardDescription>Your health vitals over time</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
                  <p className="text-muted-foreground text-sm">Health charts and graphs will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
