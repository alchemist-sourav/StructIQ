"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Navbar } from "@/components/layout/navbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { motion } from "framer-motion"

// Create a simple Sheet component inline if it doesn't exist, 
// or I should create a proper one in components/ui/sheet.tsx
// Let's create a minimal layout first that handles the state.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onMobileMenu={() => setIsMobileMenuOpen(true)} />
        
        {/* Mobile Sidebar (Basic implementation, ideally use Radix Dialog/Sheet) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative z-50 flex w-3/4 max-w-sm flex-col bg-card border-r shadow-lg h-full"
            >
              {/* Reuse sidebar contents here, or render a specialized MobileSidebar */}
              <div className="p-4 border-b flex justify-between items-center">
                <span className="font-semibold">CivilSense AI</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <Sidebar isCollapsed={false} setIsCollapsed={() => {}} /> 
              </div>
            </motion.div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
