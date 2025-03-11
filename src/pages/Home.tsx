import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Server, 
  Cloud, 
  Code, 
  ChevronRight, 
  Star,
  Check,
  Zap,
  Shield,
  Clock,
  Users,
  Bell,
  BarChart,
  Settings,
  Database
} from 'lucide-react';

const monitoringCards = [
  {
    title: 'Network Monitoring',
    icon: <Activity className="w-6 h-6" />,
    description: 'Real-time network performance monitoring with AI-powered insights',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Server Monitoring',
    icon: <Server className="w-6 h-6" />,
    description: 'Comprehensive server health monitoring and predictive maintenance',
    image: 'https://images.unsplash.com/photo-1586772680166-d4ee06759adf?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Cloud Monitoring',
    icon: <Cloud className="w-6 h-6" />,
    description: 'Multi-cloud infrastructure monitoring and optimization',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000'
  },
  {
    title: 'Application Monitoring',
    icon: <Code className="w-6 h-6" />,
    description: 'End-to-end application performance monitoring and debugging',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'DevOps Engineer',
    comment: 'Loved how easy it was to monitor my servers!',
    rating: 5
  },
  {
    name: 'Mike Chen',
    role: 'System Administrator',
    comment: 'The AI-powered insights have saved us countless hours of manual monitoring.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'CTO',
    comment: "Best monitoring solution we've used. The real-time alerts are a game-changer.",
    rating: 5
  }
];

const pricingPlans = [
  {
    name: 'Basic Plan',
    price: 29,
    description: 'Perfect for small teams and startups',
    icon: <Shield className="w-12 h-12 text-blue-400" />,
    features: [
      'Up to 10 servers monitoring',
      'Basic AI insights',
      'Email notifications',
      '5 team members',
      '12-hour data retention',
      'Community support'
    ],
    color: 'blue',
    popular: false
  },
  {
    name: 'Premium Plan',
    price: 99,
    description: 'Ideal for growing businesses',
    icon: <Zap className="w-12 h-12 text-red-500" />,
    features: [
      'Up to 50 servers monitoring',
      'Advanced AI predictions',
      'Multi-channel alerts',
      '15 team members',
      '30-day data retention',
      '24/7 priority support',
      'Custom dashboards',
      'API access'
    ],
    color: 'red',
    popular: true
  },
  {
    name: 'Enterprise Plan',
    price: 299,
    description: 'For large-scale operations',
    icon: <Database className="w-12 h-12 text-purple-500" />,
    features: [
      'Unlimited servers monitoring',
      'Custom AI models',
      'Advanced integrations',
      'Unlimited team members',
      '90-day data retention',
      'Dedicated support manager',
      'Custom feature development',
      'SLA guarantee',
      'On-premise deployment'
    ],
    color: 'purple',
    popular: false
  }
];

export function Home() {
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  const calculatePrice = (monthlyPrice: number, planName: string) => {
    if (isYearly) {
      let discountRate = 0.05; // Default 5% for Basic plan
      
      if (planName === 'Premium Plan') {
        discountRate = 0.08; // 8% for Premium plan
      } else if (planName === 'Enterprise Plan') {
        discountRate = 0.10; // 10% for Enterprise plan
      }
      
      return Math.floor(monthlyPrice * 12 * (1 - discountRate));
    }
    return monthlyPrice;
  };

  const getPriceLabel = () => isYearly ? '/year' : '/month';

  const getOriginalPrice = (monthlyPrice: number) => {
    return isYearly ? monthlyPrice * 12 : monthlyPrice;
  };

  const getSavingsPercentage = (planName: string) => {
    if (planName === 'Premium Plan') {
      return 8;
    } else if (planName === 'Enterprise Plan') {
      return 10;
    }
    return 5; // Basic plan
  };
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#hero' || !hash) {
      scrollToHero();
    } else if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  const handleGetStarted = () => {
    // Navigate to auth page with payment as the redirect destination
    navigate('/auth', { 
      state: { 
        redirectTo: '/payment',
        plan: hoveredPlan !== null ? pricingPlans[hoveredPlan] : null
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-20"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="relative z-10 text-center px-4" >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Monitoring <br />
            <span className="text-red-500">at Your Fingertips</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Intelligent monitoring for your entire infrastructure. Get real-time insights and predictive analytics powered by advanced AI.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-red-500 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
          >
            Start Monitoring Now
          </button>
        </div>
      </div>

      {/* Product Showcase */}
      <div id="solutions" className="py-20 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Monitoring Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {monitoringCards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {card.icon}
                    <h3 className="text-xl font-semibold ml-2">{card.title}</h3>
                  </div>
                  <p className="text-gray-400">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features Section */}
      <div id="features" ref={featuresRef} className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <Activity className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                AI-driven insights to predict and prevent system failures before they occur.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <Server className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Automated Response</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                Intelligent automation that responds to incidents in real-time.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all duration-300">
              <div className="mb-6">
                <Cloud className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Alerts</h3>
              <p className="text-gray-400 group-hover:text-white transition-colors">
                Context-aware notifications that reduce alert fatigue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" ref={pricingRef} className="py-12 px-4 bg-gray-800">
        <div className="max-w-7xl mx-auto pt-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2> 
            
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full mt-4   border border-gray-700/50">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${!isYearly ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${isYearly ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-gray-400 hover:text-white'}`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9  ">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative bg-gray-900 rounded-2xl p-6 h-full flex flex-col
                  transition-all duration-300 transform 
                  ${hoveredPlan === index ? 'scale-105 ring-2 ring-red-500 shadow-2xl shadow-red-500/20' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  {plan.icon}
                  <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    {isYearly && (
                      <span className="text-lg line-through text-gray-500 mr-2">
                        ${getOriginalPrice(plan.price)}
                      </span>
                    )}
                    <span className="text-4xl font-bold">${calculatePrice(plan.price, plan.name)}</span>
                    <span className="text-gray-400 ml-2">{getPriceLabel()}</span>
                  </div>
                  {isYearly && (
                    <div className="mt-2">
                      <span className="inline-block bg-green-500/10 text-green-400 text-sm px-2 py-1 rounded">
                        Save {getSavingsPercentage(plan.name)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-grow space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className={`w-5 h-5 text-${plan.color}-500 mr-3 flex-shrink-0`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleGetStarted()}
                  className={`w-full mt-6 bg-gray-800 text-white py-2.5 px-6 rounded-lg font-semibold 
                    text-center transition-all duration-300 transform hover:scale-105
                    hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20
                    ${hoveredPlan === index ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-4 bg-gray-800 mb-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xl font-semibold mb-4 md:mb-0">
            Ready to transform your monitoring experience?
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 flex items-center"
          >
            Start free trial for 30 Days
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}