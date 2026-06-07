'use client';
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from '../ui/ThemeSwitch';

export default function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-300 dark:bg-gray-900 px-15 py-4 max-w-7xl mx-auto rounded-2xl mt-5">
            <div className=" flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold bg-linear-to-r from-blue-500 via-blue-400 to-orange-500 bg-clip-text text-transparent">
                        hireloop
                    </span>
                </Link>

                <div className='flex items-center justify-center'>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/jobs"
                            className="transition-colors duration-200 text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white"
                        >
                            Browse Jobs
                        </Link>
                        <Link
                            href="/company"
                            className="transition-colors duration-200 text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white"
                        >
                            Company
                        </Link>
                        <Link
                            href="/pricing"
                            className="transition-colors duration-200 text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white"
                        >
                            Pricing
                        </Link>
                    </div>
                    <div className="h-6 w-px mx-8 hidden md:block bg-gray-700"></div>
                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/signin"
                            className="text-blue-500 hover:text-blue-400 transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Get Started
                        </Link>
                        <ThemeSwitch />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex justify-center items-center gap-3'>
                    <button
                        className="md:hidden dark:text-gray-300 dark:hover:text-white text-gray-700 hover:text-black focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    <ThemeSwitch/>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/jobs"
                            className="dark:text-gray-300 dark:hover:text-white transition-colors duration-200 px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Browse Jobs
                        </Link>
                        <Link
                            href="/company"
                            className="dark:text-gray-300 dark:hover:text-white transition-colors duration-200 px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Company
                        </Link>
                        <Link
                            href="/pricing"
                            className="dark:text-gray-300 dark:hover:text-white transition-colors duration-200 px-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <div className="border-t border-gray-800 pt-4 mt-4 flex flex-col space-y-3">
                            <Link
                                href="/signin"
                                className="text-blue-500 hover:text-blue-400 transition-colors duration-200 px-2 text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/get-started"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-center mx-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}