import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FooterSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const footerLinks = {
    Product: ['Job discovery', 'Worker AI', 'Companies', 'Salary data'],
    Navigations: ['Help center', 'Career library', 'Contact'],
    Resources: ['Brand Guideline', 'Newsroom'],
  };

  return (
    <footer className="relative z-60 bg-white-bg dark:bg-black-bg overflow-hidden">
      {/* CTA Section with Grid Dome Background */}
      <div className={`${session ? 'hidden' : 'relative pt-32 pb-24 px-4 text-center'}`}>
        
        {/* Grid Dome PNG Background */}
        <div className="absolute inset-0 top-0 h-150 flex justify-center pointer-events-none">
          {/* <Image
            src={bgGrid}
            alt="" 
            className="h-full w-auto object-contain opacity-30 dark:opacity-30"
          /> */}
        </div>
        
        {/* Top Glow - Blue for light mode, Purple for dark */}
        <div className="absolute top-30 left-1/2 -translate-x-1/2 w-200 h-100 bg-blue-500/10 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
            Your next role is<br />already looking for you
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full sm:w-auto">
              Create a free account
            </button>
            <button className="px-8 py-3.5 bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto">
              View pricing
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12 border-t border-gray-200 dark:border-gray-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 text-2xl font-bold mb-4">
              <span className="text-blue-600 dark:text-blue-500">hire</span>
              <span className="text-orange-600 dark:text-orange-500">loop</span>
            </div>
            <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed max-w-xs">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-indigo-600 dark:text-indigo-400 font-medium mb-6 text-sm">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-8 border-t border-gray-200 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        {/* Copyright & Legal */}
        <div className="text-gray-600 dark:text-gray-500 text-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>Copyright 2026 — Rj-Roy</span>
          <span className="hidden sm:inline">·</span>
          <div className="flex gap-2">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms & Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Guideline</a>
          </div>
        </div>
      </div>
    </footer>
  );
}