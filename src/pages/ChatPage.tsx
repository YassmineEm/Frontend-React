import { useState, useEffect } from "react"
import {
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { chatWithBot, fetchChatHistory } from "@/lib/api"

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
  const [isTyping, setIsTyping] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ question: string; timestamp: string }[]>([])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await chatWithBot(input)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err) {
      console.error("Erreur backend:", err)
    } finally {
      setIsTyping(false)
    }
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg))
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    if (showDrawer) {
      fetchChatHistory()
        .then((data) => setChatHistory(data.conversations))
        .catch((err) => console.error("Erreur historique :", err))
    }
  }, [showDrawer])

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-8 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant dark:shadow-none">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Chat Assistant
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4 dark:from-[#ffffff] dark:to-[#a5b4fc]">
            Chat with AI
          </h1>
          <p className="text-xl text-ai-text-light max-w-2xl mx-auto dark:text-white/80">
            Ask questions and get intelligent responses based on your documents and conversation history.
          </p>
        </div>

        <div className="flex justify-end mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <Button
            onClick={() => setShowDrawer(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-ai-blue to-ai-green text-white px-5 py-3 rounded-xl shadow-elegant hover:shadow-glow hover:scale-105 transition-transform duration-300 dark:shadow-none"
          >
            <Menu className="w-4 h-4" />
            <span>Old Conversations</span>
          </Button>
        </div>

        <Card className="mb-6 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div className={`max-w-xs lg:max-w-2xl ${message.sender === "user" ? "order-2" : "order-1"}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-elegant ${
                        message.sender === "ai"
                          ? "bg-gradient-to-br from-ai-blue to-ai-green"
                          : "bg-gradient-to-br from-ai-green to-ai-green/80"
                      }`}>
                        {message.sender === "ai" ? <Bot className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-medium text-ai-text-light dark:text-gray-400">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className={`rounded-2xl p-4 shadow-elegant ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-ai-green to-ai-green/90 text-white"
                        : "bg-ai-surface border border-ai-border/50 dark:bg-[#2a2a2a] dark:border-gray-700"
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap dark:text-gray-200">{message.content}</p>

                      {message.sources && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.sources.map((source, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-ai-blue-light text-ai-blue border-0 dark:bg-[#3b82f6]/20 dark:text-[#93c5fd]"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.sender === "ai" && (
                      <div className="flex items-center space-x-3 mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, "positive")}
                          className={`p-2 h-auto rounded-xl transition-all duration-300 ${
                            message.feedback === "positive"
                              ? "text-ai-green bg-ai-green-light shadow-elegant dark:bg-[#10b981]/20 dark:text-[#6ee7b7]"
                              : "text-ai-text-light hover:text-ai-green hover:bg-ai-green-light/50 dark:text-gray-400 dark:hover:text-[#6ee7b7] dark:hover:bg-[#10b981]/10"
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
                              ? "text-red-500 bg-red-50 shadow-elegant dark:bg-[#ef4444]/20 dark:text-[#fca5a5]"
                              : "text-ai-text-light hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-[#fca5a5] dark:hover:bg-[#ef4444]/10"
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                        </Button>
                        <span className="text-xs text-ai-text-light font-medium dark:text-gray-400">Was this helpful?</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-xs lg:max-w-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-ai-blue to-ai-green rounded-full flex items-center justify-center shadow-elegant">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-ai-text-light dark:text-gray-400">AI is thinking...</span>
                    </div>
                    <div className="bg-ai-surface border border-ai-border/50 rounded-2xl p-4 shadow-elegant dark:bg-[#2a2a2a] dark:border-gray-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce dark:bg-[#93c5fd]"></div>
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-ai-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
                className="flex-1 bg-ai-bg border-ai-border rounded-xl px-4 py-3 text-ai-text placeholder:text-ai-text-light focus:ring-2 focus:ring-ai-blue/20 focus:border-ai-blue transition-all duration-300 dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:ring-[#3b82f6]/50 dark:focus:border-[#3b82f6]"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 text-white px-6 py-3 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none dark:shadow-none"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
        <DrawerContent className="p-6 bg-ai-surface border-t border-ai-border dark:bg-[#1e1e1e] dark:border-gray-700">
          <DrawerHeader>
            <DrawerTitle className="text-lg text-ai-text dark:text-gray-200">Old Conversations</DrawerTitle>
          </DrawerHeader>
          <div className="mt-4 max-h-64 overflow-y-auto space-y-3 pr-2 text-sm text-ai-text-light custom-scrollbar dark:text-gray-400">
            {chatHistory.length === 0 ? (
              <p className="italic dark:text-gray-500">No previous conversations found.</p>
            ) : (
              chatHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <p
                   className="font-medium cursor-pointer hover:text-ai-blue dark:hover:text-[#93c5fd] dark:text-gray-300"
                   onClick={() => setInput(item.question)}
                  >
                  • {item.question}
                  </p>
                  <p className="text-xs text-ai-text-light/70 dark:text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
