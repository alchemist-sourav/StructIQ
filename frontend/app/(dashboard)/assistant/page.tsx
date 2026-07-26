"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Paperclip, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I am the CivilSense AI Assistant. I have access to your project database, predictions, and reports. How can I help you today?'
  }
]

const suggestedQuestions = [
  "Which projects have the highest cost overrun risk?",
  "Summarize the SHAP analysis for Metro Expansion Line A.",
  "What is the average schedule delay across all active projects?"
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    setMessages(prev => [...prev, newUserMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const newAiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: 'Based on the current project data, I can see that the material cost variance is the leading factor for budget overruns this quarter. I recommend reviewing the "Metro Expansion Line A" project, as it shows an 85% risk score primarily driven by supply chain delays.' 
      }
      setMessages(prev => [...prev, newAiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border bg-card shadow-sm">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${msg.role === 'user' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'}`}>
                  {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted/50 border rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted border-border">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl px-4 py-4 bg-muted/50 border rounded-tl-sm flex gap-1 items-center h-[46px]">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-background border-t">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((q, i) => (
                <Badge 
                  key={i} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-secondary/80 font-normal py-1.5 px-3"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </Badge>
              ))}
            </div>
          )}
          <div className="relative flex items-center">
            <Button variant="ghost" size="icon" className="absolute left-2 text-muted-foreground h-8 w-8 rounded-full">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask about your projects, risk factors, or reports..."
              className="pl-12 pr-12 h-12 rounded-full border-border bg-card shadow-sm focus-visible:ring-primary/20"
            />
            <Button 
              size="icon" 
              className="absolute right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">CivilSense AI can make mistakes. Verify critical project metrics.</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
