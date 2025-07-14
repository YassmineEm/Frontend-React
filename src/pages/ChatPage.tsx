import { useState } from "react"
import { Send, ThumbsUp, ThumbsDown, Bot, User, Filter, Sparkles, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { chatWithBot } from "@/lib/api";

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  feedback?: "positive" | "negative"
  sources?: string[]
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI support assistant. I'm here to help you with any questions based on your uploaded documents and conversation history. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      sources: ["Knowledge Base"],
    },
  ])
  const [input, setInput] = useState("")
  const [dataSource, setDataSource] = useState("both")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await chatWithBot(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Erreur backend:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Chat Assistant
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4">
            Chat with AI
          </h1>
          <p className="text-xl text-ai-text-light max-w-2xl mx-auto">
            Ask questions and get intelligent responses based on your documents and conversation history.
          </p>
        </div>

        {/* Data Source Filter */}
        <Card
          className="mb-6 border-0 shadow-elegant bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-ai-blue to-ai-green rounded-lg flex items-center justify-center shadow-elegant">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <span>Data Source Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={dataSource} onValueChange={setDataSource}>
              <SelectTrigger className="w-full md:w-80 bg-ai-bg border-ai-border rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="documents">📄 Uploaded Documents Only</SelectItem>
                <SelectItem value="chats">💬 Chat History Only</SelectItem>
                <SelectItem value="both">🔄 Documents + Chat History</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card
          className="mb-6 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div className={`max-w-xs lg:max-w-2xl ${message.sender === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      {message.sender === "ai" ? (
                        <div className="w-6 h-6 bg-gradient-to-br from-ai-blue to-ai-green rounded-full flex items-center justify-center shadow-elegant">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-gradient-to-br from-ai-green to-ai-green/80 rounded-full flex items-center justify-center shadow-elegant">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className="text-xs font-medium text-ai-text-light">{formatTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={`rounded-2xl p-4 shadow-elegant ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-ai-green to-ai-green/90 text-white"
                          : "bg-ai-surface border border-ai-border/50"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>

                      {/* Sources */}
                      {message.sources && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.sources.map((source, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-ai-blue-light text-ai-blue border-0"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Feedback buttons for AI messages */}
                    {message.sender === "ai" && (
                      <div className="flex items-center space-x-3 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, "positive")}
                          className={`p-2 h-auto rounded-xl transition-all duration-300 ${
                            message.feedback === "positive"
                              ? "text-ai-green bg-ai-green-light shadow-elegant"
                              : "text-ai-text-light hover:text-ai-green hover:bg-ai-green-light/50"
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, "negative")}
                          className={`p-2 h-auto rounded-xl transition-all duration-300 ${
                            message.feedback === "negative"
                              ? "text-red-500 bg-red-50 shadow-elegant"
                              : "text-ai-text-light hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                        <span className="text-xs text-ai-text-light font-medium">Was this helpful?</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-xs lg:max-w-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-ai-blue to-ai-green rounded-full flex items-center justify-center shadow-elegant">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-ai-text-light">AI is thinking...</span>
                    </div>
                    <div className="bg-ai-surface border border-ai-border/50 rounded-2xl p-4 shadow-elegant">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-ai-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-ai-blue rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card
          className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
                className="flex-1 bg-ai-bg border-ai-border rounded-xl px-4 py-3 text-ai-text placeholder:text-ai-text-light focus:ring-2 focus:ring-ai-blue/20 focus:border-ai-blue transition-all duration-300"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 text-white px-6 py-3 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
