import { useState, useCallback ,useEffect} from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, X, CheckCircle, AlertCircle, Cloud, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { uploadDocument } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth"
import { useNavigate } from "react-router-dom"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "success" | "error"
  progress: number
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const navigate = useNavigate()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading" as const,
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((fileMeta, index) => {
      const file = acceptedFiles[index]; // le vrai objet File

      const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileMeta.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 95);
            return { ...f, progress: newProgress };
          }
          return f;
        })
      );
      }, 200);

    // Appel réel à uploadDocument()
    uploadDocument(file)
      .then((result) => {
        console.log("Upload result:", result);
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileMeta.id
              ? { ...f, progress: 100, status: "success" }
              : f
          )
        );
      })
      .catch((err) => {
        console.error("Upload error:", err);
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileMeta.id
              ? { ...f, progress: 100, status: "error" }
              : f
          )
        );
      });
   });
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/html": [".html"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const acceptedFormats = [
    { ext: "PDF", desc: "PDF Documents", icon: "📄", color: "from-red-500 to-red-600" },
    { ext: "DOCX", desc: "Word Documents", icon: "📝", color: "from-blue-500 to-blue-600" },
    { ext: "TXT", desc: "Text Files", icon: "📃", color: "from-gray-500 to-gray-600" },
    { ext: "HTML", desc: "Web Pages", icon: "🌐", color: "from-green-500 to-green-600" },
  ]
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth/login") 
    }
  }, [])

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant dark:shadow-none">
            <Cloud className="w-4 h-4 mr-2" />
            Document Upload
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4 dark:from-white dark:to-[#93c5fd]">
            Upload Your Documents
          </h1>
          <p className="text-xl text-ai-text-light max-w-2xl mx-auto dark:text-gray-400">
            Upload your support documents to power your AI chatbot's knowledge base with intelligent processing.
          </p>
        </div>

        {/* Upload Zone */}
        <Card
          className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span>Upload Zone</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Drag and drop your files or click to browse and select
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? "border-ai-blue bg-ai-blue-light/50 shadow-glow dark:bg-[#1e40af]/30 dark:border-[#3b82f6]"
                  : "border-ai-border hover:border-ai-blue hover:bg-ai-blue-light/20 hover:shadow-elegant dark:border-gray-600 dark:hover:border-[#3b82f6] dark:hover:bg-[#1e40af]/20"
              }`}
            >
              <input {...getInputProps()} />
              <div className="relative">
                <div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isDragActive 
                      ? "bg-ai-blue shadow-glow dark:bg-[#3b82f6]" 
                      : "bg-ai-blue-light dark:bg-[#1e40af]/30"
                  }`}
                >
                  <Upload className={`w-10 h-10 transition-colors ${
                    isDragActive 
                      ? "text-white" 
                      : "text-ai-blue dark:text-[#93c5fd]"
                  }`} />
                </div>
                {isDragActive ? (
                  <div className="animate-scale-in">
                    <p className="text-xl font-semibold text-ai-blue mb-2 dark:text-[#93c5fd]">Drop your files here!</p>
                    <p className="text-ai-text-light dark:text-gray-400">Release to upload your documents</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl font-semibold text-ai-text mb-2 dark:text-white">
                      Drag & drop your files here, or{" "}
                      <span className="text-ai-blue hover:underline dark:text-[#93c5fd]">click to browse</span>
                    </p>
                    <p className="text-ai-text-light mb-4 dark:text-gray-400">Supports PDF, DOCX, TXT, and HTML files up to 10MB each</p>
                    <Badge variant="outline" className="bg-ai-green-light text-ai-green border-ai-green/20 dark:bg-[#065f46]/20 dark:text-[#6ee7b7] dark:border-[#065f46]/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Powered Processing
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accepted Formats */}
        <Card
          className="mb-8 border-0 shadow-elegant bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <CardTitle className="text-xl dark:text-white">Supported File Formats</CardTitle>
            <CardDescription className="dark:text-gray-400">We support these document types for optimal AI processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {acceptedFormats.map((format, index) => (
                <div
                  key={index}
                  className="group p-4 bg-gradient-to-br from-ai-bg to-ai-blue-light/30 rounded-xl border border-ai-border/50 hover:shadow-elegant transition-all duration-300 transform hover:scale-105 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${format.color} rounded-lg flex items-center justify-center shadow-elegant group-hover:shadow-glow transition-all duration-300 dark:shadow-none`}
                    >
                      <span className="text-white font-bold text-sm">{format.ext}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-ai-text dark:text-white">{format.ext}</div>
                      <div className="text-sm text-ai-text-light dark:text-gray-400">{format.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <Card
            className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between dark:text-white">
                <span className="text-xl">Uploaded Files ({files.length})</span>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-ai-green-light text-ai-green border-0 dark:bg-[#065f46]/20 dark:text-[#6ee7b7]">
                    {files.filter((f) => f.status === "success").length} Completed
                  </Badge>
                  {files.some((f) => f.status === "uploading") && (
                    <Badge className="bg-ai-yellow-light text-orange-600 border-0 dark:bg-[#92400e]/20 dark:text-[#f59e0b]">
                      {files.filter((f) => f.status === "uploading").length} Processing
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/20 rounded-xl border border-ai-border/50 hover:shadow-elegant transition-all duration-300 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-ai-text truncate pr-4 dark:text-white">{file.name}</p>
                        <div className="flex items-center space-x-3">
                          {file.status === "success" && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-5 h-5 text-ai-green dark:text-[#10b981]" />
                              <span className="text-sm font-medium text-ai-green dark:text-[#10b981]">Complete</span>
                            </div>
                          )}
                          {file.status === "error" && (
                            <div className="flex items-center space-x-1">
                              <AlertCircle className="w-5 h-5 text-red-500 dark:text-[#ef4444]" />
                              <span className="text-sm font-medium text-red-500 dark:text-[#ef4444]">Failed</span>
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-ai-text-light hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-[#ef4444] dark:hover:bg-[#ef4444]/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-ai-text-light dark:text-gray-400">{formatFileSize(file.size)}</span>
                        {file.status === "uploading" && (
                          <span className="text-sm font-medium text-ai-blue dark:text-[#93c5fd]">{Math.round(file.progress)}%</span>
                        )}
                      </div>
                      {file.status === "uploading" && (
                        <Progress value={file.progress} className="h-2 bg-ai-blue-light dark:bg-[#1e40af]/30">
                          <div className="h-full bg-gradient-to-r from-ai-blue to-ai-green rounded-full transition-all duration-300 dark:from-[#3b82f6] dark:to-[#10b981]"></div>
                        </Progress>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
