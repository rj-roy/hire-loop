import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized');
    } else if (res.status === 403) {
        redirect('/unauthorized');
    };
    return res.json();
};
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);

    return handleStatusCode(res);
};