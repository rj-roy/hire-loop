'use client';
import { useState } from 'react';

const jobSeekerPlans = [
  {
    name: 'Seeker_Free',
    price: 0,
    period: '/forever',
    subtitle: 'Get started with the basics',
    featured: false,
    features: [
      'Browse & save up to 10 jobs',
      'Apply to up to 3 jobs per month',
      'Basic profile',
      'Email alerts',
    ],
  },
  {
    name: 'Seeker_Pro',
    price: 19,
    period: '/month',
    subtitle: 'For serious job seekers',
    featured: true,
    features: [
      'Apply to up to 30 jobs per month',
      'Unlimited saved jobs',
      'Application tracking',
      'Salary insights',
    ],
  },
  {
    name: 'Seeker_Premium',
    price: 39,
    period: '/month',
    subtitle: 'Maximum visibility & support',
    featured: false,
    features: [
      'Everything in Pro',
      'Unlimited applications',
      'Profile boost to recruiters',
      'Early access to new jobs',
      'Priority support',
    ],
  },
];

const recruiterPlans = [
  {
    name: 'Recruiter_Free',
    price: 0,
    period: '/forever',
    subtitle: 'Great for your first year of hiring',
    featured: false,
    features: [
      'Up to 3 active job posts',
      'Basic applicant management',
      'Standard listing visibility',
    ],
  },
  {
    name: 'Recruiter_Growth',
    price: 49,
    period: '/month',
    subtitle: 'Scale your hiring pipeline',
    featured: true,
    features: [
      'Up to 10 active job posts',
      'Applicant tracking',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Recruiter_Enterprise',
    price: 149,
    period: '/month',
    subtitle: 'Full power, full branding',
    featured: false,
    features: [
      'Up to 50 active job posts',
      'Advanced analytics dashboard',
      'Featured job listings',
      'Team collaboration',
      'Custom branding',
      'Priority support',
    ],
  },
];

const faqs = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer:
      'Yes — you can cancel anytime from your account settings. Your plan will remain active until the end of your current billing period, and you won\'t be charged again.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a full refund within 7 days of your initial payment if you\'re not satisfied. After that, no partial refunds are issued, but you can cancel to prevent future charges.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards (Visa, Mastercard, American Express) as well as PayPal. All payments are securely processed via Stripe.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade your plan at any time. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change takes effect at the start of your next billing cycle.',
  },
];


const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function PricingSection() {
  const [audience, setAudience] = useState('seekers');
  // const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const plans = audience === 'seekers' ? jobSeekerPlans : recruiterPlans;

  return (
    <section className="relative bg-white-bg dark:bg-black-bg py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
            PRICING
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
            Pay for the leverage,<br />not the listings
          </h2>

          {/* ── Audience Toggle ─────────────────────────────────────────── */}
          <div className="inline-flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-800">
            <button
              onClick={() => setAudience('seekers')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${audience === 'seekers'
                ? 'bg-white dark:bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              For Job Seekers
            </button>
            <button
              onClick={() => setAudience('recruiters')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${audience === 'recruiters'
                ? 'bg-white dark:bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2" />
              </svg>
              For Recruiters
            </button>
          </div>

          {/* ── Billing Toggle ──────────────────────────────────────────── */}
          <div className="mt-6 inline-flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-800">
          </div>
        </div>

        {/* ── Pricing Cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <div
                key={`${audience}-${index}`}
                className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 ${plan.featured
                  ? 'bg-white dark:bg-gray-100 border-2 border-indigo-500 dark:border-gray-200 shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 scale-[1.02]'
                  : 'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800'
                  }`}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[11px] font-bold tracking-wide shadow-lg">
                    MOST POPULAR
                  </span>
                )}

                {/* Plan Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-lg ${plan.featured ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${plan.featured ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>

                {/* Subtitle */}
                <p className={`text-sm mb-6 ${plan.featured ? 'text-gray-700' : 'text-gray-600 dark:text-gray-300'}`}>
                  {plan.subtitle}
                </p>

                {/* Divider */}
                <div className={`h-px mb-6 ${plan.featured ? 'bg-gray-200 dark:bg-gray-200' : 'bg-gray-200 dark:bg-gray-800'}`} />

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${plan.featured
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-200 dark:text-gray-700'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}
                      >
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span className={`text-sm ${plan.featured ? 'text-gray-700' : 'text-gray-600 dark:text-gray-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="mt-8">
                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="plan_id" value={plan.id} />
                    <section>
                      <button type="submit" role="link"
                        className={`block w-full text-center text-xs font-semibold px-4 py-3 rounded-xl transition duration-200 ${plan.featured
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                          }`}
                      >
                        Checkout
                      </button>
                    </section>
                  </form>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FAQ Accordion ──────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
              FAQ
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Frequently asked questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors duration-200 ${isOpen
                    ? 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-900/60'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className={`font-medium text-sm pr-4 ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {faq.question}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
