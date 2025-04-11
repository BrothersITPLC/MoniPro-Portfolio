import { useRef } from "react";
import { Activity, Server, Cloud } from "lucide-react";

export function AiFeatures() {
  const featuresRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="features"
      ref={featuresRef}
      className="relative py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
          Intelligent Monitoring <br />
        </h2>
        <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
          Advanced AI capabilities that transform your monitoring experience
          with smart automation and insights.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-background border border-[var(--primary)] dark:border-gray-700 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <Activity className="w-12 h-12 text-[var(--secondary)]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300">
              Predictive Analytics
            </h3>
            <p className="text-gray-900 dark:text-gray-300">
              AI-driven insights to predict and prevent system failures before
              they occur.
            </p>
          </div>
          <div className="bg-white dark:bg-background border border-[var(--primary)] dark:border-gray-700 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <Server className="w-12 h-12 text-[var(--secondary)]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300">
              Automated Response
            </h3>
            <p className="text-gray-900 dark:text-gray-300">
              Intelligent automation that responds to incidents in real-time.
            </p>
          </div>
          <div className="bg-white dark:bg-background border border-[var(--primary)] dark:border-gray-700 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="mb-6">
              <Cloud className="w-12 h-12 text-[var(--secondary)]" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300">
              Smart Alerts
            </h3>
            <p className="text-gray-900 dark:text-gray-300">
              Context-aware notifications that reduce alert fatigue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
