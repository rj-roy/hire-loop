import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) {
        redirect('/siginin');
    };
    const roleRouters = {
        seeker: '/dashboard/seeker',
        recruiter: '/dashboard/recruiter',
        admin: '/dashboard/admin'
    };
    redirect(roleRouters[session?.user?.role] ?? '/signin');
};

export default Dashboard;