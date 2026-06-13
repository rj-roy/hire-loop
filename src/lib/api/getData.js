import { serverFetch } from "../core/server";

export const getAllJobs = async ()=>{
    return serverFetch(`/jobs`)
};
export const getAllApplications = async ()=>{
    return serverFetch(`/applications`);
};
export const getJobsById = async (id)=>{
    return serverFetch(`/jobs/${id}`);
};