"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HardHat } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-xl p-2 min-w-12 min-h-12 mb-4 shadow-lg shadow-primary/20">
          <HardHat className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">CivilSense AI</h1>
        <p className="text-sm text-muted-foreground mt-1">Project Intelligence Platform</p>
      </div>

      <Card className="border-border/50 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email and password to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
              Email
            </label>
            <Input id="email" placeholder="m@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                Password
              </label>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full" size="lg">Sign In</Button>
          </Link>
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              Contact Admin
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
