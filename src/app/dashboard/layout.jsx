import DashNav from "@/components/dashboard/DashNav";

export default function DashLayout({ children }) {
  return (
    <div className=" w-full max-w-6xl mx-auto flex min-h-screen bg-white-bg dark:bg-sec-black-bg dark:text-gray-100 text-black">
            <DashNav />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
  )
}