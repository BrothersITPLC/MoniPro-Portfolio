import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { useEffect } from "react";

export function Hero() {
  useEffect(() => {
    // Log a message to confirm the component is mounting properly
    console.log("Hero component mounted");
  }, []);

  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center  overflow-hidden dark:border-b-slate-700 dark:bg-background"
    >
      {/* Position the Spline element as absolute to prevent it from affecting layout */}
      <div className="absolute inset-0 z-0">
        <Spline className="w-full h-full" scene="https://prod.spline.design/bqX65cHQy1NA-28I/scene.splinecode" />
      </div>


      <div className="relative z-10 text-left px-4 md:px-12 lg:px-20 max-w-4xl ml-0 md:ml-8 lg:ml-16">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Monitoring <br />
            <span className="text-[var(--secondary)]">at Your Fingertips</span>
          </h1>

          <Link
            to="/auth"
            className="bg-[var(--secondary)] mt-10 px-8 py-4 rounded-lg text-xl text-white font-semibold hover:bg-[var(--primary)] transition-all transform hover:scale-105 inline-block"
          >
            Start Monitoring Now
          </Link>
        </div>
      </div> 
    </div>
  )
}
