import { Star } from "lucide-react";
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "DevOps Engineer",
    comment: "Loved how easy it was to monitor my servers!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "System Administrator",
    comment:
      "The AI-powered insights have saved us countless hours of manual monitoring.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "CTO",
    comment:
      "Best monitoring solution we've used. The real-time alerts are a game-changer.",
    rating: 5,
  },
];
export function Testimonials() {
  return (
    <div id="testimonials">
      <div className="py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current"
                    />
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
    </div>
  );
}
