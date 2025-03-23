import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Bekalu Merid",
    role: "CTO",
    company: "Kifiya Financial Technology",
    comment:
      "This monitoring solution has revolutionized how we handle our financial technology infrastructure.",
    rating: 5,
  },
  {
    name: "Sara Tadesse",
    role: "Head of Engineering",
    company: "Ride Technologies",
    comment:
      "The AI-powered insights have significantly improved our ride-hailing platform's performance monitoring.",
    rating: 5,
  },
  {
    name: "Yonas Berhanu",
    role: "Technical Director",
    company: "Ethio Telecom",
    comment:
      "Essential tool for maintaining our nationwide telecommunications infrastructure with real-time monitoring.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div
      id="testimonials"
      className="relative py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
          From Our Clients <br />
        </h2>
        <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
          See how leading Ethiopian technology companies are transforming their
          operations with our monitoring solution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-background border border-red-600 dark:border-gray-700 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
                ))}
              </div>
              <p className="text-gray-900 dark:text-gray-300 mb-6 italic">
                "{testimonial.comment}"
              </p>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-300">
                  {testimonial.name}
                </p>
                <p className="text-gray-900 dark:text-gray-300">
                  {testimonial.role}
                </p>
                <p className="text-red-500 font-medium">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
