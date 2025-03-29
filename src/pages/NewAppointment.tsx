
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  availableDates: string[];
  availableTimes: string[];
  location: string;
}

const NewAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointmentType, setAppointmentType] = useState("in-person");

  // Available specialties
  const specialties = [
    "General Practitioner",
    "Dermatologist",
    "Gynecologist",
    "Psychiatrist",
    "Psychologist",
    "Nutritionist",
    "Dentist",
    "Ophthalmologist",
    "Orthopedist",
  ];

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
      setDoctors([
        {
          id: "1",
          name: "Dr. Sarah Johnson",
          specialty: "General Practitioner",
          credentials: "MD, University of California",
          availableDates: ["2023-06-15", "2023-06-16", "2023-06-17"],
          availableTimes: ["09:00", "10:30", "13:00", "14:30", "16:00"],
          location: "University Health Center, Room 302",
        },
        {
          id: "2",
          name: "Dr. Michael Chen",
          specialty: "Dermatologist",
          credentials: "MD, Stanford University",
          availableDates: ["2023-06-18", "2023-06-19", "2023-06-20"],
          availableTimes: ["09:30", "11:00", "14:00", "15:30"],
          location: "Medical Arts Building, Suite 105",
        },
        {
          id: "3",
          name: "Dr. Emily Rodriguez",
          specialty: "Gynecologist",
          credentials: "MD, Johns Hopkins University",
          availableDates: ["2023-06-15", "2023-06-17", "2023-06-21"],
          availableTimes: ["10:00", "11:30", "13:30", "15:00", "16:30"],
          location: "University Health Center, Room 210",
        },
        {
          id: "4",
          name: "Dr. Robert Wilson",
          specialty: "Psychologist",
          credentials: "PhD, Columbia University",
          availableDates: ["2023-06-16", "2023-06-18", "2023-06-20", "2023-06-22"],
          availableTimes: ["09:00", "10:30", "13:00", "14:30", "16:00"],
          location: "Student Wellness Center, Room 105",
        },
        {
          id: "5",
          name: "Dr. Lisa Garcia",
          specialty: "Nutritionist",
          credentials: "RD, MS, University of Washington",
          availableDates: ["2023-06-15", "2023-06-17", "2023-06-19", "2023-06-21"],
          availableTimes: ["10:00", "11:30", "13:30", "15:00"],
          location: "University Health Center, Room 145",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  // Get filtered doctors based on selected specialty
  const filteredDoctors = specialty
    ? doctors.filter((doctor) => doctor.specialty === specialty)
    : [];

  // Get selected doctor object
  const doctorDetails = doctors.find((doctor) => doctor.id === selectedDoctor);

  const handleNextStep = () => {
    if (step === 1 && !specialty) {
      toast({
        title: "Please select a specialty",
        description: "You need to select a medical specialty to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && !selectedDoctor) {
      toast({
        title: "Please select a doctor",
        description: "You need to select a doctor to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 3 && (!selectedDate || !selectedTime)) {
      toast({
        title: "Please select date and time",
        description: "You need to select both a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!visitReason) {
      toast({
        title: "Please enter a reason for visit",
        description: "A brief description helps the doctor prepare for your appointment.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate booking an appointment
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Appointment booked",
        description: "Your appointment has been scheduled successfully.",
      });
      
      navigate("/appointments");
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <PageContainer>
      <div className="container max-w-3xl py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Schedule an Appointment</h1>
          <p className="text-muted-foreground">
            Book an appointment with a healthcare provider
          </p>
        </div>
        
        <div className="relative mb-8">
          <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2"></div>
          <ol className="relative flex justify-between">
            <li className="flex items-center justify-center relative z-10">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1 ? "bg-medical-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <span className="absolute top-10 text-xs font-medium">
                Specialty
              </span>
            </li>
            <li className="flex items-center justify-center relative z-10">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2 ? "bg-medical-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
              <span className="absolute top-10 text-xs font-medium">
                Provider
              </span>
            </li>
            <li className="flex items-center justify-center relative z-10">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3 ? "bg-medical-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                3
              </div>
              <span className="absolute top-10 text-xs font-medium">
                Date & Time
              </span>
            </li>
            <li className="flex items-center justify-center relative z-10">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 4 ? "bg-medical-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                4
              </div>
              <span className="absolute top-10 text-xs font-medium">
                Confirm
              </span>
            </li>
          </ol>
        </div>
        
        <Card className="animate-fade-in">
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Select Specialty</CardTitle>
                <CardDescription>
                  Choose the type of healthcare provider you want to see
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-type">Appointment Type</Label>
                    <RadioGroup
                      value={appointmentType}
                      onValueChange={setAppointmentType}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person">In-person</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="telehealth" id="telehealth" />
                        <Label htmlFor="telehealth">Telehealth (Video visit)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Medical Specialty</Label>
                    <Select
                      value={specialty}
                      onValueChange={setSpecialty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div></div>
                <Button onClick={handleNextStep} className="bg-medical-500 hover:bg-medical-600">
                  Next
                </Button>
              </CardFooter>
            </>
          )}
          
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Select Healthcare Provider</CardTitle>
                <CardDescription>
                  Choose a provider from the available options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse-light">
                      <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-12 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                    </div>
                  ) : filteredDoctors.length > 0 ? (
                    <RadioGroup
                      value={selectedDoctor}
                      onValueChange={setSelectedDoctor}
                      className="space-y-2"
                    >
                      {filteredDoctors.map((doctor) => (
                        <div
                          key={doctor.id}
                          className={`flex items-center space-x-2 p-4 border rounded-md ${
                            selectedDoctor === doctor.id
                              ? "border-medical-500 bg-medical-50"
                              : "border-gray-200"
                          }`}
                        >
                          <RadioGroupItem value={doctor.id} id={doctor.id} />
                          <div className="flex-1">
                            <Label htmlFor={doctor.id} className="font-medium">
                              {doctor.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {doctor.credentials}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <MapPin className="inline-block mr-1 h-3 w-3" />
                              {doctor.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No healthcare providers available for this specialty.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSpecialty("");
                          setStep(1);
                        }}
                        className="mt-4"
                      >
                        Select a different specialty
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-medical-500 hover:bg-medical-600"
                  disabled={!selectedDoctor}
                >
                  Next
                </Button>
              </CardFooter>
            </>
          )}
          
          {step === 3 && doctorDetails && (
            <>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>
                  Choose when you would like to have your appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium">{doctorDetails.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctorDetails.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <MapPin className="inline-block mr-1 h-3 w-3" />
                      {doctorDetails.location}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-medical-500" />
                        <Label htmlFor="date">Available Dates</Label>
                      </div>
                      <Select
                        value={selectedDate}
                        onValueChange={setSelectedDate}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a date" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctorDetails.availableDates.map((date) => (
                            <SelectItem key={date} value={date}>
                              {formatDate(date)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-medical-500" />
                        <Label htmlFor="time">Available Times</Label>
                      </div>
                      {selectedDate ? (
                        <Select
                          value={selectedTime}
                          onValueChange={setSelectedTime}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctorDetails.availableTimes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {formatTime(time)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Please select a date first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="bg-medical-500 hover:bg-medical-600"
                  disabled={!selectedDate || !selectedTime}
                >
                  Next
                </Button>
              </CardFooter>
            </>
          )}
          
          {step === 4 && doctorDetails && (
            <>
              <CardHeader>
                <CardTitle>Confirm Appointment</CardTitle>
                <CardDescription>
                  Review your appointment details and confirm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-md space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">Appointment Details</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Provider:</div>
                          <div className="flex-1 font-medium">{doctorDetails.name}</div>
                        </div>
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Specialty:</div>
                          <div className="flex-1">{doctorDetails.specialty}</div>
                        </div>
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Date:</div>
                          <div className="flex-1">{formatDate(selectedDate)}</div>
                        </div>
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Time:</div>
                          <div className="flex-1">{formatTime(selectedTime)}</div>
                        </div>
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Location:</div>
                          <div className="flex-1">{doctorDetails.location}</div>
                        </div>
                        <div className="flex">
                          <div className="w-32 text-sm text-muted-foreground">Type:</div>
                          <div className="flex-1">
                            {appointmentType === "in-person" ? "In-person visit" : "Telehealth (Video visit)"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">
                      Reason for Visit <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your symptoms or reason for this appointment..."
                      value={visitReason}
                      onChange={(e) => setVisitReason(e.target.value)}
                      rows={4}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This information helps the healthcare provider prepare for your visit.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance Information</Label>
                    <Input
                      id="insurance"
                      placeholder="Student Health Insurance #SHI1234567"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Your insurance information is already on file.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto bg-medical-500 hover:bg-medical-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Booking Appointment..." : "Confirm Appointment"}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </PageContainer>
  );
};

export default NewAppointment;
