
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading period for a better UX
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-medical-50 to-background">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-pulse">
            E
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">EHR-Easy</h1>
        <p className="text-muted-foreground mb-6">Loading your health dashboard...</p>
        <div className="relative h-1.5 w-48 bg-medical-100 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-medical-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
