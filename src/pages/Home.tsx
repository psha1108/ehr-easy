
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/PageContainer";
import { Calendar, MessageSquare, Shield, User } from "lucide-react";

const Home = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-medical-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-medical-100 px-3 py-1 text-sm text-medical-600 mb-4">
                Student Healthcare Made Simple
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                Manage Your Health Journey with EHR-Easy
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A comprehensive electronic health record system designed specifically for students. 
                Seamlessly track appointments, prescriptions, and communicate with healthcare providers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-medical-500 hover:bg-medical-600">
                  <Link to="/register">
                    Get Started
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Student using the EHR-Easy platform" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Everything you need to manage your healthcare journey as a student
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-medical-100 text-medical-600 mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
              <p className="text-muted-foreground">
                Easily book and manage appointments with your healthcare providers
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-medical-100 text-medical-600 mb-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal Health Profile</h3>
              <p className="text-muted-foreground">
                Store and access your medical history and health information
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-medical-100 text-medical-600 mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Health Assistant</h3>
              <p className="text-muted-foreground">
                Get instant answers to your health questions and concerns
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-medical-100 text-medical-600 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your health data is encrypted and protected with the highest security standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Getting started with EHR-Easy is simple and straightforward
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-medical-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up with your email or phone number and complete your profile
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-medical-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Providers</h3>
              <p className="text-muted-foreground">
                Find and connect with healthcare providers at your institution
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-medical-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Manage Your Health</h3>
              <p className="text-muted-foreground">
                Schedule appointments, track prescriptions, and access your records
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-medical-500 hover:bg-medical-600">
              <Link to="/register">
                Get Started Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Students Say</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Hear from students who have transformed their healthcare experience with EHR-Easy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-10 w-10 rounded-full bg-medical-200 flex items-center justify-center text-medical-600 font-semibold">
                    S
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah J.</h3>
                  <p className="text-sm text-muted-foreground">Biology Major, Senior</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "EHR-Easy has been a game-changer for managing my healthcare while juggling classes. I can quickly schedule appointments and access my health records anytime."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-10 w-10 rounded-full bg-medical-200 flex items-center justify-center text-medical-600 font-semibold">
                    M
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Mike T.</h3>
                  <p className="text-sm text-muted-foreground">Computer Science, Junior</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The AI assistant helped me understand my prescription medications and reminded me when to take them. It's like having a health advisor in my pocket!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-10 w-10 rounded-full bg-medical-200 flex items-center justify-center text-medical-600 font-semibold">
                    L
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Leila K.</h3>
                  <p className="text-sm text-muted-foreground">Psychology, Sophomore</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "As an international student, having all my health information in one secure place makes managing healthcare in a new country so much easier."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-medical-500 text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
              <p className="mb-6 text-medical-50">
                Join thousands of students who are managing their healthcare journey with EHR-Easy. 
                Sign up today and experience the difference.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">
                  Create Your Account
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Students using the EHR-Easy app" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default Home;
