"use client"

import { motion } from "framer-motion"
import { User, Bell, Key, Moon, Monitor, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button variant="secondary" className="justify-start gap-2 w-full">
              <User className="h-4 w-4" /> Profile
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Moon className="h-4 w-4" /> Appearance
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Bell className="h-4 w-4" /> Notifications
            </Button>
            <Button variant="ghost" className="justify-start gap-2 w-full">
              <Key className="h-4 w-4" /> API Keys
            </Button>
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue="Sarah Jenkins" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="sarah.jenkins@civilsense.ai" type="email" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Role</label>
                <Input defaultValue="Senior Project Manager" disabled className="bg-muted/50 text-muted-foreground" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how CivilSense AI looks on your device.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <button className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-primary bg-card p-4 hover:bg-muted transition-colors">
                  <Sun className="h-6 w-6" />
                  <span className="text-sm font-medium">Light</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-card p-4 hover:bg-muted transition-colors">
                  <Moon className="h-6 w-6" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-card p-4 hover:bg-muted transition-colors">
                  <Monitor className="h-6 w-6" />
                  <span className="text-sm font-medium">System</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
