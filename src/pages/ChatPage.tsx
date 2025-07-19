import { useState, useEffect, useRef } from "react"
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
import { chatWithBot , fetchConversationList} from "@/lib/api"

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
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automatique vers le bas quand messages changent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Récupérer historique des conversations quand drawer s'ouvre
  useEffect(() => {
  if (showDrawer) {
    fetchConversationList()
      .then((data) => {
        setChatHistory(data); 
      })
      .catch((err) => {
        console.error("Erreur historique :", err);
        setError("Impossible de charger l'historique des conversations.");
      });
  }
}, [showDrawer]);

  const sendMessage = async () => {
    if (!input.trim()) return
    setError(null)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await chatWithBot(userMessage.content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        sender: "ai",
        timestamp: new Date(),
        sources: response.sources || [], // si backend renvoie sources
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      console.error("Erreur backend:", err)
      setError(err.message || "Une erreur est survenue lors de la requête au chatbot.")
    } finally {
      setIsTyping(false)
    }
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg))
    )
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  // Gestion envoi via Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isTyping) sendMessage()
    }
  }

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
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-elegant ${
                          message.sender === "ai"
                            ? "bg-gradient-to-br from-ai-blue to-ai-green"
                            : "bg-gradient-to-br from-ai-green to-ai-green/80"
                        }`}
                      >
                        {message.sender === "ai" ? <Bot className="w-3 h-3 text-white" /> : <User className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs font-medium text-ai-text-light dark:text-gray-400">{formatTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={`rounded-2xl p-4 shadow-elegant ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-ai-green to-ai-green/90 text-white"
                          : "bg-ai-surface border border-ai-border/50 dark:bg-[#2a2a2a] dark:border-gray-700"
                      }`}
                    >
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
                          className={`hover:text-green-600 dark:hover:text-green-400 ${message.feedback === "positive" ? "text-green-600 dark:text-green-400" : "text-gray-500"}`}
                          aria-label="Like"
                          title="Like"
                        >
                          <ThumbsUp />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, "negative")}
                          className={`hover:text-red-600 dark:hover:text-red-400 ${message.feedback === "negative" ? "text-red-600 dark:text-red-400" : "text-gray-500"}`}
                          aria-label="Dislike"
                          title="Dislike"
                        >
                          <ThumbsDown />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardHeader className="flex items-center gap-2 px-6 py-4 border-t border-ai-border/50 dark:border-gray-700">
             <div className="flex w-full items-center space-x-2">
             <Input
              type="text"
              placeholder={isTyping ? "AI is typing..." : "Write your message here..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-ai-bg/80 dark:bg-[#1e1e1e]/70 text-ai-text-light dark:text-white focus:ring-2 focus:ring-ai-blue transition"
              aria-label="Chat input"
              autoFocus
            />
             <Button
              onClick={sendMessage}
              disabled={isTyping || !input.trim()}
              aria-label="Send message"
              className="bg-gradient-to-r from-ai-blue to-ai-green text-white px-4 py-2 rounded-xl shadow-elegant hover:shadow-glow transition"
             >
             <Send className="w-5 h-5" />
             </Button>
            </div>
          </CardHeader>
          {error && (
            <div className="text-center text-red-600 p-2 font-semibold">
              {error}
            </div>
          )}
        </Card>

        {/* Drawer for old conversations */}
        <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Old Conversations</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              {chatHistory.length === 0 ? (
                <p className="text-center text-ai-text-light dark:text-white/70">
                  No previous conversations found.
                </p>
              ) : (
                <ul className="space-y-4">
                  {chatHistory.map(({ question, timestamp }, index) => (
                    <li key={index} className="p-3 border border-ai-border rounded-lg cursor-pointer hover:bg-ai-blue-light/10 dark:hover:bg-[#3b82f6]/20 transition">
                      <p className="font-semibold text-ai-text dark:text-white">{question}</p>
                      <p className="text-xs text-ai-text-light dark:text-gray-400">{new Date(timestamp).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}

