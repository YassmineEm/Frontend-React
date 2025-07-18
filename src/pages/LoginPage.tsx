import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { login } from "@/lib/api";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/20 p-4">
      <Card className="w-full max-w-md border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-ai-text dark:text-white mb-2">Welcome Back</CardTitle>
          <p className="text-ai-text-light dark:text-gray-400">Sign in to your account to continue</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-ai-text font-semibold dark:text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email address"
              className="bg-ai-bg border-ai-border rounded-xl dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-ai-text font-semibold dark:text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-ai-bg border-ai-border rounded-xl dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <Button
            onClick={async () => {
              try {
                const res = await login({ email, password });
                console.log("Login success:", res);
              } catch (err) {
                console.error("Login failed:", err);
                alert("Login failed. Check credentials.");
              }
            }}
            className="w-full bg-gradient-to-r from-ai-blue to-ai-green text-white shadow-elegant hover:shadow-glow transition-all duration-300 dark:shadow-none"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>

          <p className="text-sm text-ai-text-light dark:text-gray-400 text-center">
            Don't have an account?{" "}
            <Link 
              to="/auth/signup" 
              className="text-ai-blue font-semibold hover:underline dark:text-[#93c5fd]"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
