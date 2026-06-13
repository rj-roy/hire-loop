'use client'
import { authClient } from "@/lib/auth-client";
import { Envelope, Gear, Magnifier, Person } from "@gravity-ui/icons";
import { Bell, Bookmark, Briefcase, Building, CreditCard, FileText, House, LayoutDashboard, LogOut, SettingsIcon, User, Users, } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, } from "react-icons/fa";

const DashNav = () => {
    const [activeTab, setActiveTab] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: user } = authClient.useSession();

    const recruiterNavLinks = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];
    const seekerNavLinks = [
        { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
        { icon: FileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: CreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];
    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "Users" },
        { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navLinksMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks
    };
    const menuItems = navLinksMap[user?.role || 'seeker'];

    return (
        <>
            <div className="relative lg:h-screen lg:pb-15 lg:w-64">
                <button
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className=" z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-black" >
                    {!isMobileMenuOpen && (
                        <FaAngleRight className="size-8 fixed top-100 bottom-100    " />
                    )}
                </button>
                <aside className={`fixed top-16 z-40 h-screen pb-15 w-64 bg-white-bg dark:bg-black flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    {/* Header */}
                    <div className="p-6">
                        <div className="flex justify-between">
                            <h1 className="text-xl font-bold">Dashboard</h1>
                            <FaAngleLeft onClick={() => setIsMobileMenuOpen(false)} className="size-7 lg:hidden border rounded-full" />
                        </div>

                        <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-500/50 p-2">
                            <div className="flex size-8 items-center justify-center rounded-full bg-gray-900">
                                <User className="size-4 text-white" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">Seeker Portal</p>
                                <p className="text-xs text-gray-800 dark:text-gray-400">Professional Tier</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-1">
                        {menuItems.map(({ href, label, icon: Icon, }) => (
                            <Link href={href} key={href}>
                                <button
                                    onClick={() => setActiveTab(href)}
                                    className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeTab === href ? 'bg-gray-800 text-white' : 'dark:text-gray-400 hover:bg-gray-900 hover:text-gray-200'}`}>
                                    <Icon className="size-5" />
                                    <span className="font-medium">{label}</span>
                                </button>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 space-y-2">
                        <button className="w-full rounded-lg bg-white px-4 py-2.5 font-medium text-black transition-colors hover:bg-gray-200">
                            Post Resume
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 dark:text-gray-400 transition-colors hover:bg-gray-900 hover:text-white">
                            <LogOut className="size-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </aside>
            </div>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default DashNav;