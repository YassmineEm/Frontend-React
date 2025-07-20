import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Bot, User, Moon, Sun } from "lucide-react"

export default function RoleSelectionPage() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  const handleSelectRole = (role: "admin" | "client") => {
    localStorage.setItem("selectedRole", role)
    if (role === "admin") {
      navigate("/auth/signup")
    } else {
      navigate("/chat")
    } 
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-ai-blue via-white to-ai-green dark:from-[#0f172a] dark:via-black dark:to-[#1e1e1e] text-center px-4 relative">

      {/* Logo + Titre */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 group">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 dark:shadow-none">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-ai-green rounded-full animate-pulse-glow dark:bg-[#10b981]" />
        </div>
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-ai-text to-ai-text-light bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            AI Support
          </span>
          <div className="text-xs text-ai-text-light font-medium dark:text-gray-400">
            Intelligent Assistant
          </div>
        </div>
      </div>

      {/* Boutons Sign In / Sign Up / Toggle Theme */}
      <div className="absolute top-6 right-6 flex items-center space-x-3">
        <Link to="/auth/signup">
          <Button className="bg-gradient-to-r from-ai-blue to-ai-green text-white rounded-full px-4 py-2 shadow-elegant hover:shadow-glow hover:scale-105 transition-transform text-sm dark:shadow-none">
            Sign Up
          </Button>
        </Link>
        <Link to="/auth">
          <Button
            variant="ghost"
            className="border border-ai-border text-ai-text-light rounded-full px-4 py-2 hover:bg-ai-blue-light/30 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50"
          >
            Sign In
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full border border-ai-border dark:border-gray-600"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Texte central */}
      <h1 className="text-4xl md:text-5xl font-bold text-ai-text dark:text-white mb-4 mt-16">
        Welcome to AI Support Platform
      </h1>
      <p className="text-lg text-ai-text-light dark:text-gray-400 mb-12 max-w-xl">
        Select your role to access the appropriate interface. Admins can manage documents,
        analyze interactions, and monitor agent performance. Clients can chat with the intelligent assistant.
      </p>

      {/* Choix de rôle */}
      <div className="flex flex-col md:flex-row gap-8">
        <Button
          onClick={() => handleSelectRole("admin")}
          className="flex items-center gap-3 bg-gradient-to-r from-ai-blue to-ai-green text-white px-6 py-4 rounded-xl shadow-elegant hover:scale-105 transition-transform text-lg dark:shadow-none"
        >
          <Bot className="w-5 h-5" />
          Admin Panel
        </Button>
        <Button
          onClick={() => handleSelectRole("client")}
          variant="outline"
          className="flex items-center gap-3 border border-ai-border dark:border-gray-600 px-6 py-4 rounded-xl text-lg hover:bg-ai-blue-light/20 dark:hover:bg-gray-700/40 transition-transform"
        >
          <User className="w-5 h-5" />
          Chatbot Client
        </Button>
      </div>
    </div>
  )
}

