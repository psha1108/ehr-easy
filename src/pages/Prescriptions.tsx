
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Pill, AlertCircle, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Prescription {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  prescribed: string;
  expires: string;
  doctor: string;
  status: "active" | "expired" | "refill-requested";
  refills: number;
}

const Prescriptions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const mockPrescriptions: Prescription[] = [
        {
          id: "1",
          name: "Amoxicillin",
          dosage: "500mg",
          instructions: "Take 1 capsule 3 times daily with food for 10 days",
          prescribed: "May 15, 2023",
          expires: "May 15, 2024",
          doctor: "Dr. Sarah Johnson",
          status: "active",
          refills: 2,
        },
        {
          id: "2",
          name: "Loratadine",
          dosage: "10mg",
          instructions: "Take 1 tablet daily as needed for allergies",
          prescribed: "April 3, 2023",
          expires: "April 3, 2024",
          doctor: "Dr. Sarah Johnson",
          status: "active",
          refills: 5,
        },
        {
          id: "3",
          name: "Fluoxetine",
          dosage: "20mg",
          instructions: "Take 1 capsule daily in the morning",
          prescribed: "March 10, 2023",
          expires: "September 10, 2023",
          doctor: "Dr. Robert Wilson",
          status: "refill-requested",
          refills: 0,
        },
        {
          id: "4",
          name: "Ibuprofen",
          dosage: "800mg",
          instructions: "Take 1 tablet every 8 hours with food as needed for pain",
          prescribed: "February 5, 2023",
          expires: "February 5, 2024",
          doctor: "Dr. Michael Chen",
          status: "active",
          refills: 3,
        },
        {
          id: "5",
          name: "Azithromycin",
          dosage: "250mg",
          instructions: "Take 2 tablets on day 1, then 1 tablet daily for 4 more days",
          prescribed: "January 10, 2023",
          expires: "January 10, 2024",
          doctor: "Dr. Sarah Johnson",
          status: "expired",
          refills: 0,
        },
      ];
      
      setPrescriptions(mockPrescriptions);
      setFilteredPrescriptions(mockPrescriptions);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  // Filter prescriptions based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPrescriptions(prescriptions);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = prescriptions.filter(
      (prescription) =>
        prescription.name.toLowerCase().includes(query) ||
        prescription.doctor.toLowerCase().includes(query) ||
        prescription.dosage.toLowerCase().includes(query)
    );
    
    setFilteredPrescriptions(filtered);
  }, [searchQuery, prescriptions]);

  const handleRefillRequest = (id: string) => {
    // Update local state for demo
    const updatedPrescriptions = prescriptions.map((prescription) =>
      prescription.id === id ? { ...prescription, status: "refill-requested" as const } : prescription
    );
    
    setPrescriptions(updatedPrescriptions);
    
    toast({
      title: "Refill requested",
      description: "Your refill request has been sent to your healthcare provider.",
    });
  };

  const handleViewPrescription = (id: string) => {
    navigate(`/prescriptions/${id}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>;
      case "refill-requested":
        return <Badge className="bg-yellow-500">Refill Requested</Badge>;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <PageContainer>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
              <p className="text-muted-foreground">
                View and manage your prescription medications
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="refill">Refill Needed</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
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
            ) : filteredPrescriptions.length > 0 ? (
              <TabsContent value="all" className="mt-0">
                <div className="grid gap-4">
                  {filteredPrescriptions.map((prescription) => (
                    <Card key={prescription.id} className="hover-scale">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="h-5 w-5 text-medical-500" />
                              <h3 className="font-medium">
                                {prescription.name} {prescription.dosage}
                              </h3>
                              {getStatusBadge(prescription.status)}
                            </div>
                            <p className="text-sm mb-2">{prescription.instructions}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Prescribed: {prescription.prescribed}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>Expires: {prescription.expires}</span>
                              </div>
                              <div className="flex items-center">
                                <Check className="mr-1 h-3 w-3" />
                                <span>Refills: {prescription.refills}</span>
                              </div>
                            </div>
                            <p className="text-xs mt-2">
                              Prescribed by: {prescription.doctor}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end md:self-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewPrescription(prescription.id)}
                            >
                              View Details
                            </Button>
                            {prescription.status === "active" && prescription.refills > 0 && (
                              <Button 
                                className="bg-medical-500 hover:bg-medical-600" 
                                size="sm"
                                onClick={() => handleRefillRequest(prescription.id)}
                              >
                                Request Refill
                              </Button>
                            )}
                            {prescription.status === "refill-requested" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled
                              >
                                Refill Pending
                              </Button>
                            )}
                            {prescription.status === "expired" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate("/appointments/new")}
                              >
                                Book Appointment
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-muted-foreground mb-4">No prescriptions found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
            
            <TabsContent value="active" className="mt-0">
              <div className="grid gap-4">
                {filteredPrescriptions
                  .filter((p) => p.status === "active")
                  .map((prescription) => (
                    <Card key={prescription.id} className="hover-scale">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="h-5 w-5 text-medical-500" />
                              <h3 className="font-medium">
                                {prescription.name} {prescription.dosage}
                              </h3>
                              {getStatusBadge(prescription.status)}
                            </div>
                            <p className="text-sm mb-2">{prescription.instructions}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Prescribed: {prescription.prescribed}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>Expires: {prescription.expires}</span>
                              </div>
                              <div className="flex items-center">
                                <Check className="mr-1 h-3 w-3" />
                                <span>Refills: {prescription.refills}</span>
                              </div>
                            </div>
                            <p className="text-xs mt-2">
                              Prescribed by: {prescription.doctor}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end md:self-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewPrescription(prescription.id)}
                            >
                              View Details
                            </Button>
                            {prescription.refills > 0 && (
                              <Button 
                                className="bg-medical-500 hover:bg-medical-600" 
                                size="sm"
                                onClick={() => handleRefillRequest(prescription.id)}
                              >
                                Request Refill
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="refill" className="mt-0">
              <div className="grid gap-4">
                {filteredPrescriptions
                  .filter((p) => p.status === "refill-requested")
                  .map((prescription) => (
                    <Card key={prescription.id} className="hover-scale">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="h-5 w-5 text-medical-500" />
                              <h3 className="font-medium">
                                {prescription.name} {prescription.dosage}
                              </h3>
                              {getStatusBadge(prescription.status)}
                            </div>
                            <p className="text-sm mb-2">{prescription.instructions}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Prescribed: {prescription.prescribed}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>Expires: {prescription.expires}</span>
                              </div>
                              <div className="flex items-center">
                                <Check className="mr-1 h-3 w-3" />
                                <span>Refills: {prescription.refills}</span>
                              </div>
                            </div>
                            <p className="text-xs mt-2">
                              Prescribed by: {prescription.doctor}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end md:self-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewPrescription(prescription.id)}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              disabled
                            >
                              Refill Pending
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="expired" className="mt-0">
              <div className="grid gap-4">
                {filteredPrescriptions
                  .filter((p) => p.status === "expired")
                  .map((prescription) => (
                    <Card key={prescription.id} className="hover-scale">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="h-5 w-5 text-medical-500" />
                              <h3 className="font-medium">
                                {prescription.name} {prescription.dosage}
                              </h3>
                              {getStatusBadge(prescription.status)}
                            </div>
                            <p className="text-sm mb-2">{prescription.instructions}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>Prescribed: {prescription.prescribed}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                <span>Expires: {prescription.expires}</span>
                              </div>
                              <div className="flex items-center">
                                <Check className="mr-1 h-3 w-3" />
                                <span>Refills: {prescription.refills}</span>
                              </div>
                            </div>
                            <p className="text-xs mt-2">
                              Prescribed by: {prescription.doctor}
                            </p>
                          </div>
                          <div className="flex gap-2 self-end md:self-center">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewPrescription(prescription.id)}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => navigate("/appointments/new")}
                            >
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Prescriptions;
