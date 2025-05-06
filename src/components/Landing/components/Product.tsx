import { Activity, Server, Cloud, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

import Ai from "@/components/asset/ai.png";

const monitoringCards = [
  {
    title: "Network Monitoring",
    icon: <Activity className="w-8 h-8 text-[var(--secondary)]" />,
    description:
      "Real-time network performance monitoring with AI-powered insights",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Server Monitoring",
    icon: <Server className="w-8 h-8 text-[var(--secondary)]" />,
    description:
      "Comprehensive server health monitoring and predictive maintenance",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Cloud Monitoring",
    icon: <Cloud className="w-8 h-8 text-[var(--secondary)]" />,
    description: "Multi-cloud infrastructure monitoring and optimization",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Application Monitoring",
    icon: <Code className="w-8 h-8 text-[var(--secondary)]" />,
    description: "End-to-end application performance monitoring and debugging",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000",
  },
];
export function Product() {
  const productRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            headingRef.current?.classList.remove("typing-animation");
            void headingRef.current?.offsetWidth; // Trigger reflow
            headingRef.current?.classList.add("typing-animation");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div
      id="products"
      ref={productRef}
      className="relative py-20 my-24 px-4 justify-center overflow-hidden dark:border-b-slate-700 min-h-screen"
    >
      {/* Animated background overlay */}

      <div className="max-w-7xl mx-auto relative z-10">
        <h4
          ref={headingRef}
          className="flex items-center text-3xl md:text-3xl font-bold mb-14 text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] typing-animation"
        >
          <img src={Ai} alt="AI Icon" className="w-8 h-8 mr-2" />
          Comprehensive monitoring solutions powered by advanced AI
        </h4>
        <style jsx>{`
          .typing-animation {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink-caret {
            from, to {
              border-color: transparent;
            }
            50% {
              border-color: orange;
            }
          }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {monitoringCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 hover:transform hover:scale-105 group"
              animate={{ x: [0, 20, 0] }} // Sliding effect
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              whileHover={{ x: 0 }} // Stop sliding on hover
            >
              <motion.div 
                className="h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="p-6">
                <motion.div 
                  className="flex items-center mb-4"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold ml-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {card.title}
                  </h3>
                </motion.div>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
