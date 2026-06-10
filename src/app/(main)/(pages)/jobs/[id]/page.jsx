import HandleApplyNow from '@/lib/actions/HandleApplyNow';
import { auth } from '@/lib/auth';
import { getAllApplications, getAllJobs } from '@/lib/getData';
import { headers } from 'next/headers';
import Link from 'next/link';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const allJobs = await getAllJobs();
    const expectedJob = allJobs.find(job => job._id === id);

    if (!expectedJob) {
        return {
            title: 'Job Not Found | Hire Loop',
            description: 'The job you are looking for does not exist or has been removed.',
        };
    }

    const jobTitle = expectedJob.jobTitle || 'Job';
    const companyName = expectedJob.company || 'Company';
    const location = expectedJob.location || 'Remote';
    const jobType = expectedJob.jobType || 'Full-time';

    return {
        title: `${jobTitle} at ${companyName} | Hire Loop`,
        description: `Apply for ${jobTitle} position at ${companyName}. ${jobType} role in ${location}. View full job description and requirements.`,
        openGraph: {
            title: `${jobTitle} at ${companyName}`,
            description: `${jobType} position in ${location}. Competitive salary and benefits. Apply now!`,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${jobTitle} at ${companyName}`,
            description: `${jobType} position in ${location}. Apply now on Hire Loop!`,
        },
    };
}

const JobDetails = async ({params}) => {
    const {id} = await params;
    const allJobs = await getAllJobs();
    const allApplications = await getAllApplications();
    const expectedJob = allJobs?.find(job => job._id === id);
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;
    const isApplied = allApplications.find(app => app.userId === userId && app.jobId === id);

    // if(!session) {
    //     return (
    //         <div>
    //             <Link href="/">
    //                 <button>Go Back</button>
    //             </Link>
    //             <h1>Please login to view job details and apply.</h1>
    //         </div>
    //     )
    // }

    if (!expectedJob) {
        return (
            <div className="min-h-screen bg-white-bg dark:bg-black-bg pt-24 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Job Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/jobs" className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors inline-block">
                        Browse Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white-bg dark:bg-black-bg pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex items-start gap-4">
                            {/* Company Logo */}
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-white font-bold text-2xl">
                                    {expectedJob.company?.charAt(0) || 'C'}
                                </span>
                            </div>
                            
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{expectedJob.jobTitle}</h1>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{expectedJob.company}</span>
                                    <span className="flex items-center gap-1 text-green-600 dark:text-green-500 text-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verified Employer
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <HandleApplyNow
                            jobId={expectedJob._id}
                            jobTitle={expectedJob.jobTitle}
                            userId={userId}
                            isApplied={isApplied}
                        />
                    </div>
                </div>

                {/* Job Metadata Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-medium">SALARY RANGE</span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold text-sm">{expectedJob.currency} {expectedJob.minSalary?.toLocaleString()} - {expectedJob.maxSalary?.toLocaleString()}</p>
                    </div>

                    <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-xs font-medium">LOCATION</span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold text-sm">{expectedJob.location} {expectedJob.isRemote && '(Remote)'}</p>
                    </div>

                    <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs font-medium">JOB TYPE</span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold text-sm capitalize">{expectedJob.jobType}</p>
                    </div>

                    <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-xs font-medium">EXPERIENCE</span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold text-sm">5+ Years</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Job Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description */}
                        <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                We are looking for a talented {expectedJob.jobTitle} to join our team. 
                                You will be working on exciting projects and collaborating with cross-functional teams 
                                to deliver high-quality products. This is a great opportunity to grow your career 
                                with a dynamic and innovative company.
                            </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Responsibilities</h2>
                            <ul className="space-y-3">
                                {expectedJob.responsibilities?.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="text-gray-900 dark:text-white mt-1.5">•</span>
                                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h2>
                            <div className="space-y-4">
                                {/* Skills Tags */}
                                {expectedJob.requirements && expectedJob.requirements.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {expectedJob.requirements.map((skill, index) => (
                                            <span key={index} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-md text-sm flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900 dark:text-white mt-1.5">•</span>
                                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">5+ years of experience in related field</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-gray-900 dark:text-white mt-1.5">•</span>
                                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">Strong portfolio showcasing your work and problem-solving skills</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefits</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {expectedJob.benefits?.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Company Overview */}
                    <div className="lg:col-span-1">
                        <div className="bg-sec-white-bg dark:bg-sec-black-bg rounded-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-800">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Overview</h2>
                            
                            {/* Company Image */}
                            <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-linear-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-500 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-800">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">SIZE</span>
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">250 - 500 Employees</span>
                                </div>
                                
                                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-800">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">INDUSTRY</span>
                                    <span className="text-gray-900 dark:text-white text-sm font-medium">{expectedJob.jobCategory || 'Technology'}</span>
                                </div>
                                
                                <button className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-2.5 rounded-md text-sm font-medium transition-colors mt-4">
                                    Visit Website
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;