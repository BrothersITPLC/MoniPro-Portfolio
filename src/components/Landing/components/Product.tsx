import { Activity, Server, Cloud, Code } from "lucide-react";

const monitoringCards = [
  {
    title: "Network Monitoring",
    icon: <Activity className="w-6 h-6" />,
    description:
      "Real-time network performance monitoring with AI-powered insights",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Server Monitoring",
    icon: <Server className="w-6 h-6" />,
    description:
      "Comprehensive server health monitoring and predictive maintenance",
    image:
      "https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Cloud Monitoring",
    icon: <Cloud className="w-6 h-6" />,
    description: "Multi-cloud infrastructure monitoring and optimization",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=2000",
  },
  {
    title: "Application Monitoring",
    icon: <Code className="w-6 h-6" />,
    description: "End-to-end application performance monitoring and debugging",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000",
  },
];
export function Product() {
  return (
    <div
      id="products"
      className="relative py-20 px-4 border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h4 className="text-3xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
          Monitoring Solutions
        </h4>
        <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
          Comprehensive monitoring solutions for your infrastructure needs,
          powered by advanced AI technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {monitoringCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-background text-gray-900 dark:text-gray-300 border border-red-600 dark:border-gray-700 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
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
                <p className="text-gray-900 dark:text-gray-300">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
