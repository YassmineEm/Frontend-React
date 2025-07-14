import axios from "axios";

const BASE_URL = "http://localhost:8000"; 

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${BASE_URL}/documents/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}


export async function chatWithBot(question: string) {
  const formData = new FormData();
  formData.append("question", question);
  const res = await fetch(`${BASE_URL}/chatbot/chat`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to communicate with chatbot");
  }
  return res.json();
}


export async function analyzeChat(file: File, agent?: string) {
  const formData = new FormData();
  formData.append("file", file);
  if (agent) formData.append("agent", agent);
  const res = await fetch(`${BASE_URL}/analyze/analyze`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}


export async function batchAnalyze(files: File[], agent: string) {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  formData.append("agent", agent);
  const res = await fetch(`${BASE_URL}/analyze/analyze/batch-upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to upload and analyze batch logs");
  }
  return res.json();
}


export async function getDashboardData() {
  const res = await fetch(`${BASE_URL}/analyze/dashboard`);
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }
  return res.json();
}


export async function register(user: { email: string; password: string; role: string }) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}


export async function login(user: { email: string; password: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

