import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-mute">
          PERTANYAAN UMUM
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          FAQ Seputar Sablon DTF
        </h2>
        <p className="mt-2 text-sm sm:text-base text-mute">
          Hal-hal yang sering ditanyakan sebelum memesan kaos custom di YassTshirt.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-line overflow-hidden shadow-card transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset"
              >
                <span className="text-base sm:text-lg font-bold text-navy">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-navy transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className="px-6 pb-6 pt-1 text-sm sm:text-base text-mute leading-relaxed border-t border-line animate-in fade-in duration-200"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
