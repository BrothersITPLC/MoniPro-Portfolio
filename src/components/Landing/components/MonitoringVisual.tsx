import type React from "react"
import { Activity, Eye, Zap, Shield } from "lucide-react"

export const MonitoringVisual: React.FC = () => {
  const metrics = [
    {
      icon: Activity,
      label: "System Health",
      value: "99.9%",
      color: "text-chart-1",
    },
    {
      icon: Eye,
      label: "Active Monitors",
      value: "24/7",
      color: "text-chart-2",
    },
    {
      icon: Zap,
      label: "AI Insights",
      value: "Real-time",
      color: "text-primary",
    },
    {
      icon: Shield,
      label: "Security",
      value: "Protected",
      color: "text-chart-4",
    },
  ]

  return (
    <div className="relative p-6">
      {/* AI Enhancement indicator - moved to top center to avoid overlay */}
      <div className="flex justify-center mb-4">
        <div className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1 animate-pulse">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <span className="text-xs font-medium text-primary">AI Enhanced</span>
          </div>
        </div>
      </div>

      {/* Central monitoring hub */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Central core */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary rounded-full animate-pulse shadow-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-primary-foreground rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Orbiting metrics */}
        {metrics.map((metric, index) => {
          const angle = index * 90 - 45 // Distribute evenly around circle
          const radius = 100
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <div
              key={metric.label}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: "2s",
              }}
            >
              <div className="bg-card border border-border rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <div className="text-xs">
                    <div className="font-medium text-foreground">{metric.value}</div>
                    <div className="text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              </div>
              {/* Connection line to center */}
              <div
                className="absolute w-px bg-border opacity-30"
                style={{
                  height: `${radius - 20}px`,
                  left: "50%",
                  top: "50%",
                  transformOrigin: "top",
                  transform: `rotate(${angle + 180}deg)`,
                }}
              ></div>
            </div>
          )
        })}

        {/* Data flow rings */}
        <div
          className="absolute inset-0 border border-primary/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute inset-4 border border-chart-1/20 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
        <div
          className="absolute inset-8 border border-chart-2/20 rounded-full animate-spin"
          style={{ animationDuration: "25s" }}
        ></div>
      </div>
    </div>
  )
}
