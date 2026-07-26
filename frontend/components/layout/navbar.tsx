"use client"

import { Bell, Search, User, Menu } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Navbar({ onMobileMenu }: { onMobileMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card/80 backdrop-blur px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <Button variant="ghost" size="icon" onClick={onMobileMenu}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <form className="hidden max-w-sm flex-1 md:flex" onSubmit={(e) => e.preventDefault()}>
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects, predictions..."
              className="w-full bg-muted/50 pl-9 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger border border-card" />
        </Button>
        <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
