const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 🔐 Récupère le token stocké
function getToken() {
  return localStorage.getItem("token")
}

// 📦 Wrapper fetch avec Authorization automatique
async function authFetch(url: string, options: RequestInit = {}) {
  const token = getToken()

  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.detail || "Une erreur est survenue")
  }

  return res.json()
}

// 📄 Upload document
export async function uploadDocument(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return authFetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  })
}

// 💬 Chat (authentifié ou anonyme)
export async function chatWithBot(question: string, conversationId?: string) {
  const token = getToken()
  const isLoggedIn = !!token

  const endpoint = isLoggedIn
    ? `${BASE_URL}/chatbot/chat`
    : `${BASE_URL}/chatbot/chat-anonymous`

  const body = JSON.stringify({ question, conversation_id: conversationId || null })

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(isLoggedIn ? { Authorization: `Bearer ${token}` } : {}),
    },
    body,
  }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.detail || "Erreur chatbot")
    }
    return res.json()
  })
}

// 📄 Analyse chat (1 fichier)
export async function analyzeChat(file: File, agent?: string) {
  const formData = new FormData()
  formData.append("file", file)
  if (agent) formData.append("agent", agent)

  return authFetch(`${BASE_URL}/analyze/analyze`, {
    method: "POST",
    body: formData,
  })
}

// 📦 Analyse en batch (plusieurs fichiers)
export async function batchAnalyze(files: File[], agent: string) {
  const formData = new FormData()
  files.forEach((file) => formData.append("files", file))
  formData.append("agent", agent)

  return authFetch(`${BASE_URL}/analyze/analyze/batch-upload`, {
    method: "POST",
    body: formData,
  })
}

// 📊 Dashboard (admin)
export async function getDashboardData() {
  return authFetch(`${BASE_URL}/analyze/dashboard`)
}

// 📜 Liste des conversations (auth)
export async function fetchConversationList() {
  return authFetch(`${BASE_URL}/chatbot/conversation`)
}

// 🗂 Détail d’une conversation
export async function fetchConversationById(conversationId: string) {
  return authFetch(`${BASE_URL}/chatbot/conversation/${conversationId}`)
}

// ✏️ Renommer une conversation
export async function renameConversation(conversationId: string, newName: string) {
  return authFetch(`${BASE_URL}/chatbot/conversation/${conversationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ new_name: newName }),
  })
}

// ❌ Supprimer une conversation
export async function deleteConversation(conversationId: string) {
  return authFetch(`${BASE_URL}/chatbot/conversation/${conversationId}`, {
    method: "DELETE",
  })
}



