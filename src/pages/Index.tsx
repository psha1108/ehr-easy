
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate a brief loading period with progress for a better UX
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-medical-50 to-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_300px,rgba(100,130,255,0.1),transparent)]"></div>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-medical-500/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg relative overflow-hidden">
            <span className="relative z-10">M</span>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-medical-600/0 via-white/20 to-medical-400/0 animate-[pulse_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-3 animate-[fadeIn_0.5s_ease-out_forwards]">MEDI CAREPRO</h1>
        <p className="text-muted-foreground mb-8 max-w-md animate-[fadeIn_0.7s_ease-out_forwards]">
          Your personal healthcare companion. Simplified management for better health outcomes.
        </p>
        
        <div className="relative h-2 w-64 bg-medical-100 rounded-full overflow-hidden mb-2">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-medical-400 to-medical-600 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.15s ease-out' }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground animate-[fadeIn_0.8s_ease-out_forwards]">
          Loading your health dashboard...
        </p>
      </div>
    </div>
  );
};

export default Index;
