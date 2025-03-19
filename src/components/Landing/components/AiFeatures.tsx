import { useRef } from "react";
import { Activity, Server, Cloud } from "lucide-react";
export function AiFeatures() {
  const featuresRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="features"
      ref={featuresRef}
      className="py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          AI-Powered Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <Activity className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
            <p className="text-gray-400 group-hover:text-white transition-colors">
              AI-driven insights to predict and prevent system failures before
              they occur.
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
  );
}
