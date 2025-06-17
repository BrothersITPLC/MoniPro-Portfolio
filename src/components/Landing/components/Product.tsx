import React from "react";
import { Card } from "@/components/ui/card";
import { AnimatedBackground } from "./AnimatedBackground"; // Assuming AnimatedBackground is in the same directory
import {
  Activity,
  AlertCircle,
  Cloud,
  LayoutDashboard,
  Shield,
  FileText,
} from "lucide-react"; // Importing relevant icons

export const ProductSection: React.FC = () => {
  const products = [
    {
      icon: LayoutDashboard,
      title: "Real-time Dashboards",
      description:
        "Visualize your infrastructure and application health with customizable, interactive dashboards.",
    },
    {
      icon: AlertCircle,
      title: "Intelligent Alerting",
      description:
        "Receive proactive, AI-driven alerts for anomalies and critical events, minimizing downtime.",
    },
    {
      icon: FileText,
      title: "Comprehensive Log Management",
      description:
        "Centralized collection, analysis, and storage of logs for quick troubleshooting and auditing.",
    },
    {
      icon: Activity,
      title: "Performance Analytics",
      description:
        "Deep insights into application performance metrics to identify bottlenecks and optimize efficiency.",
    },
    {
      icon: Shield,
      title: "Security Monitoring",
      description:
        "Detect and respond to security threats and vulnerabilities across your entire stack.",
    },
    {
      icon: Cloud,
      title: "Cloud & Hybrid Integration",
      description:
        "Monitor seamlessly across on-premise, cloud, and hybrid environments with unified visibility.",
    },
  ];

  return (
    <section
      id="products"
      className="relative py-20 min-h-screen flex items-center overflow-hidden transition-colors duration-900"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient overlays for depth - consistent with Hero and Footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              What We Offer
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Our Powerful{" "}
            <span className="block text-primary">Product Suite</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the comprehensive features and solutions designed to bring
            clarity, automation, and control to your complex IT environments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.title}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 transform hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg shadow-sm">
                  <product.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {product.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
