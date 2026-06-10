export const getAllJobs = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/jobs`);
    const result = await res.json();
    return result;
};

export const getAllApplications = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/applications`);
    const result = await res.json();
    return result;
};