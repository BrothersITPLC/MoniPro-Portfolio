import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowDown, Monitor, Zap, Eye } from "lucide-react"
import { AnimatedBackground } from "./AnimatedBackground"
import { MonitoringVisual } from "./MonitoringVisual"

export const HeroSection: React.FC = () => {
  const features = [
    {
      icon: Monitor,
      title: "Infrastructure Monitoring",
      description: "Real-time monitoring of networks, applications, and systems.",
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Intelligent automation and predictive analytics",
    },
    {
      icon: Eye,
      title: "24/7 Observability",
      description: "Continuous monitoring with instant alerting",
    },
  ]

  return (
    <section
      id="#"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-900 pb-16"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mt-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Next-Generation Monitoring</span>
            </div>

            {/* Main headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Intelligent
                <span className="block text-primary">Monitoring</span>
                <span className="block">Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Harness the power of AI-driven monitoring to gain unprecedented visibility, automate responses, and
                prevent issues before they impact your business.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="space-y-2">
                    <feature.icon className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-sm text-foreground">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Monitoring
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "<1min", label: "Detection" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.5s" }}>
            <MonitoringVisual />
          </div>
        </div>
      </div>

      {/* Scroll indicator - Now properly spaced */}
      <div className="relative z-10 mt-8 mb-4">
        <div className="flex flex-col items-center space-y-2 text-muted-foreground animate-bounce">
          <span className="text-sm">Discover More</span>
          <ArrowDown className="w-4 h-4 " />
        </div>
      </div>
    </section>
  )
}
