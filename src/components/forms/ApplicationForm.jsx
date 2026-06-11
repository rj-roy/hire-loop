'use client';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ApplicationForm({ isOpen, onClose, jobId, jobTitle, userId, isApplied, isExceedLimit, isSeeker }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm();

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (file.type !== 'application/pdf') {
                setError('resume', {
                    type: 'manual',
                    message: 'Only PDF files are allowed'
                });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('resume', {
                    type: 'manual',
                    message: 'File size must be less than 5MB'
                });
                return;
            }

            setSelectedFile(file);
        }
    };

    const onSubmit = async (data) => {
        if (!selectedFile) {
            setError("resume", {
                type: "manual",
                message: "Please upload your resume",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const uploadFormData = new FormData();
            uploadFormData.append("resume", selectedFile);

            const uploadResponse = await fetch("/api/upload-resume", {
                method: "POST",
                body: uploadFormData,
            });

            const uploadData = await uploadResponse.json();
            if (!uploadData.success) {
                throw new Error(uploadData.message || "Resume upload failed");
            }

            const applicationData = {
                name: data.name,
                contact: data.contact,
                email: data.email,
                resumeUrl: uploadData.url,
                jobId,
                userId,
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/jobs/applications`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(applicationData),
                }
            );
            const text = await res.text();
            if (!res.ok) {
                throw new Error("Failed to submit application");
            }
            alert("Application submitted successfully!");
            router.push('/dashboard');

            reset();
            setSelectedFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            onClose();
        } catch (error) {
            console.error(error);

            setError("root", {
                type: "manual",
                message: error.message || "Something went wrong",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    if (!session) {
        return (
            <div>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className='relative bg-white-bg dark:bg-black-bg rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom-4 duration-300'>

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-end justify-end absolute top-2 right-2"
                            aria-label="Close modal"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h1 className='text-center text-3xl py-15 px-8'>Please
                            <Link href={`/signin?redirect=jobs/${jobId}`} className='font-bold px-2 underline text-blue-500 hover:text-blue-700'>
                                Sign-in
                            </Link>
                            to apply for this job</h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            {
                session && (
                    <div>
                        <div className='relative bg-white-bg dark:bg-black-bg rounded-2xl shadow-2xl w-full max-w-5xl border border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom-4 duration-300'>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-end justify-end absolute top-2 right-2"
                                aria-label="Close modal"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {
                                !isSeeker ? (
                                    <h1 className='text-center font-bold text-3xl py-15 px-8'>
                                        Only job seekers can apply for jobs. Recruiters are not allowed to apply for jobs.
                                    </h1>)
                                    
                                    : isExceedLimit ? (
                                        <h1 className='text-center font-bold text-3xl py-15 px-8'>
                                            You&apos;ve Exceed the Application Limit for this job. Please <Link href={'/pricing'} className='text-blue-500 hover:text-blue-700'>
                                                Upgrade your plan
                                            </Link> to continue applying.
                                        </h1>)

                                        : isApplied ? (
                                            <h1 className='text-center font-bold text-3xl py-15 px-5'>
                                                You&apos;ve Already Applied this job. Please wait for comfirmation!
                                            </h1> ) 

                                            : (
                                            <div className='w-full lg:min-w-xl '>
                                                {/* Header */}
                                                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                                                    <div>
                                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Apply for Position</h2>
                                                        {jobTitle && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{jobTitle}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Form */}
                                                <form onSubmit={(e) => handleSubmit(onSubmit)(e)} className="p-6 space-y-5">
                                                    {/* Name Field */}
                                                    <div>
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Full Name <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            {...register('name', {
                                                                required: 'Name is required',
                                                                minLength: {
                                                                    value: 2,
                                                                    message: 'Name must be at least 2 characters'
                                                                }
                                                            })}
                                                            className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                                                                } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                                            placeholder="John Doe"
                                                        />
                                                        {errors.name && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Contact Field */}
                                                    <div>
                                                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Contact Number <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            id="contact"
                                                            type="tel"
                                                            {...register('contact', {
                                                                required: 'Contact number is required',
                                                                pattern: {
                                                                    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                                                                    message: 'Please enter a valid phone number'
                                                                }
                                                            })}
                                                            className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.contact ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                                                                } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                                            placeholder="+1 (555) 123-4567"
                                                        />
                                                        {errors.contact && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.contact.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Email Field */}
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Email Address <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            {...register('email', {
                                                                required: 'Email is required',
                                                                pattern: {
                                                                    value: /^\S+@\S+\.\S+$/,
                                                                    message: 'Please enter a valid email address'
                                                                }
                                                            })}
                                                            className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-800'
                                                                } rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                                            placeholder="john@example.com"
                                                        />
                                                        {errors.email && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Resume Upload */}
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Resume (PDF) <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                onChange={handleFileChange}
                                                                accept=".pdf,application/pdf"
                                                                className="hidden"
                                                                id="resume-upload"
                                                            />
                                                            <label
                                                                htmlFor="resume-upload"
                                                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${errors.resume
                                                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                                                                    : selectedFile
                                                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                                                                        : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                                    }`}
                                                            >
                                                                {selectedFile ? (
                                                                    <div className="flex flex-col items-center">
                                                                        <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <p className="text-sm font-medium text-green-700 dark:text-green-400">{selectedFile.name}</p>
                                                                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                                                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                                        </p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-col items-center">
                                                                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                                        </svg>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF only (max 5MB)</p>
                                                                    </div>
                                                                )}
                                                            </label>
                                                        </div>
                                                        {errors.resume && (
                                                            <p className="mt-1 text-sm text-red-500">{errors.resume.message}</p>
                                                        )}
                                                    </div>

                                                    {/* Error Message */}
                                                    {errors.root && (
                                                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                                            <p className="text-sm text-red-700 dark:text-red-400">{errors.root.message}</p>
                                                        </div>
                                                    )}

                                                    {/* Submit Button */}
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            'Submit Application'
                                                        )}
                                                    </button>
                                                </form>
                                            </div>
                                        )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
}