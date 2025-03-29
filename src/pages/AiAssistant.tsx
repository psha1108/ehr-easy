
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, Brain, Info, MessageSquare, Pill, Plus, Send, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
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

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response = "";
      
      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes("medication") || message.toLowerCase().includes("side effect")) {
        response = "Side effects vary depending on the medication. Common side effects might include drowsiness, nausea, or headaches. It's important to read your prescription information and consult with your healthcare provider about any concerns. Would you like me to help schedule an appointment with your doctor?";
      } else if (message.toLowerCase().includes("stress") || message.toLowerCase().includes("anxiety")) {
        response = "Managing stress during exams is important. Try techniques like deep breathing, regular breaks, adequate sleep, and exercise. Our Student Wellness Center also offers free counseling services. Would you like information about these resources?";
      } else if (message.toLowerCase().includes("flu") || message.toLowerCase().includes("vaccine")) {
        response = "Flu vaccines are typically available in early fall. For students, the University Health Center offers free flu shots starting in September. Would you like me to help you schedule an appointment for a flu shot?";
      } else if (message.toLowerCase().includes("allergy") || message.toLowerCase().includes("allergies")) {
        response = "For allergies, over-the-counter antihistamines can help with symptoms. If your allergies are severe, you might benefit from seeing an allergist. The University Health Center can provide allergy testing. Would you like to schedule an appointment?";
      } else if (message.toLowerCase().includes("appointment")) {
        response = "I'd be happy to help you schedule an appointment. You can go to the Appointments section to book a new appointment, or I can guide you there. Would you like me to take you to the appointment booking page?";
      } else {
        response = "Thank you for your message. While I can provide general health information, I recommend consulting with a healthcare professional for specific medical advice. Is there something specific you'd like to know about our health services?";
      }
      
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      
      setChatHistory((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
              <h1 className="text-3xl font-bold tracking-tight">AI Health Assistant</h1>
              <p className="text-muted-foreground">
                Get answers to your health questions and guidance for your healthcare needs
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="flex flex-col h-[600px]">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar-ai.png" alt="AI Assistant" />
                      <AvatarFallback className="bg-medical-100 text-medical-700">AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">EHR Health Assistant</CardTitle>
                      <CardDescription className="text-xs">Powered by AI</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pt-0 pb-4">
                  <div className="flex flex-col gap-4">
                    {chatHistory.map((chat, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          chat.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            chat.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          <Avatar className="h-8 w-8 mt-1">
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
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                chat.role === "user"
                                  ? "bg-medical-500 text-white"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{chat.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-1">
                              {formatTime(chat.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/avatar-ai.png" alt="AI Assistant" />
                            <AvatarFallback className="bg-medical-100 text-medical-700">AI</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="rounded-lg p-3 bg-muted flex items-center space-x-2">
                              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse"></div>
                              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-75"></div>
                              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse delay-150"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <form
                    className="flex w-full gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                  >
                    <Input
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!message.trim() || isLoading}
                      className="bg-medical-500 hover:bg-medical-600"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Suggested Questions</CardTitle>
                  <CardDescription>
                    Questions you might want to ask
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left font-normal whitespace-normal h-auto py-3"
                      onClick={() => handleSuggestedQuestion(question.text)}
                    >
                      <div className="mr-2 text-medical-500">{question.icon}</div>
                      {question.text}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Need Human Help?</CardTitle>
                  <CardDescription>
                    Connect with healthcare providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => navigate("/appointments/new")}
                  >
                    <Plus className="mr-2 h-4 w-4 text-medical-500" />
                    Schedule an appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => window.open("tel:+1234567890")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4 text-medical-500" />
                    Contact support
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">How can I help you?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    I can answer questions about:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                    <li>Your medications and prescriptions</li>
                    <li>Health and wellness advice</li>
                    <li>Student health services</li>
                    <li>Appointment scheduling</li>
                    <li>Common health concerns</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Note: This AI assistant provides general information only. Please consult with a healthcare professional for medical advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AiAssistant;
