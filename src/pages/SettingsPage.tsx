import { useState } from "react"
import { useTheme } from "next-themes"
import { Settings, User, Eye, Lock, Activity, Download, Trash2, LogOut, Users, Database, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [isAdmin] = useState(true)

  const activityLogs = [
    { id: 1, action: "Login", date: "2024-01-15 14:30", device: "Chrome on Windows" },
    { id: 2, action: "Document Upload", date: "2024-01-14 11:15", file: "user_guide.pdf" },
    { id: 3, action: "Data Export", date: "2024-01-10 09:45", format: "JSON" },
  ]

  const users = [
    { id: 1, email: "admin@company.com", role: "admin", lastActive: "Today, 15:30" },
    { id: 2, email: "user1@company.com", role: "user", lastActive: "Yesterday, 18:45" },
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ai-bg via-ai-surface to-ai-blue-light/20 dark:from-[#121212] dark:via-[#1e1e1e] dark:to-[#2a2a2a]/20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center animate-slide-up">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-ai-blue to-ai-green text-white border-0 shadow-elegant dark:shadow-none">
            <Settings className="w-4 h-4 mr-2 text-white/90" />
            System Settings
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-text to-ai-blue bg-clip-text text-transparent mb-4 dark:from-white dark:to-[#93c5fd]">
            Account & Preferences
          </h1>
          <p className="text-xl text-ai-text-light max-w-2xl mx-auto dark:text-gray-400">
            Manage your personal settings and system preferences
          </p>
        </div>

        {/* User Profile */}
        <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <User className="w-5 h-5 text-indigo-100" />
              </div>
              <span>User Profile</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Update your personal information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Full Name</Label>
                <Input 
                  className="bg-ai-bg border-ai-border rounded-xl h-12 dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Email</Label>
                <Input 
                  type="email" 
                  className="bg-ai-bg border-ai-border rounded-xl h-12 dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white" 
                  placeholder="john@company.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-base font-semibold text-ai-text dark:text-gray-300">New Password</Label>
              <Input 
                type="password" 
                className="bg-ai-bg border-ai-border rounded-xl h-12 dark:bg-[#2a2a2a] dark:border-gray-700 dark:text-white" 
                placeholder="••••••••" 
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/20 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Email Notifications</Label>
                <p className="text-sm text-ai-text-light dark:text-gray-400">Receive important system notifications</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className="data-[state=checked]:bg-ai-green dark:data-[state=checked]:bg-[#10b981]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Preferences */}
        <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-blue-dark rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <Eye className="w-5 h-5 text-blue-100" />
              </div>
              <span>Display Preferences</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Customize your interface appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/20 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Dark Mode</Label>
                <p className="text-sm text-ai-text-light dark:text-gray-400">Toggle between light and dark theme</p>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
                className="data-[state=checked]:bg-ai-blue dark:data-[state=checked]:bg-[#3b82f6]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <Lock className="w-5 h-5 text-red-100" />
              </div>
              <span>Security & Privacy</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/20 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/20 dark:border-gray-700/50">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Two-Factor Authentication</Label>
                <p className="text-sm text-ai-text-light dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
                className="data-[state=checked]:bg-ai-green dark:data-[state=checked]:bg-[#10b981]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base font-semibold text-ai-text dark:text-gray-300">Login History</Label>
              <div className="border border-ai-border/50 rounded-xl divide-y divide-ai-border/50 dark:border-gray-700/50 dark:divide-gray-700/50">
                {activityLogs.filter(log => log.action === "Login").slice(0, 3).map(log => (
                  <div key={log.id} className="p-4 dark:hover:bg-[#2a2a2a]">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-ai-text dark:text-gray-300">{log.date}</span>
                      <Badge variant="outline" className="border-ai-border bg-ai-bg dark:bg-[#2a2a2a] dark:border-gray-700">
                        {log.device}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-ai-border hover:border-ai-blue hover:bg-ai-blue-light/10 dark:border-gray-700 dark:hover:border-[#3b82f6] dark:hover:bg-[#1e40af]/10"
            >
              <LogOut className="w-4 h-4 mr-2 text-ai-text-light dark:text-gray-400" />
              Logout from all devices
            </Button>
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <Activity className="w-5 h-5 text-green-100" />
              </div>
              <span>Activity Logs</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Recent activities on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.map(log => (
                <div 
                  key={log.id} 
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 hover:shadow-elegant transition-all duration-300 dark:from-[#2a2a2a] dark:to-[#1e40af]/10 dark:border-gray-700/50 dark:hover:shadow-none"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-ai-blue dark:bg-[#3b82f6]"></div>
                      <span className="font-semibold text-ai-text dark:text-white">{log.action}</span>
                      <Badge variant="outline" className="text-xs bg-ai-surface border-ai-border dark:bg-[#2a2a2a] dark:border-gray-700">
                        {log.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-ai-text-light ml-5 dark:text-gray-400">
                      {log.file || log.device || log.format}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm animate-slide-up dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                <Download className="w-5 h-5 text-amber-100" />
              </div>
              <span>Data Management</span>
            </CardTitle>
            <CardDescription className="text-lg dark:text-gray-400">
              Export or delete your personal data
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-ai-bg border-ai-border hover:bg-ai-blue-light/50 hover:border-ai-blue rounded-xl h-12 transition-all duration-300 dark:bg-[#2a2a2a] dark:border-gray-700 dark:hover:bg-[#1e40af]/20 dark:hover:border-[#3b82f6]"
            >
              <Download className="w-4 h-4 text-ai-blue dark:text-[#93c5fd]" />
              <span>Export My Data</span>
            </Button>

            <Button
              variant="destructive"
              className="flex items-center space-x-2 rounded-xl h-12 transition-all duration-300 hover:shadow-elegant dark:hover:shadow-none"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </Button>
          </CardContent>
        </Card>

        {/* Admin Sections */}
        {isAdmin && (
          <>
            <Separator className="my-8 bg-ai-border dark:bg-gray-700/50" />
            
            <div className="mb-6 text-center">
              <Badge className="px-4 py-2 bg-gradient-to-r from-purple-500 to-ai-blue text-white border-0 shadow-elegant dark:shadow-none">
                <Shield className="w-4 h-4 mr-2 text-white/90" />
                Administration
              </Badge>
            </div>

            {/* User Management */}
            <Card className="mb-8 border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                    <Users className="w-5 h-5 text-violet-100" />
                  </div>
                  <span>User Management</span>
                </CardTitle>
                <CardDescription className="text-lg dark:text-gray-400">
                  Manage system users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map(user => (
                    <div 
                      key={user.id} 
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/10 dark:border-gray-700/50"
                    >
                      <div>
                        <div className="font-medium text-ai-text dark:text-white">{user.email}</div>
                        <div className="text-sm text-ai-text-light dark:text-gray-400">
                          {user.role} • Last active: {user.lastActive}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-ai-border dark:border-gray-700 dark:hover:bg-[#1e40af]/10"
                      >
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Logs */}
            <Card className="border-0 shadow-elegant-lg bg-ai-surface/80 backdrop-blur-sm dark:bg-[#1e1e1e]/80 dark:border dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl dark:text-white">
                  <div className="w-10 h-10 bg-gradient-to-br from-ai-blue to-ai-blue-dark rounded-xl flex items-center justify-center shadow-elegant dark:shadow-none">
                    <Database className="w-5 h-5 text-blue-100" />
                  </div>
                  <span>System Monitoring</span>
                </CardTitle>
                <CardDescription className="text-lg dark:text-gray-400">
                  View system status and technical logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/10 dark:border-gray-700/50">
                    <div className="font-medium text-ai-text dark:text-white">LLM Service</div>
                    <Badge className="mt-2 bg-ai-green-light text-ai-green border-0 dark:bg-[#065f46]/20 dark:text-[#6ee7b7]">Operational</Badge>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/10 dark:border-gray-700/50">
                    <div className="font-medium text-ai-text dark:text-white">Database</div>
                    <Badge className="mt-2 bg-ai-green-light text-ai-green border-0 dark:bg-[#065f46]/20 dark:text-[#6ee7b7]">Connected</Badge>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-ai-bg to-ai-blue-light/10 rounded-xl border border-ai-border/50 dark:from-[#2a2a2a] dark:to-[#1e40af]/10 dark:border-gray-700/50">
                    <div className="font-medium text-ai-text dark:text-white">API</div>
                    <Badge className="mt-2 bg-ai-green-light text-ai-green border-0 dark:bg-[#065f46]/20 dark:text-[#6ee7b7]">Active</Badge>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 bg-ai-bg border-ai-border hover:bg-ai-blue-light/50 hover:border-ai-blue rounded-xl h-12 transition-all duration-300 w-full dark:bg-[#2a2a2a] dark:border-gray-700 dark:hover:bg-[#1e40af]/20 dark:hover:border-[#3b82f6]"
                >
                  <Activity className="w-4 h-4 text-ai-blue dark:text-[#93c5fd]" />
                  <span>View Full System Logs</span>
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
