"use client"

import React, { useRef, useState } from "react" // Added React import
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { AnimatedBackground } from "./AnimatedBackground" // Import AnimatedBackground

// SVG Imports (Ensure these paths are correct in your project structure)
import server1 from "@/components/asset/predictive.svg"
import server2 from "@/components/asset/automated.svg"
import server3 from "@/components/asset/alert.svg"

// Feature Data Array
const features = [
  {
    title: "Predictive Analytics",
    description: `AI-driven insights to predict and prevent system failures before they occur.
Leverages machine learning models to analyze historical data and detect patterns.
Enables proactive maintenance by forecasting potential issues in advance.
Reduces unplanned downtime and improves overall system reliability.
Continuously monitors system behavior for anomalies and deviations.
Prioritizes alerts based on risk levels and operational impact.
Supports data-driven decision making with real-time analytics.
Increases operational efficiency and resource optimization.
Enhances visibility into performance trends and long-term health.`,
    image: server1,
  },
  {
    title: "Automated Response",
    description: `Intelligent automation that responds to incidents in real-time.
Minimizes response time by executing predefined actions automatically.
Integrates with alert systems to trigger immediate mitigation steps.
Reduces manual intervention and human error during critical events.
Supports customizable workflows for various incident types.
Logs all automated actions for transparency and auditability.
Enhances system resilience by ensuring rapid containment.
Scales response mechanisms across complex environments.
Improves recovery time and maintains service continuity.`,
    image: server2,
  },
  {
    title: "Smart Alerts",
    description: `Context-aware notifications that reduce alert fatigue.
Prioritizes alerts based on severity, impact, and relevance.
Filters out noise to ensure only actionable issues are reported.
Adapts alert thresholds dynamically based on system behavior.
Groups related alerts to provide a clearer incident picture.
Customizable to fit team roles, preferences, and workflows.
Supports multi-channel delivery including email, SMS, and chat.
Provides rich context to speed up troubleshooting and resolution.
Increases focus and efficiency by reducing unnecessary interruptions.`,
    image: server3,
  },
]

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight
    const totalScrollableHeight = scrollHeight - clientHeight

    if (totalScrollableHeight <= 0) {
      // Avoid division by zero if content is smaller than container
      setScrollProgress(0)
      setActiveIndex(0)
      return
    }

    const itemHeight = totalScrollableHeight / features.length
    const newIndex = Math.floor(scrollTop / itemHeight)
    setActiveIndex(Math.min(newIndex, features.length - 1))
    setScrollProgress((scrollTop / totalScrollableHeight) * 100)
  }

  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-900 py-20 px-4 sm:px-6 lg:px-8"
      ref={featuresRef}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient overlays for depth - consistent with Hero and Footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Unlock Advanced Monitoring</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform goes beyond basic monitoring, providing intelligent insights and automated responses to keep
            your systems optimal.
          </p>
        </div>

        {/* Main Content Grid - Modified for wider scroll area */}
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Scrollable Text Section - Now spans 3 columns */}
          <div className="md:col-span-3 relative">
            {/* Scroll Indicator */}
            <div className="absolute left-0 top-0 h-full w-1 bg-border/50 rounded-full">
              <div
                className="bg-primary rounded-full w-full transition-all duration-300 ease-in-out"
                style={{ height: `${scrollProgress}%` }}
              ></div>
            </div>

            <ScrollArea className="h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-y-auto pl-8 pr-4" onScroll={handleScroll}>
              <div className="space-y-24 py-4">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 ${
                      activeIndex === index ? "border-primary/50 scale-[1.02] shadow-lg" : "opacity-60 grayscale-[50%]"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </Card>
                ))}
                {/* Add some extra space at the bottom for smoother scrolling to last item */}
                <div className="h-[calc(60vh - 150px)] md:h-[calc(70vh - 150px)] lg:h-[calc(80vh - 150px)]"></div>
              </div>
            </ScrollArea>
          </div>

          {/* Dynamic SVG Display - Now spans 2 columns */}
          <div className="md:col-span-2 relative flex items-center justify-center">
            <img
              src={features[activeIndex].image || "/placeholder.svg"}
              alt={features[activeIndex].title}
              className="w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain rounded-full shadow-2xl transition-all duration-500 ease-in-out transform scale-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
