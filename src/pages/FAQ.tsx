import { House } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AI-Powered Monitoring?",
    answer:
      "AI-Powered Monitoring combines traditional system monitoring with artificial intelligence to provide predictive analytics, automated responses, and intelligent insights. It helps identify potential issues before they become problems and reduces false alerts through smart filtering.",
  },
  {
    question: "How does the pricing structure work?",
    answer:
      "We offer flexible pricing plans designed to accommodate different needs and scales. Each plan includes core monitoring features, with higher tiers offering advanced AI capabilities, increased data retention, and priority support. Volume discounts are available for annual subscriptions.",
  },
  {
    question: "Can I monitor multiple platforms simultaneously?",
    answer:
      "Yes! Our solution supports comprehensive monitoring across various platforms including networks, servers, cloud infrastructure, and applications. You can monitor all your systems from a single dashboard with unified alerts and reporting.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide 24/7 technical support through multiple channels including email, chat, and phone. Enterprise plans include dedicated support representatives and priority response times. Our knowledge base and documentation are continuously updated.",
  },
  {
    question: "How secure is your monitoring solution?",
    answer:
      "Security is our top priority. We implement end-to-end encryption, regular security audits, and comply with international data protection standards. All data is stored in secure, redundant data centers with strict access controls.",
  },
  {
    question: "Can I integrate with existing tools?",
    answer:
      "Absolutely! Our platform offers extensive API support and pre-built integrations with popular tools and services. We support webhook notifications, custom API endpoints, and various authentication methods for seamless integration.",
  },
  {
    question: "What makes your AI features unique?",
    answer:
      "Our AI technology uses advanced machine learning algorithms trained on vast amounts of monitoring data. This enables accurate anomaly detection, predictive maintenance recommendations, and automated incident response that becomes more intelligent over time.",
  },
  {
    question: "Do you offer a trial period?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start the trial, and you can upgrade to a paid plan at any time during or after the trial period.",
  },
];

export function FAQ() {
  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <div className="max-w-4xl mx-auto py-20 px-4">
        {/* Add home icon */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="hover:text-red-500 transition-colors">
            <House className="h-6 w-6" />
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-300">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-900 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered monitoring
            solution
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-red-600 dark:border-gray-700 rounded-lg px-6 py-2 bg-white dark:bg-background"
            >
              <AccordionTrigger className="text-lg font-semibold text-gray-900 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-900 dark:text-gray-300 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-gray-900 dark:text-gray-300">
            Still have questions?{" "}
            <a
              href="mailto:support@brothersitplc.com"
              className="text-red-500 hover:text-red-600 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
