import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Bot, User } from "lucide-react"

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-ai-blue via-white to-ai-green dark:from-[#0f172a] dark:via-black dark:to-[#1e1e1e] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-ai-text dark:text-white mb-4">
        Welcome to AI Support Platform
      </h1>
      <p className="text-lg text-ai-text-light dark:text-gray-400 mb-12 max-w-xl">
        Select your role to access the appropriate interface. Admins can manage documents,
        analyze interactions, and monitor agent performance. Clients can chat with the intelligent assistant.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Admin Access */}
        <Link to="/auth?as=admin" className="group">
          <Button className="flex items-center gap-3 bg-gradient-to-r from-ai-blue to-ai-green text-white px-6 py-4 rounded-xl shadow-elegant hover:scale-105 transition-transform text-lg dark:shadow-none">
            <Bot className="w-5 h-5" />
            Admin Panel
          </Button>
        </Link>

        {/* Client Access */}
        <Link to="/auth?as=client" className="group">
          <Button
            variant="outline"
            className="flex items-center gap-3 border border-ai-border dark:border-gray-600 px-6 py-4 rounded-xl text-lg hover:bg-ai-blue-light/20 dark:hover:bg-gray-700/40 transition-transform"
          >
            <User className="w-5 h-5" />
            Chatbot Client
          </Button>
        </Link>
      </div>
    </div>
  )
}