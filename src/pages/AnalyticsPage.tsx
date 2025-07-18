import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Clock, MessageSquare, ThumbsUp, Upload, FileText, BarChart3, Sparkles, Target, X, Check, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { batchAnalyze, getDashboardData } from "@/lib/api"

export default function AnalyticsPage() {
  const [uploadedLogs, setUploadedLogs] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [kpis, setKpis] = useState({
    avg_response_time: 0,
    satisfaction_rate: 0,
    tickets_resolved: 0,
    resolution_rate: 0,
  })
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [agentComparison, setAgentComparison] = useState<any[]>([]);
  const [improvements, setImprovements] = useState<any[]>([]);

  const handleUploadLogs = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.txt,.docx";
    input.multiple = true;

    input.onchange = async () => {
      if (!input.files) return;
      const newFiles = Array.from(input.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    input.click();
  };

  const parseValue = (v: string | number) => {
    if (typeof v === "string") {
      return parseFloat(v.replace("%", "").replace("minutes", "").trim())
    }
    return v
  }

  const handleAnalyzeFiles = async () => {
    if (uploadedFiles.length === 0) return
    setProcessing(true)
    try {
      await batchAnalyze(uploadedFiles, "default")
      const data = await getDashboardData()

      setKpis(data.global_kpis)

      setPerformanceData(
        Object.entries(data.overall_performance).map(([metric, score]) => ({
          metric,
          score,
        }))
      )

      setMonthlyData(
        Object.entries(data.monthly_trends).map(([month, values]: [string, any]) => ({
          month,
          ...values,
        }))
      )

      setAgentComparison(
        Object.entries(data.agent_scores).map(([agent, satisfaction]: [string, any]) => ({
          agent,
          satisfaction,
        }))
      )

      if (Array.isArray(data.ai_suggestions)) {
        setImprovements(
          data.ai_suggestions.map((s: any) => {
            let currentDisplay, targetDisplay

            if (s.area.includes("Response Time")) {
              currentDisplay = `${parseValue(s.current)} min`
              targetDisplay = `${parseValue(s.target)} min`
            } else if (s.area.includes("Resolution") || s.area.includes("Satisfaction")) {
              currentDisplay = `${parseValue(s.current)}%`
              targetDisplay = `${parseValue(s.target)}%`
            } else {
              currentDisplay = s.current
              targetDisplay = s.target
            }

            return {
              category: s.area,
              current: s.current,
              target: s.target,
              currentDisplay,
              targetDisplay,
              suggestion: s.recommendation,
              priority: s.priority,
            }
          })
        )
      }

      setUploadedLogs(true)
    } catch (err) {
      console.error("Upload or fetch failed", err)
      alert("Erreur lors du traitement des fichiers")
    } finally {
      setProcessing(false)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
  }

  const rawKpis = [
    {
      title: "Avg Response Time",
      value: `${kpis.avg_response_time.toFixed(2)} min`,
      change: "",
      icon: Clock,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Satisfaction Rate",
      value: `${kpis.satisfaction_rate.toFixed(1)}%`,
      change: "",
      icon: ThumbsUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Tickets Resolved",
      value: `${kpis.tickets_resolved}`,
      change: "",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Resolution Rate",
      value: `${kpis.resolution_rate.toFixed(1)}%`,
      change: "",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant dark:shadow-none">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Analytics
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4 dark:from-white dark:to-[#93c5fd]">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-ai-text-light max-w-3xl mx-auto dark:text-gray-400">
            Analyze agent performance, identify improvement opportunities, and optimize your customer support
            operations.
          </p>
        </div>

        {!uploadedLogs ? (
          <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <span>Upload Conversation Logs</span>
              </CardTitle>
              <CardDescription className="text-lg dark:text-gray-400">
                Upload your conversation logs to generate comprehensive performance analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-br from-ai-blue-light to-ai-green-light rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant dark:from-[#1e40af]/20 dark:to-[#065f46]/20 dark:shadow-none">
                    <FileText className="w-12 h-12 text-ai-blue dark:text-[#93c5fd]" />
                  </div>
                  <h3 className="text-xl font-semibold text-ai-text mb-2 dark:text-white">No conversation data uploaded</h3>
                  <p className="text-ai-text-light mb-8 max-w-md mx-auto dark:text-gray-400">
                    Upload your chat logs to unlock powerful analytics and performance insights
                  </p>
                  <Button
                    onClick={handleUploadLogs}
                    className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 text-white px-8 py-3 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 dark:shadow-none"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Conversation Logs
                  </Button>
                </div>
              ) : (
                <div className="py-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-ai-text flex items-center dark:text-white">
                        <Check className="w-5 h-5 text-ai-green mr-2 dark:text-[#10b981]" />
                        {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} ready for analysis
                      </h3>
                      <Button
                        variant="outline"
                        onClick={handleUploadLogs}
                        className="border-ai-blue text-ai-blue hover:bg-ai-blue/10 px-4 py-2 rounded-xl shadow-sm flex items-center dark:border-[#3b82f6] dark:text-[#93c5fd] dark:hover:bg-[#1e40af]/10"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add More Files
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-ai-bg/50 rounded-lg border border-ai-border/50 hover:shadow-sm transition-shadow dark:bg-[#2a2a2a]/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-3 truncate">
                            <FileText className="w-5 h-5 text-ai-blue flex-shrink-0 dark:text-[#93c5fd]" />
                            <span className="text-ai-text truncate dark:text-white">{file.name}</span>
                            <span className="text-sm text-ai-text-light flex-shrink-0 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-ai-text-light hover:text-ai-red hover:bg-ai-red/10 flex-shrink-0 dark:text-gray-400 dark:hover:text-[#ef4444] dark:hover:bg-[#ef4444]/10"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setUploadedFiles([])}
                      className="border-ai-blue text-ai-blue hover:bg-ai-blue/10 px-6 py-3 rounded-xl shadow-sm dark:border-[#3b82f6] dark:text-[#93c5fd] dark:hover:bg-[#1e40af]/10"
                    >
                      Clear All Files
                    </Button>
                    <Button
                      onClick={handleAnalyzeFiles}
                      disabled={processing || uploadedFiles.length === 0}
                      className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 text-white px-8 py-3 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none dark:shadow-none"
                    >
                      {processing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Analyze Files
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {rawKpis.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-elegant bg-ai-surface/80 backdrop-blur-sm hover:shadow-elegant-lg transition-all duration-300 animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50 dark:hover:shadow-none"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-ai-text-light dark:text-gray-400">{kpi.title}</CardTitle>
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-ai-text mb-1 dark:text-white">{kpi.value}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card
                className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-xl dark:text-white">
                    <Target className="w-5 h-5 text-ai-blue dark:text-[#3b82f6]" />
                    <span>Overall Performance</span>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">Evaluation across 6 key performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={performanceData}>
                      <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" />
                      <PolarAngleAxis 
                        dataKey="metric" 
                        tick={{ fontSize: 12, fill: "#4A5568" }} 
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fontSize: 10, fill: "#4A5568" }} 
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#005CFF"
                        fill="#005CFF"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card
                className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
                style={{ animationDelay: "0.5s" }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-xl dark:text-white">
                    <BarChart3 className="w-5 h-5 text-ai-green dark:text-[#10b981]" />
                    <span>Agent Comparison</span>
                  </CardTitle>
                  <CardDescription className="dark:text-gray-400">Customer satisfaction scores by agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={agentComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="agent" 
                        tick={{ fontSize: 12, fill: "#4A5568" }} 
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: "#4A5568" }} 
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar 
                        dataKey="satisfaction" 
                        fill="url(#greenGradient)" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00B894" />
                          <stop offset="100%" stopColor="#00B894" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card
              className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
              style={{ animationDelay: "0.6s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl dark:text-white">
                  <TrendingUp className="w-5 h-5 text-ai-blue dark:text-[#3b82f6]" />
                  <span>Monthly Trends</span>
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Key metrics evolution over the last 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#005CFF" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#005CFF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="resolutionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00B894" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00B894" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: "#4A5568" }} 
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "#4A5568" }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#005CFF"
                      strokeWidth={3}
                      fill="url(#satisfactionGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="resolution"
                      stroke="#00B894"
                      strokeWidth={3}
                      fill="url(#resolutionGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
              style={{ animationDelay: "0.7s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl dark:text-white">
                  <Sparkles className="w-5 h-5 text-ai-blue dark:text-[#3b82f6]" />
                  <span>AI-Powered Improvement Suggestions</span>
                </CardTitle>
                <CardDescription className="dark:text-gray-400">Personalized recommendations based on performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {improvements.map((item, index) => {
                    const progressValue = (parseValue(item.current) / parseValue(item.target)) * 100;
                    return (
                      <div
                        key={index}
                        className="group p-6 bg-gradient-to-br from-ai-bg to-ai-blue-light/20 rounded-2xl border border-ai-border/50 hover:shadow-elegant transition-all duration-300 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50 dark:hover:shadow-none"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-ai-text dark:text-white">{item.category}</h3>
                            <Badge
                              className={`${
                                item.priority === "high"
                                  ? "bg-red-100 text-red-700 border-red-200 dark:bg-[#7f1d1d]/20 dark:text-[#fca5a5] dark:border-[#7f1d1d]/30"
                                  : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-[#713f12]/20 dark:text-[#fcd34d] dark:border-[#713f12]/30"
                              } border`}
                            >
                              {item.priority} priority
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-ai-text-light dark:text-gray-400">Current → Target</div>
                            <div className="font-semibold text-ai-text dark:text-white">
                              {item.currentDisplay} → {item.targetDisplay}
                            </div>
                          </div>
                        </div>
                        <div className="relative h-3 w-full overflow-hidden rounded-full bg-ai-blue-light/30 mb-4 dark:bg-[#1e40af]/20">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${progressValue}%`,
                              background: 'linear-gradient(to right, #005CFF, #00B894)'
                            }}
                          />
                        </div>
                        <p className="text-ai-text-light leading-relaxed dark:text-gray-400">{item.suggestion}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}