import { Star, User, Building, Award } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment:
      "This monitoring solution has revolutionized how we handle our financial technology infrastructure. It's a game-changer!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-6 h-6 text-primary" />,
  },
  {
    name: "Sara Tadesse",
    role: "Head of Engineering",
    company: "Ride Technologies",
    comment:
      "The AI-powered insights have significantly improved our ride-hailing platform's performance monitoring. Highly recommend!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000",
    icon: <Building className="w-6 h-6 text-primary" />,
  },
  {
    name: "Yonas Berhanu",
    role: "Technical Director",
    company: "Ethio Telecom",
    comment:
      "An essential tool for maintaining our nationwide telecommunications infrastructure with real-time monitoring and alerting.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000",
    icon: <Award className="w-6 h-6 text-primary" />,
  },
  {
    name: "Aisha Ahmed",
    role: "Software Architect",
    company: "Innovate Solutions",
    comment:
      "The comprehensive visibility and predictive analytics have transformed our development lifecycle. Truly impressive!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1552058544-a03195f190d7?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-6 h-6 text-primary" />,
  },
  {
    name: "Fasil Demissie",
    role: "DevOps Lead",
    company: "CloudCore Systems",
    comment:
      "Seamless integration and powerful dashboards make managing our cloud infrastructure effortless. A vital asset.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2000",
    icon: <Building className="w-6 h-6 text-primary" />,
  },
  {
    name: "Helen Kebede",
    role: "System Administrator",
    company: "SecureNet Ethiopia",
    comment:
      "Reliable and intuitive, this platform ensures our systems are always up and running, with proactive issue detection.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=2000",
    icon: <Award className="w-6 h-6 text-primary" />,
  },
];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Calculate total width of all cards plus gap
    const cardWidth = 280; // min-w-[280px]
    const gapWidth = 32; // gap-8 (2rem = 32px)
    const totalCardsWidth = testimonials.length * (cardWidth + gapWidth);

    // Dynamic duration based on content width to maintain speed
    const duration = totalCardsWidth / 50; // Adjust '50' for desired scroll speed

    if (!isPaused) {
      controls.start({
        x: ["0%", `-${totalCardsWidth}px`], // Animate exact pixel distance
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section
      id="testimonials"
      className="relative min-h-screen py-20 px-4 flex items-center justify-center overflow-hidden transition-colors duration-900"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient overlays for depth - consistent with Hero and Footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              What Our Clients Say
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Trusted by Industry Leaders
          </h2>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={controls}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
          >
            {/* First set of testimonial cards */}
            {testimonials.map((testimonial, index) => (
              <Card // Using shadcn Card component
                key={`first-${index}`}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 animate-scale-in group min-w-[320px] flex-shrink-0" // Increased min-width slightly for better content display
              >
                <div className="space-y-4">
                  {/* Image */}
                  <motion.div
                    className="w-full h-48 overflow-hidden rounded-md" // Rounded corners for image
                    whileHover={{ scale: 1.05 }} // Slight zoom on image hover
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" // Image zoom on card hover
                    />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex text-primary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {testimonial.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at{" "}
                        <span className="text-primary font-medium">
                          {testimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {/* Duplicate set of testimonial cards for infinite scroll effect */}
            {testimonials.map((testimonial, index) => (
              <Card // Using shadcn Card component
                key={`second-${index}`}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 animate-scale-in group min-w-[320px] flex-shrink-0"
              >
                <div className="space-y-4">
                  {/* Image */}
                  <motion.div
                    className="w-full h-48 overflow-hidden rounded-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>

                  {/* Rating */}
                  <div className="flex text-primary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {testimonial.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at{" "}
                        <span className="text-primary font-medium">
                          {testimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
