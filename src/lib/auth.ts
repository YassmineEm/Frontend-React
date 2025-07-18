import axios from "axios"
// @ts-ignore
const jwtDecode = require("jwt-decode") as <T>(token: string) => T

const API_URL = import.meta.env.VITE_API_BASE_URL

// Structure du payload décodé du token JWT
interface JwtPayload {
  sub: string
  role: "admin" | "client"
  exp: number
}

// Connexion classique (email + mot de passe)
export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })

  const token = response.data.access_token
  localStorage.setItem("token", token)

  const user = jwtDecode<JwtPayload>(token)
  return { token, user }
}

// Inscription
export async function signup(data: {
  first_name: string
  last_name: string
  email: string
  password: string
  role?: string
}) {
  const response = await axios.post(`${API_URL}/auth/register`, data)
  return response.data
}

// Connexion via Google (token reçu du provider)
export async function googleLogin(tokenId: string) {
  const response = await axios.post(`${API_URL}/auth/google-login`, {
    token: tokenId,
  })

  const token = response.data.access_token
  localStorage.setItem("token", token)

  const user = jwtDecode<JwtPayload>(token)
  return { token, user }
}

// Déconnexion
export function logout() {
  localStorage.removeItem("token")
}

// Récupérer le token actuel
export function getToken() {
  return localStorage.getItem("token")
}

// Récupérer les données utilisateur à partir du token
export function getUser(): JwtPayload | null {
  const token = getToken()
  if (!token) return null

  try {
    return jwtDecode<JwtPayload>(token)
  } catch {
    return null
  }
}

// Récupérer uniquement le rôle
export function getUserRole(): "admin" | "client" | null {
  const user = getUser()
  return user?.role ?? null
}

// Vérifie si l'utilisateur est connecté
export function isAuthenticated(): boolean {
  return !!getToken()
}


