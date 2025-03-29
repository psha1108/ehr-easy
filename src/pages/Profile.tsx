
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, Edit, FileText, FilePlus, Lock, Save, ShieldCheck, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    dob: "1996-04-12",
    gender: "Male",
    address: "123 University Ave",
    city: "College Town",
    state: "CA",
    zipCode: "94321",
    emergencyContact: "Jane Doe",
    emergencyPhone: "(123) 456-7891",
    relation: "Sister",
    insuranceProvider: "Student Health Insurance",
    policyNumber: "SHI1234567",
    groupNumber: "G123456",
    allergies: "Penicillin",
    medicalConditions: "Asthma",
    bloodType: "O+",
  });

  const [formData, setFormData] = useState({ ...profileData });

  // Medical documents
  const [documents, setDocuments] = useState([
    { id: 1, name: "Annual Physical Results", date: "May 15, 2023", type: "Medical Report" },
    { id: 2, name: "Vaccination Record", date: "January 10, 2023", type: "Immunization" },
    { id: 3, name: "Allergy Test Results", date: "March 22, 2023", type: "Lab Results" },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (!loginStatus) {
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate saving data
    setTimeout(() => {
      setProfileData(formData);
      setIsEditing(false);
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
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
              <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and medical history
              </p>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="medical" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Medical History
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center">
                <Clipboard className="mr-2 h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} size="sm" className="bg-medical-500 hover:bg-medical-600">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage src="/avatar.png" alt="John Doe" />
                        <AvatarFallback className="text-4xl">JD</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="mb-4">
                          Change Photo
                        </Button>
                      )}
                      <div className="text-center">
                        <h3 className="font-semibold text-xl">
                          {profileData.firstName} {profileData.lastName}
                        </h3>
                        <p className="text-muted-foreground">{profileData.email}</p>
                        <p className="text-sm text-muted-foreground">Student ID: ST12345</p>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Input
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h3 className="font-semibold mb-4">Address Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <h3 className="font-semibold mb-4">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact">Contact Name</Label>
                          <Input
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Contact Phone</Label>
                          <Input
                            id="emergencyPhone"
                            name="emergencyPhone"
                            value={formData.emergencyPhone}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relation">Relationship</Label>
                          <Input
                            id="relation"
                            name="relation"
                            value={formData.relation}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical" className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Medical Information</CardTitle>
                      <CardDescription>
                        Your health information and insurance details
                      </CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Information
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} size="sm" className="bg-medical-500 hover:bg-medical-600">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Insurance Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                          <Input
                            id="insuranceProvider"
                            name="insuranceProvider"
                            value={formData.insuranceProvider}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="policyNumber">Policy Number</Label>
                          <Input
                            id="policyNumber"
                            name="policyNumber"
                            value={formData.policyNumber}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupNumber">Group Number</Label>
                          <Input
                            id="groupNumber"
                            name="groupNumber"
                            value={formData.groupNumber}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold mb-4">Health Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="allergies">Allergies</Label>
                          <Input
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="medicalConditions">Medical Conditions</Label>
                          <Input
                            id="medicalConditions"
                            name="medicalConditions"
                            value={formData.medicalConditions}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bloodType">Blood Type</Label>
                          <Input
                            id="bloodType"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold mb-4">Medical History</h3>
                      <div className="border rounded-md p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Your complete medical history is available to healthcare providers. To request a copy or update specific information, please contact the health center directly.
                        </p>
                        
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            Request Medical History
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Medical Documents</CardTitle>
                      <CardDescription>
                        Access and manage your medical documents and records
                      </CardDescription>
                    </div>
                    <Button className="bg-medical-500 hover:bg-medical-600" size="sm">
                      <FilePlus className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {documents.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Document Name</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {documents.map((doc) => (
                              <tr key={doc.id} className="border-b">
                                <td className="px-4 py-4 text-sm">{doc.name}</td>
                                <td className="px-4 py-4 text-sm">{doc.date}</td>
                                <td className="px-4 py-4 text-sm">{doc.type}</td>
                                <td className="px-4 py-4 text-sm text-right">
                                  <Button variant="ghost" size="sm">
                                    View
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    Download
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No documents found</p>
                        <Button className="mt-4 bg-medical-500 hover:bg-medical-600">
                          <FilePlus className="mr-2 h-4 w-4" />
                          Upload Your First Document
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Change Password</h3>
                    <div className="grid gap-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="currentPassword"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="newPassword"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <Button className="mt-2 w-fit bg-medical-500 hover:bg-medical-600">
                        Update Password
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about your appointments and prescriptions
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive text message reminders about your appointments
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Data sharing</h4>
                          <p className="text-sm text-muted-foreground">
                            Control how your medical data is shared with healthcare providers
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    For more information about how we protect your data, please read our{" "}
                    <a href="/privacy" className="text-medical-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
