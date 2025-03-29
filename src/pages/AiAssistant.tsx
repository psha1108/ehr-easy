
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, Brain, Info, MessageSquare, Pill, Plus, Send, ThumbsUp, Mic, FileText, Sparkles, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
  attachments?: string[];
}

interface SuggestedQuestion {
  text: string;
  icon: JSX.Element;
}

const AiAssistant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [aiModel, setAiModel] = useState<"standard" | "advanced">("standard");
  const [thinking, setThinking] = useState(false);
  const [thinkingProgress, setThinkingProgress] = useState(0);

  // Questions that users might want to ask
  const suggestedQuestions: SuggestedQuestion[] = [
    {
      text: "What are the side effects of my medication?",
      icon: <Pill className="h-4 w-4" />,
    },
    {
      text: "How do I manage my stress during exams?",
      icon: <Brain className="h-4 w-4" />,
    },
    {
      text: "When should I get my flu vaccine?",
      icon: <Info className="h-4 w-4" />,
    },
    {
      text: "What should I do for allergies?",
      icon: <AlertCircle className="h-4 w-4" />,
    },
    {
      text: "Can you summarize my recent health records?",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      text: "What are some healthy eating habits for students?",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  const advancedFeatures = [
    "Personalized health insights",
    "Medical terminology explanation",
    "Treatment comparison",
    "Health data visualization",
    "Medical research summaries",
    "Symptom analysis",
    "Medication reminders"
  ];

  useEffect(() => {
    // Check if user is logged in
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (!loginStatus) {
      navigate("/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Add initial welcome message
    setChatHistory([
      {
        role: "assistant",
        content: "Hello! I'm your AI health assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, [navigate]);

  useEffect(() => {
    // Scroll to bottom of chat when messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Progress bar animation for "thinking" state
  useEffect(() => {
    let interval: number;
    if (thinking) {
      interval = window.setInterval(() => {
        setThinkingProgress((prev) => {
          const next = prev + (Math.random() * 10);
          return next > 95 ? 95 : next;
        });
      }, 300);
    } else {
      setThinkingProgress(0);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [thinking]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setThinking(true);
    
    // Simulate AI thinking and response generation
    setTimeout(() => {
      setThinking(false);
      setIsLoading(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        let response = "";
        
        // More detailed pattern matching for demo purposes
        if (message.toLowerCase().includes("medication") || message.toLowerCase().includes("side effect")) {
          if (aiModel === "advanced") {
            response = "Based on your historical data and current medications (Lisinopril, Metformin), here are the potential side effects to be aware of:\n\n* Lisinopril: Possible dizziness, cough, and fatigue. Your recent blood pressure readings suggest you're responding well, but the persistent cough you reported last month may be related.\n\n* Metformin: Potential GI issues, vitamin B12 deficiency. Your last lab work (March 2023) showed normal B12 levels, but I'd recommend monitoring this annually.\n\nWould you like me to help schedule a medication review with Dr. Thompson?";
          } else {
            response = "Side effects vary depending on the medication. Common side effects might include drowsiness, nausea, or headaches. It's important to read your prescription information and consult with your healthcare provider about any concerns. Would you like me to help schedule an appointment with your doctor?";
          }
        } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxiety")) {
          if (aiModel === "advanced") {
            response = "I've analyzed your recent sleep and activity patterns from your connected health app. Your sleep quality has decreased by 22% during exam periods.\n\nRecommendations tailored to your schedule:\n\n1. Morning meditation (7-7:15 AM) - fits your early morning pattern\n2. Micro-breaks using the 25/5 Pomodoro technique during your typical study hours (10 AM-4 PM)\n3. Evening physical activity (6-7 PM) that aligns with your usual gym time\n\nThe University Wellness Center has stress management workshops on Thursdays at 5 PM. Would you like me to reserve a spot for you this week?";
          } else {
            response = "Managing stress during exams is important. Try techniques like deep breathing, regular breaks, adequate sleep, and exercise. Our Student Wellness Center also offers free counseling services. Would you like information about these resources?";
          }
        } else if (message.toLowerCase().includes("flu") || message.toLowerCase().includes("vaccine")) {
          if (aiModel === "advanced") {
            response = "Based on your immunization history and campus location, I recommend getting your flu shot in early October.\n\nThe University Health Center (closest to your dorm) offers free flu shots for students with your insurance plan. Their availability for next month:\n\n- Oct 3: 9 AM - 4 PM\n- Oct 5: 10 AM - 6 PM\n- Oct 10: 8 AM - 3 PM\n\nYour class schedule suggests Oct 5 after 2 PM would work best. Would you like me to reserve that slot?";
          } else {
            response = "Flu vaccines are typically available in early fall. For students, the University Health Center offers free flu shots starting in September. Would you like me to help you schedule an appointment for a flu shot?";
          }
        } else if (message.toLowerCase().includes("allergy") || message.toLowerCase().includes("allergies")) {
          if (aiModel === "advanced") {
            response = "I've noticed from your health records that you have seasonal allergies (pollen, specifically birch) and a mild reaction to penicillin.\n\nLocal pollen forecasts show high birch pollen counts expected next week. Given your previous symptom patterns, I'd recommend starting your Loratadine 10mg now rather than waiting for symptoms to appear.\n\nYou currently have 8 tablets remaining from your last prescription. Should I send a refill request to your pharmacy or would you prefer to discuss alternative treatments with Dr. Roberts?";
          } else {
            response = "For allergies, over-the-counter antihistamines can help with symptoms. If your allergies are severe, you might benefit from seeing an allergist. The University Health Center can provide allergy testing. Would you like to schedule an appointment?";
          }
        } else if (message.toLowerCase().includes("appointment")) {
          if (aiModel === "advanced") {
            response = "I can help you schedule an appointment based on your preferences and availability.\n\nYour calendar shows you're free:\n- Monday afternoons after 2 PM\n- Wednesday mornings before 11 AM\n- All day Friday\n\nDr. Miller (your primary care provider) has openings:\n- Monday at 3:30 PM\n- Wednesday at 9:15 AM\n\nWould you prefer one of these times, or would you like to see other available providers?";
          } else {
            response = "I'd be happy to help you schedule an appointment. You can go to the Appointments section to book a new appointment, or I can guide you there. Would you like me to take you to the appointment booking page?";
          }
        } else if (message.toLowerCase().includes("eating") || message.toLowerCase().includes("diet") || message.toLowerCase().includes("nutrition")) {
          if (aiModel === "advanced") {
            response = "Based on your recent health assessment and your goal to improve energy levels during study sessions, here are personalized nutrition recommendations:\n\n1. Your iron levels were slightly below optimal range in your last blood test. Consider adding more leafy greens and legumes to your meals.\n\n2. Your reported meal schedule shows frequent skipping of breakfast. Research shows this may be affecting your cognitive performance in morning classes.\n\n3. The campus dining hall in your residence area offers several balanced meal options - I recommend the protein bowl (station 3) and Mediterranean plate (station 5).\n\nWould you like me to create a weekly meal plan that works with your class schedule and dining hall options?";
          } else {
            response = "Healthy eating for students includes balanced meals with fruits, vegetables, lean proteins, and whole grains. Try to maintain regular meal times and stay hydrated. The campus dining halls offer nutritional information for their menu items. Would you like some specific meal suggestions that work well with a busy student schedule?";
          }
        } else if (message.toLowerCase().includes("health record") || message.toLowerCase().includes("medical history")) {
          if (aiModel === "advanced") {
            response = "Here's a summary of your recent health information:\n\n• Last physical: March 15, 2023 with Dr. Thompson\n• Vitals trend: Blood pressure has improved from 128/82 to 118/75 over the past 6 months\n• Vaccinations: COVID-19 (January 2023), Tetanus (2020), all others up to date\n• Recent lab work: Normal blood panel with slightly low Vitamin D (supplementation recommended)\n• Medications: Loratadine (seasonal), Multivitamin daily\n• Reported conditions: Seasonal allergies, occasional migraines\n\nYou're due for an eye exam - it's been 2 years since your last one. Would you like me to find available appointments with university-covered optometrists?";
          } else {
            response = "Your health records include your medical history, vaccinations, allergies, medications, and recent appointments. You can view a detailed summary in your profile section. Is there specific information you're looking for in your health record?";
          }
        } else {
          if (aiModel === "advanced") {
            response = "Thank you for your message. I've analyzed your health profile and recent interactions to provide personalized guidance. While I can offer evidence-based health information, I always recommend consulting with healthcare professionals for specific medical concerns.\n\nYour student health insurance covers telehealth consultations 24/7 with zero copay. Would you like me to connect you with a healthcare provider now, or is there another aspect of your health I can help with?";
          } else {
            response = "Thank you for your message. While I can provide general health information, I recommend consulting with a healthcare professional for specific medical advice. Is there something specific you'd like to know about our health services?";
          }
        }
        
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        
        setChatHistory((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Your message has been captured.",
      });
      // Simulate transcription result
      setMessage("Can you help me understand my recent lab results?");
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone.",
      });
      
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        if (isRecording) toggleRecording();
      }, 3000);
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "File attached",
        description: `${files[0].name} has been attached to your message.`,
      });
      // Here you would typically handle file upload
    }
  };

  const handleChangeAIModel = (value: string) => {
    setAiModel(value as "standard" | "advanced");
    toast({
      title: value === "advanced" ? "Advanced AI activated" : "Standard AI activated",
      description: value === "advanced" 
        ? "Using enhanced medical knowledge base and personalization." 
        : "Using standard medical knowledge base.",
    });
  };

  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

  return (
    <PageContainer>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-medical-500 to-medical-700 bg-clip-text text-transparent">AI Health Assistant</h1>
              <p className="text-muted-foreground">
                Get personalized answers to your health questions and guidance for your healthcare needs
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="advanced-mode"
                  checked={isAdvancedMode}
                  onCheckedChange={setIsAdvancedMode}
                />
                <Label htmlFor="advanced-mode">Advanced Features</Label>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="flex flex-col h-[600px] overflow-hidden border-medical-100 shadow-md">
                <CardHeader className="pb-4 border-b bg-gradient-to-r from-medical-50 to-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-medical-100">
                        <AvatarImage src="/avatar-ai.png" alt="AI Assistant" />
                        <AvatarFallback className="bg-medical-100 text-medical-700">AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">EHR Health Assistant</CardTitle>
                        <CardDescription className="text-xs flex items-center">
                          <Sparkles className="h-3 w-3 mr-1 text-medical-500" />
                          Powered by Advanced Medical AI
                        </CardDescription>
                      </div>
                    </div>
                    <Tabs value={aiModel} onValueChange={handleChangeAIModel} className="w-auto">
                      <TabsList className="h-8 bg-muted/50">
                        <TabsTrigger value="standard" className="text-xs h-7 px-3">
                          Standard
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="text-xs h-7 px-3">
                          Advanced
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pt-4 pb-4 px-4">
                  <div className="flex flex-col gap-6">
                    {chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          chat.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[85%] ${
                            chat.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className={`h-8 w-8 mt-1 ${chat.role === "assistant" ? "ring-1 ring-medical-200" : ""}`}>
                            {chat.role === "user" ? (
                              <>
                                <AvatarImage src="/avatar.png" alt="You" />
                                <AvatarFallback>JD</AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="/avatar-ai.png" alt="AI Assistant" />
                                <AvatarFallback className="bg-medical-100 text-medical-700">AI</AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div className="space-y-1">
                            <div
                              className={`rounded-lg p-3 shadow-sm ${
                                chat.role === "user"
                                  ? "bg-medical-500 text-white"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">{chat.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground ml-1">
                              {formatTime(chat.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {thinking && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%]">
                          <Avatar className="h-8 w-8 mt-1 ring-1 ring-medical-200">
                            <AvatarImage src="/avatar-ai.png" alt="AI Assistant" />
                            <AvatarFallback className="bg-medical-100 text-medical-700">AI</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 w-full max-w-md">
                            <div className="rounded-lg p-3 bg-muted shadow-sm">
                              <div className="flex items-center space-x-2 mb-2">
                                <Loader2 className="h-4 w-4 animate-spin text-medical-500" />
                                <p className="text-xs text-medical-700 font-medium">Analyzing your health data...</p>
                              </div>
                              <Progress value={thinkingProgress} className="h-1.5 w-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t bg-gradient-to-r from-background to-medical-50">
                  <form
                    className="flex w-full gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isLoading || thinking}
                        className="min-h-[52px] resize-none pr-20"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (message.trim()) handleSendMessage();
                          }
                        }}
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1.5">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 rounded-full"
                          onClick={handleAttachFile}
                          disabled={isLoading || thinking}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelected}
                            className="hidden"
                            accept="image/*,application/pdf"
                          />
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Attach file</span>
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant={isRecording ? "destructive" : "ghost"}
                          className={`h-7 w-7 rounded-full ${isRecording ? "animate-pulse" : ""}`}
                          onClick={toggleRecording}
                          disabled={isLoading || thinking}
                        >
                          {isRecording ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Mic className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
                        </Button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="bg-medical-500 hover:bg-medical-600 h-[52px] px-4"
                      disabled={!message.trim() || isLoading || thinking}
                    >
                      {isLoading || thinking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      <span>Send</span>
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-medical-100 shadow-sm">
                <CardHeader className="pb-2 bg-gradient-to-r from-medical-50 to-background">
                  <CardTitle className="text-base">Suggested Questions</CardTitle>
                  <CardDescription>
                    Topics you might want to explore
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-2.5">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left font-normal whitespace-normal h-auto py-3 border-medical-100/60 hover:bg-medical-50/50 hover:border-medical-200"
                      onClick={() => handleSuggestedQuestion(question.text)}
                      disabled={isLoading || thinking}
                    >
                      <div className="mr-2 text-medical-500">{question.icon}</div>
                      {question.text}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {isAdvancedMode && (
                <Card className="border-medical-100 shadow-sm">
                  <CardHeader className="pb-2 bg-gradient-to-r from-medical-50 to-background">
                    <CardTitle className="text-base">Advanced Features</CardTitle>
                    <CardDescription>
                      Personalized AI capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {advancedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-medical-500 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        These advanced features provide personalized health insights based on your medical records, preferences, and health goals.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-medical-100 shadow-sm">
                <CardHeader className="pb-2 bg-gradient-to-r from-medical-50 to-background">
                  <CardTitle className="text-base">Need Human Help?</CardTitle>
                  <CardDescription>
                    Connect with healthcare providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-2.5">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-medical-100/60 hover:bg-medical-50/50 hover:border-medical-200"
                    onClick={() => navigate("/appointments/new")}
                  >
                    <Plus className="mr-2 h-4 w-4 text-medical-500" />
                    Schedule an appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-medical-100/60 hover:bg-medical-50/50 hover:border-medical-200"
                    onClick={() => window.open("tel:+1234567890")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4 text-medical-500" />
                    Contact support
                  </Button>
                </CardContent>
                <CardFooter className="pt-2 pb-4">
                  <p className="text-xs text-muted-foreground">
                    24/7 telehealth services available through your student insurance plan
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiAssistant;
