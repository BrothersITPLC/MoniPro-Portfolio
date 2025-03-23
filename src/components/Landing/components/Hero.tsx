import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-300">
          AI-Powered Monitoring <br />
          <span className="text-red-500">at Your Fingertips</span>
        </h1>
        <p className="text-xl text-gray-900 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Intelligent monitoring for your entire infrastructure. Get real-time
          insights and predictive analytics powered by advanced AI.
        </p>

        <Link
          to="/auth"
          className="bg-red-500 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
        >
          Start Monitoring Now
        </Link>
      </div>
    </div>
  );
}
