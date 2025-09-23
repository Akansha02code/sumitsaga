"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mountain, ArrowRight, Sparkles } from "lucide-react"

export default function WelcomePage() {
  const handleGetStarted = () => {
    window.location.href = "/search"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <Mountain className="h-20 w-20 text-primary" />
              <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">Discover Historic Forts</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Embark on an adventure through Maharashtra's magnificent forts. Connect with fellow explorers and create
              unforgettable memories.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-6">
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Let's Go
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-sm text-muted-foreground">Ready to explore Maharashtra's historic treasures?</p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="p-6 border-border hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <Mountain className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold text-foreground">Historic Forts</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Explore detailed information about Maharashtra's most iconic forts
              </p>
            </div>
          </Card>

          <Card className="p-6 border-border hover:border-accent/50 transition-colors">
            <div className="space-y-4">
              <div className="h-8 w-8 mx-auto bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground text-sm font-bold">📍</span>
              </div>
              <h3 className="font-semibold text-foreground">LongTerm Memories</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Create life long memories with your friends & family 
              </p>
            </div>
          </Card>

          <Card className="p-6 border-border hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="h-8 w-8 mx-auto bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">👥</span>
              </div>
              <h3 className="font-semibold text-foreground">Group Adventures</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Create or join groups for organized fort exploration trips
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
