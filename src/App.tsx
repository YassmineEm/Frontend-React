import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/header"
import HomePage from "@/pages/HomePage"
import ChatPage from "@/pages/ChatPage"
import UploadPage from "@/pages/UploadPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import SettingsPage from "@/pages/SettingsPage"
import AnalyticsPage from "@/pages/AnalyticsPage"



export default function App() {
  return (
    <div className="min-h-screen bg-ai-bg font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  )
}

