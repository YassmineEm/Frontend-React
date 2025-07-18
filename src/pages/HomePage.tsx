import { Link } from "react-router-dom"
import { FileText, MessageSquare, BarChart3, ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: "Smart Document Analysis",
      description: "Upload and automatically analyze your support documents with advanced AI processing",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MessageSquare,
      title: "Intelligent Conversations",
      description: "Context-aware responses powered by your knowledge base and conversation history",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Deep insights into agent performance with actionable improvement recommendations",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const benefits = [
    { icon: Clock, text: "24/7 instant responses" },
    { icon: Zap, text: "Reduced resolution time" },
    { icon: Shield, text: "Enhanced customer satisfaction" },
    { icon: BarChart3, text: "Real-time performance insights" },
  ]

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "2.3s", label: "Avg Response" },
    { value: "94%", label: "Satisfaction" },
    { value: "10k+", label: "Queries/Day" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/30 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/5 via-transparent to-ai-green/5 dark:from-[#1e40af]/10 dark:to-[#065f46]/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-ai-blue/10 rounded-full blur-3xl animate-float dark:bg-[#1e40af]/20"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-ai-green/10 rounded-full blur-3xl animate-float dark:bg-[#065f46]/20"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-slide-up">
            <Badge className="mb-6 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant dark:shadow-none">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-ai-text via-ai-blue to-ai-green bg-clip-text text-transparent mb-6 leading-tight dark:from-white dark:via-[#93c5fd] dark:to-[#6ee7b7]">
              AI Support Assistant
            </h1>
            <p className="text-xl md:text-2xl text-ai-text-light mb-8 max-w-3xl mx-auto leading-relaxed dark:text-gray-400">
              Transform your customer support with our intelligent chatbot. Analyze documents, optimize responses, and
              enhance agent performance with cutting-edge AI technology.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Link to="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-ai-blue to-ai-green hover:from-ai-blue/90 hover:to-ai-green/90 text-white px-8 py-4 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 dark:shadow-none"
              >
                Start Chatting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-ai-blue/20 text-ai-blue hover:bg-ai-blue/5 px-8 py-4 rounded-xl shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105 bg-ai-surface/80 backdrop-blur-sm dark:bg-[#2a2a2a]/80 dark:border-[#3b82f6]/30 dark:text-[#93c5fd] dark:hover:bg-[#1e40af]/10"
              >
                Upload Documents
                <FileText className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ai-blue to-ai-green bg-clip-text text-transparent dark:from-[#93c5fd] dark:to-[#6ee7b7]">
                  {stat.value}
                </div>
                <div className="text-ai-text-light font-medium dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ai-surface/50 backdrop-blur-sm dark:bg-[#1e1e1e]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 px-4 py-2 bg-ai-blue-light text-ai-blue border-0 dark:bg-[#1e40af]/20 dark:text-[#93c5fd]">
              Core Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-ai-text mb-6 dark:text-white">
              Everything you need for
              <span className="bg-gradient-to-r from-ai-blue to-ai-green bg-clip-text text-transparent dark:from-[#93c5fd] dark:to-[#6ee7b7]">
                {" "}
                intelligent support
              </span>
            </h2>
            <p className="text-xl text-ai-text-light max-w-3xl mx-auto dark:text-gray-400">
              Our comprehensive AI solution combines document analysis and performance optimization to revolutionize
              your customer support experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group border-0 shadow-elegant hover:shadow-elegant-xl transition-all duration-500 transform hover:scale-105 bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#2a2a2a]/80 dark:hover:shadow-none"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 mx-auto shadow-elegant group-hover:shadow-glow transition-all duration-300 dark:shadow-none`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-ai-text group-hover:text-ai-blue transition-colors dark:text-white dark:group-hover:text-[#93c5fd]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-ai-text-light leading-relaxed dark:text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-[#1e1e1e]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-ai-text mb-6 dark:text-white">
              Why choose our
              <span className="bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent dark:from-[#6ee7b7] dark:to-[#93c5fd]">
                {" "}
                AI solution?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-6 bg-ai-surface/80 backdrop-blur-sm rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 animate-slide-up dark:bg-[#2a2a2a]/80 dark:hover:shadow-none"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-ai-green to-ai-green/80 rounded-xl flex items-center justify-center shadow-elegant dark:from-[#065f46] dark:to-[#065f46]/80 dark:shadow-none">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-ai-text dark:text-white">{benefit.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue via-ai-blue/90 to-ai-green dark:from-[#1e40af] dark:via-[#1e40af]/90 dark:to-[#065f46]"></div>
        {/* Decorative grid pattern */}
        <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3csvg%20width%3d%2260%22%20height%3d%2260%22%20viewBox%3d%220%200%2060%2060%22%20xmlns%3d%22http://www.w3.org/2000/svg%22%3e%3cg%20fill%3d%22none%22%20fill-rule%3d%22evenodd%22%3e%3cg%20fill%3d%22%23ffffff%22%20fill-opacity%3d%220.1%22%3e%3ccircle%20cx%3d%2230%22%20cy%3d%2230%22%20r%3d%222%22/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")] opacity-20' />

        <div className="relative max-w-4xl mx-auto text-center animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to transform your customer support?</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands of companies already using our AI-powered solution to deliver exceptional customer
            experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-white text-ai-blue hover:bg-white/90 px-8 py-4 rounded-xl shadow-elegant hover:shadow-elegant-xl transition-all duration-300 transform hover:scale-105 font-semibold dark:text-[#1e40af]"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl shadow-elegant hover:shadow-elegant-xl transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-sm font-semibold dark:hover:bg-white/5"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
