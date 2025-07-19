import { Link, useLocation ,useNavigate} from "react-router-dom"
import {
  Bot,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

export function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate();
  const { user, isAuth, signOut } = useAuth();

  const isAuthPage = pathname.startsWith("/auth");

  
  const handleLogout = () => {
    signOut();      
    navigate("/");    
  };

  const navigation = [
    ...(user?.role === "admin"
      ? [{ name: "Documents", href: "/upload", icon: FileText }]
      : []),
    ...(isAuth
      ? [{ name: "Chat", href: "/chat", icon: MessageSquare }]
      : []),
    ...(user?.role === "admin"
      ? [{ name: "Analytics", href: "/analytics", icon: BarChart3 }]
      : []),
    ...(isAuth
      ? [{ name: "Settings", href: "/settings", icon: Settings }]
      : []),
  ]

  return (
    <header className="sticky top-0 z-50 bg-ai-surface/80 backdrop-blur-xl border-b border-ai-border/50 shadow-elegant dark:bg-[#1e1e1e]/80 dark:border-gray-700/50 dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO & TITLE */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 dark:shadow-none">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-ai-green rounded-full animate-pulse-glow dark:bg-[#10b981]"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-ai-text to-ai-text-light bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  AI Support
                </span>
                <div className="text-xs text-ai-text-light font-medium dark:text-gray-400">
                  Intelligent Assistant
                </div>
              </div>
            </Link>
          </div>

          {/* NAVIGATION */}
          {!isAuthPage && (
            <nav className="hidden md:flex justify-center items-center space-x-2 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant="ghost"
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-ai-blue to-ai-green text-white shadow-elegant dark:shadow-none"
                          : "text-ai-text-light hover:text-ai-text hover:bg-ai-blue-light/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue to-ai-green rounded-xl opacity-10 dark:opacity-20"></div>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          )}

          {!isAuthPage && (
            <div className="flex items-center space-x-3">
              {!isAuth ? (
                <>
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
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 border border-ai-border-light text-ai-text-light hover:text-ai-red hover:border-ai-red/50 hover:shadow-red-glow dark:border-gray-600 dark:text-gray-300 dark:hover:text-red-400 dark:hover:border-red-400/50 dark:hover:shadow-red-glow/20"
                >
                Logout
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}



