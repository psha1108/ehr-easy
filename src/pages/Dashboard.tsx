
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarDays, Clock, FileText, Heart, InfoIcon, ThumbsUp, TrendingUp, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for charts
  const healthData = [
    { name: "Week 1", value: 85 },
    { name: "Week 2", value: 78 },
    { name: "Week 3", value: 92 },
    { name: "Week 4", value: 88 },
  ];

  const appointmentData = [
    { name: "Jan", count: 3 },
    { name: "Feb", count: 2 },
    { name: "Mar", count: 4 },
    { name: "Apr", count: 1 },
    { name: "May", count: 5 },
    { name: "Jun", count: 2 },
  ];

  const medicationData = [
    { name: "Completed", value: 75, color: "#0ea5e9" },
    { name: "Missed", value: 10, color: "#ef4444" },
    { name: "Upcoming", value: 15, color: "#a3a3a3" },
  ];

  const recentAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "June 15, 2023",
      time: "10:00 AM",
      status: "completed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "June 28, 2023",
      time: "2:30 PM",
      status: "upcoming",
    },
  ];

  const healthMetrics = [
    { title: "Heart Rate", value: "72 bpm", icon: <Heart className="h-6 w-6" /> },
    { title: "Blood Pressure", value: "120/80", icon: <Activity className="h-6 w-6" /> },
    { title: "BMI", value: "22.5", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Health Score", value: "85/100", icon: <ThumbsUp className="h-6 w-6" /> },
  ];

  return (
    <PageContainer>
      <div className="container px-4 py-6 md:py-10">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold">Student Health Dashboard</h1>
          <p className="text-muted-foreground">Monitor your health metrics, appointments, and prescriptions all in one place.</p>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {metric.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Health Trend</CardTitle>
                  <CardDescription>Your weekly health score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={healthData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Medication Adherence</CardTitle>
                  <CardDescription>Your prescription adherence rate</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={medicationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {medicationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-start gap-4 p-3 rounded-md bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{appointment.doctor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">{appointment.doctor}</p>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarDays className="mr-1 h-3 w-3" />{appointment.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />{appointment.time}
                            </div>
                          </div>
                        </div>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          appointment.status === "completed" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {appointment.status === "completed" ? "Completed" : "Upcoming"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/appointments">View All Appointments</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Health Reminders</CardTitle>
                  <CardDescription>Your upcoming health tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Prescription Renewal</span>
                        </div>
                        <span className="text-xs text-muted-foreground">3 days left</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Blood Test</span>
                        </div>
                        <span className="text-xs text-muted-foreground">1 week left</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Vaccination Due</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2 weeks left</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Set Reminder</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment History</CardTitle>
                <CardDescription>View your past and upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/appointments">View All</Link>
                </Button>
                <Button asChild>
                  <Link to="/appointments/new">New Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prescriptions Overview</CardTitle>
                <CardDescription>Manage your medication and prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Amoxicillin</div>
                      <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Active</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      500mg capsule • Take 1 three times daily
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Prescribed by Dr. Sarah Johnson • 06/12/2023
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Loratadine</div>
                      <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Active</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      10mg tablet • Take 1 daily
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Prescribed by Dr. Michael Chen • 05/28/2023
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Ibuprofen</div>
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">Completed</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      200mg tablet • Take 1 as needed for pain
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Prescribed by Dr. Sarah Johnson • 04/10/2023
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/prescriptions">View All Prescriptions</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
