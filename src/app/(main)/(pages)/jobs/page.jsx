import AllJobs from '@/components/jobs/AllJobs';
import React from 'react';

export const metadata = {
    title: 'Browse Jobs | Hire Loop',
    description: 'Hire Loop Jobs Page',
};

const Jobs = () => {
    return (
        <div>
            <AllJobs/>
        </div>
    );
};

export default Jobs;