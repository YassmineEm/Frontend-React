import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { getUser, isAuthenticated, logout } from "../lib/auth"

type User = {
  sub: string
  role: "admin" | "client"
  exp: number
}

interface AuthContextType {
  user: User | null
  isAuth: boolean
  signOut: () => void
  setUser: (user: User | null) => void      
  setIsAuth: (auth: boolean) => void           
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getUser())
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated())

  useEffect(() => {
    setUser(getUser())
    setIsAuth(isAuthenticated())
  }, [])

  const signOut = () => {
    logout()
    setUser(null)
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, signOut, setUser, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

