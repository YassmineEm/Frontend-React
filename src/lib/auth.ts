import axios from "axios"
import { jwtDecode } from "jwt-decode"

const API_URL = import.meta.env.VITE_API_BASE_URL

interface JwtPayload {
  sub: string
  role: "admin" | "client"
  exp: number
}

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  const token = response.data.access_token
  localStorage.setItem("token", token)
  const user = jwtDecode<JwtPayload>(token)
  return { token, user }
}

export async function signup(data: {
  first_name: string
  last_name: string
  email: string
  password: string
  role?: string
}) {
  const response = await axios.post(`${API_URL}/auth/register`, data)
  
  
  const token = response.data.access_token
  localStorage.setItem("token", token)
  const user = jwtDecode<JwtPayload>(token)
  
  return { token, user } 
}

export async function googleLogin(tokenId: string) {
  const role = localStorage.getItem("selectedRole") || "client"; 

  const response = await axios.post(`${API_URL}/auth/google-login`, {
    token: tokenId,
    role: role, 
  });

  const token = response.data.access_token;
  localStorage.setItem("token", token);

  const user = jwtDecode<JwtPayload>(token);
  return { token, user };
}

export function logout() {
  localStorage.removeItem("token")
}

export function getToken() {
  return localStorage.getItem("token")
}

export function getUser(): JwtPayload | null {
  try {
    const token = getToken()
    if (!token) return null

    const user = jwtDecode<JwtPayload>(token)
    const now = Date.now() / 1000

    if (user.exp < now) {
      logout()
      return null
    }

    return user
  } catch (e) {
    console.error("Erreur lors du décodage du token :", e)
    logout()
    return null
  }
}

export function getUserRole(): "admin" | "client" | null {
  const user = getUser()
  return user?.role ?? null
}

export function isAuthenticated(): boolean {
  try {
    const user = getUser()
    return !!user
  } catch (e) {
    return false
  }
}





