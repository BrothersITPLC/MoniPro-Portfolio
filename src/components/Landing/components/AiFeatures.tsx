import { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

// SVG Imports
import server1 from "@/components/asset/predictive.svg";
import server2 from "@/components/asset/automated.svg";
import server3 from "@/components/asset/alert.svg";

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
];


export function AiFeatures() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Remove this useEffect
  // useEffect(() => {
  //   const createParticle = () => {
  //     // Particle creation logic
  //   };
  //   const interval = setInterval(createParticle, 300);
  //   return () => {
  //     clearInterval(interval);
  //     // Cleanup logic
  //   };
  // }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log("Scroll event triggered");
    const scrollTop = e.currentTarget.scrollTop;
    const totalHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;
    const itemHeight = totalHeight / features.length;
    const newIndex = Math.floor(scrollTop / itemHeight);

    // Debugging: Log the newIndex to ensure it's being calculated correctly
    console.log("New Index:", newIndex);

    setActiveIndex(Math.min(newIndex, features.length - 1));
    setScrollProgress((scrollTop / totalHeight) * 100); // Update scroll progress
  };

  return (
    <div className="relative min-h-screen" ref={featuresRef}>
      {/* Scroll Indicator */}
      <div className="absolute left-90 top-0 h-full w-2 bg-gray-700">
        <div
          className="bg-blue-500"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Scrollable Text Section */}
      <ScrollArea className="h-[700px] overflow-y-auto my-30 mr-20" onScroll={handleScroll}>

        <div className="max-w-4xl mx-auto z-10 relative ">

          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-6 my-54">
              <Card className="w-full shadow-lg py-12">
                <h2 className="text-4xl font-bold mb-2 text-white">{feature.title}</h2>
                <p className="text-white  text-2xl text-lg">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Dynamic SVG Display */}
      <div className="absolute top-50 right-30 z-0 hidden md:block">
        <img
          src={features[activeIndex].image}
          alt={features[activeIndex].title}
          className="w-100 h-100 object-cover rounded-full shadow-2xl transition duration-500"
        />
      </div>

      {/* Particle CSS Animation */}
      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          z-index: 1;
          filter: blur(2px);
          animation: float linear infinite;
          pointer-events: none;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
