import { Routes, Route } from "react-router-dom"
import { Header } from "@/components/layout/header"
import RoleSelectionPage from "@/pages/RoleSelectionPage"
import HomePage from "@/pages/HomePage"
import ChatPage from "@/pages/ChatPage"
import UploadPage from "@/pages/UploadPage"
import LoginPage from "@/pages/LoginPage"
import SignupPage from "@/pages/SignupPage"
import SettingsPage from "@/pages/SettingsPage"
import AnalyticsPage from "@/pages/AnalyticsPage"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function App() {
  return (
    <div className="min-h-screen bg-ai-bg font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<RoleSelectionPage />} />

          
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />

          
          <Route
            path="/chat"
            element={
              <ProtectedRoute roles={["admin", "client"]}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute roles={["admin", "client"]}>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/upload"
            element={
              <ProtectedRoute roles={["admin"]}>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute roles={["admin", "client"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}


