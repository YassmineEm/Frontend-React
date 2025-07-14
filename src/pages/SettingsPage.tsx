import { useState } from "react"
import { Settings, Database, Trash2, Download, RefreshCw, Bot, Shield, Zap, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [llmModel, setLlmModel] = useState("gpt-4")
  const [vectorDb, setVectorDb] = useState("pinecone")
  const [autoResponse, setAutoResponse] = useState(true)
  const [logRetention, setLogRetention] = useState("30")

  const models = [
    { value: "gpt-4", label: "GPT-4", provider: "OpenAI", status: "active" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", provider: "OpenAI", status: "active" },
    { value: "claude-3", label: "Claude 3", provider: "Anthropic", status: "active" },
    { value: "gemini-pro", label: "Gemini Pro", provider: "Google", status: "beta" },
  ]

  const vectorDatabases = [
    { value: "pinecone", label: "Pinecone", status: "Connected", color: "text-ai-green" },
    { value: "weaviate", label: "Weaviate", status: "Available", color: "text-ai-text-light" },
    { value: "chroma", label: "ChromaDB", status: "Available", color: "text-ai-text-light" },
    { value: "qdrant", label: "Qdrant", status: "Available", color: "text-ai-text-light" },
  ]

  const systemLogs = [
    { timestamp: "2024-01-15 14:30", action: "Document Uploaded", details: "FAQ_product.pdf", type: "success" },
    { timestamp: "2024-01-15 14:25", action: "Model Changed", details: "GPT-4 → GPT-3.5", type: "info" },
    { timestamp: "2024-01-15 14:20", action: "Vector Database", details: "Index updated", type: "success" },
    { timestamp: "2024-01-15 14:15", action: "User Login", details: "admin@company.com", type: "info" },
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant">
            <Settings className="w-4 h-4 mr-2" />
            System Configuration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4">
            Settings & Administration
          </h1>
          <p className="text-xl text-ai-text-light max-w-2xl mx-auto">
            Configure your AI chatbot settings and manage system parameters for optimal performance.
          </p>
        </div>

        {/* AI Model Configuration */}
        <Card
          className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span>AI Model Configuration</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Select your preferred language model and vector database for optimal AI performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="llm-model" className="text-base font-semibold text-ai-text">
                  Language Model
                </Label>
                <Select value={llmModel} onValueChange={setLlmModel}>
                  <SelectTrigger className="bg-ai-bg border-ai-border rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{model.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {model.provider}
                            </Badge>
                          </div>
                          <Badge
                            className={`ml-2 text-xs ${
                              model.status === "active"
                                ? "bg-ai-green-light text-ai-green"
                                : "bg-ai-yellow-light text-orange-600"
                            } border-0`}
                          >
                            {model.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="vector-db" className="text-base font-semibold text-ai-text">
                  Vector Database
                </Label>
                <Select value={vectorDb} onValueChange={setVectorDb}>
                  <SelectTrigger className="bg-ai-bg border-ai-border rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vectorDatabases.map((db) => (
                      <SelectItem key={db.value} value={db.value}>
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{db.label}</span>
                          <Badge
                            className={`ml-2 text-xs ${
                              db.status === "Connected"
                                ? "bg-ai-green-light text-ai-green"
                                : "bg-gray-100 text-gray-600"
                            } border-0`}
                          >
                            {db.status}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="system-prompt" className="text-base font-semibold text-ai-text">
                System Prompt
              </Label>
              <Textarea
                id="system-prompt"
                placeholder="You are an AI assistant specialized in customer support..."
                className="min-h-[120px] bg-ai-bg border-ai-border rounded-xl resize-none"
                defaultValue="You are an AI assistant specialized in customer support. Respond professionally, empathetically, and accurately based on the provided documents and conversation context. Always aim to be helpful and solution-oriented."
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card
          className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-elegant">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>System Configuration</span>
            </CardTitle>
            <CardDescription className="text-lg">Configure system behavior and operational parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/20 rounded-xl border border-ai-border/50">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-ai-text">Automatic Responses</Label>
                <p className="text-sm text-ai-text-light">Enable AI chatbot to respond automatically to user queries</p>
              </div>
              <Switch
                checked={autoResponse}
                onCheckedChange={setAutoResponse}
                className="data-[state=checked]:bg-ai-green"
              />
            </div>

            <Separator className="bg-ai-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="log-retention" className="text-base font-semibold text-ai-text">
                  Log Retention (days)
                </Label>
                <Input
                  id="log-retention"
                  type="number"
                  value={logRetention}
                  onChange={(e) => setLogRetention(e.target.value)}
                  className="bg-ai-bg border-ai-border rounded-xl h-12"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold text-ai-text">Token Limit per Request</Label>
                <Input type="number" defaultValue="4000" className="bg-ai-bg border-ai-border rounded-xl h-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card
          className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-elegant">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span>Data Management</span>
            </CardTitle>
            <CardDescription className="text-lg">Manage your data and perform maintenance operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-ai-bg border-ai-border hover:bg-ai-blue-light/50 hover:border-ai-blue rounded-xl h-12 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </Button>

              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-ai-bg border-ai-border hover:bg-ai-green-light/50 hover:border-ai-green rounded-xl h-12 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reindex Database</span>
              </Button>

              <Button
                variant="destructive"
                className="flex items-center space-x-2 rounded-xl h-12 transition-all duration-300 hover:shadow-elegant"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset System</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card
          className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-elegant">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span>System Activity Logs</span>
            </CardTitle>
            <CardDescription className="text-lg">
              Monitor system events and user activities in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemLogs.map((log, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full ${log.type === "success" ? "bg-ai-green" : "bg-ai-blue"}`}
                      ></div>
                      <span className="font-semibold text-ai-text">{log.action}</span>
                      <Badge variant="outline" className="text-xs bg-ai-surface border-ai-border">
                        {log.timestamp}
                      </Badge>
                    </div>
                    <p className="text-sm text-ai-text-light ml-5">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                size="sm"
                className="bg-ai-bg border-ai-border hover:bg-ai-blue-light/50 hover:border-ai-blue rounded-xl transition-all duration-300"
              >
                <Globe className="w-4 h-4 mr-2" />
                View All System Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
