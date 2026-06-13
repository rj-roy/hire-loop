import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const handleStatusCode = res => {
    if (res.status === 401) {
        redirect('/unauthorized');
    } else if (res.status === 403) {
        redirect('/unauthorized');
    }else if (!res.ok) {
        throw new Error("Something went wrong! Please try again later.");
    };
    return res.json();
};
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);

    return handleStatusCode(res);
};

export const serverMutation = async (path, data,) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return handleStatusCode(res);
};