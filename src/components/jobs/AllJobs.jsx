'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllJobs } from '@/lib/getData';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({
        fullTime: false,
        contract: false,
        freelance: false,
    });
    const [sortBy, setSortBy] = useState('recent');
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data || []);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Filter and sort jobs - UPDATED TO MATCH YOUR DATA STRUCTURE
    const filteredJobs = jobs?.filter(job => {
        const matchesSearch = job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.jobCategory?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            (!selectedFilters.fullTime || job.jobType === 'full-time') &&
            (!selectedFilters.contract || job.jobType === 'contract') &&
            (!selectedFilters.freelance || job.jobType === 'freelance');
        return matchesSearch && matchesFilter;
    }).sort((a, b) => {
        if (sortBy === 'recent') {
            // Sort by deadline or _id (since there's no postedAt)
            return new Date(b.deadline) - new Date(a.deadline);
        }
        if (sortBy === 'salary') {
            return (b.maxSalary || 0) - (a.maxSalary || 0);
        }
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(filteredJobs?.length / jobsPerPage);
    const currentJobs = filteredJobs?.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    const toggleFilter = (filter) => {
        setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
        setCurrentPage(1);
    };

    const filterCounts = {
        fullTime: jobs?.filter(j => j.jobType === 'full-time').length || 0,
        contract: jobs?.filter(j => j.jobType === 'contract').length || 0,
        freelance: jobs?.filter(j => j.jobType === 'freelance').length || 0,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white-bg dark:bg-black-bg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white-bg dark:bg-black-bg py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by job title, category..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="block w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                            Search Jobs
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-64 shrink-0">
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Filters</h3>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Job Type</h4>
                                    <div className="space-y-3">
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters.fullTime}
                                                    onChange={() => toggleFilter('fullTime')}
                                                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                                                />
                                                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                    Full-time
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{filterCounts.fullTime}</span>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters.contract}
                                                    onChange={() => toggleFilter('contract')}
                                                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                                                />
                                                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                    Contract
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{filterCounts.contract}</span>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters.freelance}
                                                    onChange={() => toggleFilter('freelance')}
                                                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                                                />
                                                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                    Freelance
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{filterCounts.freelance}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <p className="text-gray-900 dark:text-white font-semibold">
                                Found {filteredJobs?.length?.toLocaleString() || 0} Professional Jobs
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="recent">Most Recent</option>
                                    <option value="salary">Highest Salary</option>
                                </select>
                            </div>
                        </div>

                        {/* Job Listings */}
                        <div className="space-y-4">
                            {currentJobs?.map((job, index) => (
                                <Link href={`jobs/${job._id}`} key={index}>
                                    <div
                                        className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 group cursor-pointer"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Company Logo - Using first letter of category since no company field */}
                                            <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {job.jobCategory?.charAt(0).toUpperCase() || 'J'}
                                            </div>

                                            {/* Job Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {job.jobTitle}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {job.jobCategory} • {job.location} {job.isRemote && '(Remote)'}
                                                        </p>
                                                    </div>
                                                    <button className="shrink-0 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap items-center gap-3 mt-4">
                                                    {/* Salary */}
                                                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">
                                                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {job.currency} {job.minSalary?.toLocaleString()} - {job.maxSalary?.toLocaleString()}
                                                    </span>

                                                    {/* Job Type */}
                                                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium capitalize">
                                                        {job.jobType}
                                                    </span>

                                                    {/* Remote Badge */}
                                                    {job.isRemote && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-900/30 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-600/30">
                                                            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Remote
                                                        </span>
                                                    )}

                                                    {/* Deadline */}
                                                    {job.deadline && (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-orange-900/30 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-medium border border-orange-600/30">
                                                            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            Deadline: {new Date(job.deadline).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {currentJobs?.length === 0 && (
                                <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No jobs found</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {[...Array(totalPages)].map((_, i) => {
                                    const pageNum = i + 1;
                                    const showEllipsis = pageNum > 3 && pageNum < totalPages - 2;

                                    if (showEllipsis && pageNum !== currentPage) {
                                        if (i === 3 || i === totalPages - 3) {
                                            return (
                                                <span key={i} className="px-3 py-2 text-gray-400">...</span>
                                            );
                                        }
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === pageNum
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllJobs;