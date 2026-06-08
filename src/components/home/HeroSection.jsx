import Image from "next/image";
import globe from "@/assets/images/globe.png"

export default function HeroSection() {
    const trendingTags = ['Product Designer', 'AI Engineering', 'DevOps Engineer'];

    const stats = [
        {
            label: 'Active Jobs',
            value: '50K',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: 'Companies',
            value: '12K',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            label: 'Job Seekers',
            value: '2M',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            label: 'Satisfaction Rate',
            value: '97%',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            )
        },
    ];

    return (
        <section className="relative min-h-screen bg-white-bg dark:bg-black-bg overflow-hidden flex flex-col items-center pt-24 pb-20">
            {/* Subtle background stars/gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent dark:from-indigo-900/20 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">

                {/* Top Badge */}
                <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#12121a] text-gray-600 dark:text-gray-300 text-xs font-medium tracking-wide shadow-sm">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    50,000+ NEW JOBS THIS MONTH
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 dark:text-white mb-5 tracking-tight leading-tight">
                    Find Your Dream Job Today
                </h1>

                {/* Subheading */}
                <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mb-10 text-sm md:text-base leading-relaxed">
                    HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-3xl bg-gray-100 dark:bg-[#12121a] border border-gray-200 dark:border-gray-800 rounded-2xl p-1.5 flex items-center shadow-lg dark:shadow-2xl dark:shadow-indigo-500/5 mb-8">
                    <div className="flex-1 flex items-center gap-3 px-4 py-2 text-gray-400 dark:text-gray-500">
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 text-sm"
                        />
                    </div>
                    <div className="w-px h-8 bg-gray-300 dark:bg-gray-700 shrink-0" />
                    <div className="flex-1 flex items-center gap-3 px-4 py-2 text-gray-400 dark:text-gray-500">
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="w-full bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 text-sm"
                        />
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-md shadow-indigo-500/20">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Trending Tags */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-20">
                    <span className="font-medium">Trending Position</span>
                    <div className="flex gap-2">
                        {trendingTags.map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a24] text-gray-700 dark:text-gray-300 text-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Globe Section */}
            <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center mt-10">
                {/* Globe Image Container */}
                <div className="relative w-full max-w-4xl aspect-2.5/1 flex items-center justify-center">
                    {/* Glow effect behind globe */}
                    <div className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-600/30 rounded-full blur-[100px] scale-75" />

                    {/* Replace src with your actual globe PNG path (e.g., /globe.png) */}
                    <Image
                        src={globe}
                        alt="Globe"
                        className="relative w-full h-full object-contain z-10"
                    />

                    {/* Overlay Text on Globe */}
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20 pointer-events-none">
                        <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 drop-shadow-lg leading-snug">
                            Assisting over 15,000 job seekers<br className="hidden sm:block" /> find their dream positions.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="relative z-30 w-full max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 -mt-12 md:-mt-16">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 dark:bg-[#12121a] border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col gap-4 shadow-lg dark:shadow-xl backdrop-blur-sm"
                        >
                            <div className="text-gray-600 dark:text-gray-400">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}