import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { type ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  roles?: ("admin" | "client")[]
}

export const ProtectedRoute = ({ children, roles = [] }: ProtectedRouteProps) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" />

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}
