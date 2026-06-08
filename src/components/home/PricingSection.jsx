export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
        </svg>
      ),
      features: [
        'Daily AI match brief (top 5)',
        'Verified salary bands',
        'Company insight dashboards',
        '1-click apply, unlimited',
      ],
      featured: false,
    },
    {
      name: 'Growth',
      price: '$17',
      period: '/month',
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Daily AI match brief (top 5)',
        'Verified salary bands',
        'Company insight dashboards',
        '1-click apply, unlimited',
      ],
      featured: true,
    },
    {
      name: 'Premium',
      price: '$99',
      period: '/month',
      icon: (
        <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      features: [
        'Everything in Pro',
        'Multi-profile career portfolios',
        'Shared talent rooms',
        'Recruiter view (read-only)',
      ],
      featured: false,
    },
  ];

  return (
    <section className="relative bg-white-bg dark:bg-black-bg py-24 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
            PRICING
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-10 leading-tight">
            Pay for the leverage,<br />not the listings
          </h2>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-800">
            <button className="px-5 py-2 rounded-full bg-white dark:bg-white text-gray-900 text-sm font-medium shadow-sm">
              Monthly
            </button>
            <button className="px-5 py-2 rounded-full text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-bold">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.featured
                  ? 'bg-white dark:bg-gray-100 border-2 border-indigo-500 dark:border-gray-200 shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 scale-[1.02]'
                  : 'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {plan.icon}
                  <span className={`font-semibold text-lg ${plan.featured ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className={`text-3xl font-bold ${plan.featured ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm ml-1 text-gray-500 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <p className={`text-sm font-medium mb-4 ${plan.featured ? 'text-gray-700' : 'text-gray-600 dark:text-gray-300'}`}>
                Start building your insights hub:
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold mt-0.5 ${
                      plan.featured 
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-gray-200 dark:text-gray-700' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      +
                    </span>
                    <span className={`text-sm ${plan.featured ? 'text-gray-700' : 'text-gray-600 dark:text-gray-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-between transition-all duration-200 ${
                  plan.featured
                    ? 'bg-gray-900 dark:bg-gray-900 text-white hover:bg-gray-800 dark:hover:bg-gray-800'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <span>Choose This Plan</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}