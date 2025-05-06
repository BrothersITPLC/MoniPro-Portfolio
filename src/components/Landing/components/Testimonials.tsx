import { Star, User, Building, Award } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment: "This monitoring solution has revolutionized how we handle our financial technology infrastructure.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-8 h-8 text-[var(--secondary)]" />,
  },
  {
    name: "Sara Tadesse",
    role: "Head of Engineering",
    company: "Ride Technologies",
    comment: "The AI-powered insights have significantly improved our ride-hailing platform's performance monitoring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=2000",
    icon: <Building className="w-8 h-8 text-[var(--secondary)]" />,
  },
  {
    name: "Yonas Berhanu",
    role: "Technical Director",
    company: "Ethio Telecom",
    comment:
      "Essential tool for maintaining our nationwide telecommunications infrastructure with real-time monitoring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2000",
    icon: <Award className="w-8 h-8 text-[var(--secondary)]" />,
  },
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment: "This monitoring solution has revolutionized how we handle our financial technology infrastructure.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-8 h-8 text-[var(--secondary)]" />,
  },
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment: "This monitoring solution has revolutionized how we handle our financial technology infrastructure.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-8 h-8 text-[var(--secondary)]" />,
  },
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment: "This monitoring solution has revolutionized how we handle our financial technology infrastructure.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    icon: <User className="w-8 h-8 text-[var(--secondary)]" />,
  },
]

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        },
      })
    } else {
      controls.stop()
    }
  }, [isPaused, controls])

  return (
    <div
      id="testimonials"
      className="relative py-20 px-4 justify-center overflow-hidden min-h-screen"
    >
      <div className="glowing-background"></div>
      <div className="max-w-8xl mx-auto relative z-10">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-[var(--white)] dark:text-gray-300">
          From Our Clients <br />
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={controls}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
          >
            {/* First set of testimonial cards */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${index}`}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 p-8 rounded-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 hover:transform hover:scale-105 group min-w-[280px] flex-shrink-0"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div className="h-48 overflow-hidden" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.div className="flex items-center mb-4" whileHover={{ x: 5 }}>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      {testimonial.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold ml-2 text-white group-hover:text-purple-300 transition-colors duration-300">
                      {testimonial.name}
                    </h3>
                  </motion.div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--secondary)] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <div>
                    <p className="text-gray-300">{testimonial.role}</p>
                    <p className="text-[var(--secondary)] font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set of testimonial cards for infinite scroll effect */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`second-${index}`}
                className="bg-white dark:bg-background text-[var(--bg-dark)] dark:text-[var(--neutral-bg)] border border-[var(--primary)] dark:border-gray-700 rounded-xl overflow-hidden min-w-[280px] flex-shrink-0"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
                  // rotation removed
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div className="h-48 overflow-hidden" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.div className="flex items-center mb-4" whileHover={{ x: 5 }}>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      {testimonial.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold ml-2">{testimonial.name}</h3>
                  </motion.div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[var(--secondary)] fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-900 dark:text-gray-300 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="text-gray-900 dark:text-gray-300">{testimonial.role}</p>
                    <p className="text-[var(--secondary)] font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
