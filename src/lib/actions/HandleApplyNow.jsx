'use client'
import ApplicationForm from '@/components/forms/ApplicationForm';
import { useState } from 'react';

const HandleApplyNow = ({ jobId, jobTitle, userId, isApplied }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/jobs/applications`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             jobId: jobId,
    //             userId: userId,
    //         }),
    //     });
    //     const data = await res.json();
    //     console.log(data);

    return (
        <>
            <button
                onClick={handleOpenModal}
                className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Apply Now
            </button>

            <ApplicationForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                jobId={jobId}
                jobTitle={jobTitle}
                userId={userId}
                isApplied={isApplied}
            />
        </>
    );
};

export default HandleApplyNow;
