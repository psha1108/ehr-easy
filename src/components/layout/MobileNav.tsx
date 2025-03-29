
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  Settings, 
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Prescriptions",
      href: "/prescriptions",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "AI Assistant",
      href: "/ai-assistant",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to="/" className="flex items-center gap-2 mb-6">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-bold">
          M
        </div>
        <span className="font-semibold text-xl">MEDI CAREPRO</span>
      </Link>
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <Button
              variant={isActive(item.href) ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive(item.href) ? "bg-medical-500 hover:bg-medical-600" : ""
              )}
            >
              {item.icon}
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
