import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is 1darjeeling?",
    answer: "1darjeeling is a community-driven travel platform dedicated to Darjeeling. We connect travelers directly with local homestays, trusted local drivers, shared jeep route information, cozy cafes, and must-visit attractions."
  },
  {
    question: "How do I book a stay or contact a driver?",
    answer: "Browse through our 'Stays' or 'Drivers' categories, select a listing you like, and click the 'Book Now' or 'Contact' button. You can then fill out the request form to get in touch directly."
  },
  {
    question: "Are the shared jeep routes updated?",
    answer: "Yes, we collaborate with local drivers and transport associations to keep our jeep route and timing information as accurate and up-to-date as possible. However, weather and seasonal conditions might affect schedules."
  },
  {
    question: "Can I host my homestay or register as a driver on 1darjeeling?",
    answer: "Absolutely! We welcome local hosts and drivers. Click on the 'Host your stay' button in the menu or contact our support team to get your listing featured on our platform."
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setQuestionText("");
      setEmailText("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="bg-canvas border-t border-canvas-softer py-16 px-6 md:px-20 text-ink relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-body-text max-w-lg mx-auto">
            Everything you need to know about planning your perfect Himalayan getaway to Darjeeling.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="border border-canvas-softer rounded-xl overflow-hidden bg-canvas-soft/50 transition-all hover:border-mute/30"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-base md:text-lg border-none bg-transparent cursor-pointer text-ink focus:outline-none"
                >
                  <span>{item.question}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className={`w-5 h-5 text-body-text transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-48 border-t border-canvas-softer' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-sm md:text-base text-body-text leading-relaxed bg-canvas">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ask a Question Form */}
        <div className="bg-canvas-soft border border-canvas-softer rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-sm text-body-text mb-6">
            Can't find the answer you are looking for? Ask us directly and we'll get back to you.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center text-sm font-semibold animate-scale-up">
              🎉 Thank you! Your question has been submitted. We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="faq-email" className="block text-xs font-semibold uppercase tracking-wider text-body-text mb-2">
                    Email Address
                  </label>
                  <input
                    id="faq-email"
                    type="email"
                    required
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-canvas border border-canvas-softer rounded-xl p-3 text-sm focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="faq-question" className="block text-xs font-semibold uppercase tracking-wider text-body-text mb-2">
                    Your Question
                  </label>
                  <input
                    id="faq-question"
                    type="text"
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="What would you like to know?"
                    className="w-full bg-canvas border border-canvas-softer rounded-xl p-3 text-sm focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-canvas px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-primary-dark cursor-pointer border-none"
                >
                  Send Question
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
