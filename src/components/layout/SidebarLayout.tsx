
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  Settings, 
  Bell,
  ChevronLeft,
  Heart,
  FileMedical,
  Pill,
  BarChart2,
  Info
} from "lucide-react";
import Header from './Header';
import Footer from './Footer';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const location = useLocation();
  const [isPatient, setIsPatient] = useState(true);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Prescriptions",
      href: "/prescriptions",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "AI Assistant",
      href: "/ai-assistant",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Health Records",
      href: "/health-records",
      icon: <FileMedical className="h-4 w-4" />,
    },
    {
      title: "Medications",
      href: "/medications",
      icon: <Pill className="h-4 w-4" />,
    },
    {
      title: "Vital Stats",
      href: "/vitals",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b">
            <Link to="/" className="flex items-center gap-2 p-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-semibold text-xl">MEDI CAREPRO</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <div className="py-4 px-3 mb-4 border-b">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10 border-2 border-medical-100">
                  <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">John Doe</h4>
                  <p className="text-xs text-muted-foreground">Patient</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-medium">85/100</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-medical-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.href)}
                    tooltip={item.title}
                  >
                    <Link to={item.href} className="flex items-center">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-3">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2.5 text-sm">
              <Info className="h-4 w-4 text-medical-500" />
              <span className="text-xs">Need Help? <Link to="/support" className="text-medical-600 font-medium">Contact Support</Link></span>
            </div>
          </SidebarFooter>
          
          <SidebarRail />
        </Sidebar>
        
        <SidebarInset className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
