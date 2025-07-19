import { Link ,useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { signup, googleLogin } from "@/lib/auth";

declare global {
  interface Window {
    google: any;
  }
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "client">("client");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const selectedRole = localStorage.getItem("selectedRole");
    if (selectedRole === "admin" || selectedRole === "client") {
      setRole(selectedRole);
    } else {
      setRole("client"); 
    }

    
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        {
          theme: "outline",
          size: "large",
          width: "100%",
        }
      );
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const idToken = response.credential;

    if (!idToken) {
      alert("No ID token received from Google");
      return;
    }

    try {
      const res = await googleLogin(idToken);
      localStorage.setItem("token", res.token);
      alert("Google signup successful!");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google signup failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/20 p-4">
      <Card className="w-full max-w-md border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-ai-blue to-ai-green rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-ai-text dark:text-white mb-2">
            Create Account
          </CardTitle>
          <p className="text-ai-text-light dark:text-gray-400">
            Sign up to get started with AI Support
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div 
            id="googleSignInDiv" 
            className="w-full flex justify-center dark:[&>div]:dark:bg-[#2a2a2a] dark:[&>div]:dark:border-gray-600"
            data-theme="dark"
          />

          <div className="flex items-center justify-center space-x-2 text-ai-text-light text-sm dark:text-gray-400">
            <span className="border-t border-ai-border flex-grow dark:border-gray-600"></span>
            <span>or</span>
            <span className="border-t border-ai-border flex-grow dark:border-gray-600"></span>
          </div>

          <div className="space-y-3">
            <Label htmlFor="name" className="text-ai-text font-semibold dark:text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Name"
              className="bg-ai-bg border-ai-border rounded-xl dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-ai-text font-semibold dark:text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address"
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
              if (!email || !password || !fullName.trim()) {
                alert("Please fill all fields");
                return;
              }
              try {
                const res = await signup({
                  first_name: fullName.split(" ")[0] || "",
                  last_name: fullName.split(" ").slice(1).join(" ") || "",
                  email,
                  password,
                  role,
                });

                if (res.token) {
                  localStorage.setItem("token", res.token); 
                }

                console.log("Registration success:", res);
                alert("Account created successfully!");

                navigate("/upload");
              } catch (err) {
                console.error("Registration failed:", err);
                alert("Registration failed. Try again.");
              }
            }}
            className="w-full bg-gradient-to-r from-ai-blue to-ai-green text-white shadow-elegant hover:shadow-glow transition-all duration-300 dark:shadow-none"
          >
            Sign Up
          </Button>

          <p className="text-sm text-ai-text-light dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link 
              to="/auth" 
              className="text-ai-blue font-semibold hover:underline dark:text-[#93c5fd]"
            >
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}