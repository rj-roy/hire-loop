import DashNav from "@/components/dashboard/DashNav";

export default function DashLayout({ children }) {
  return (
    <div className="w-full max-w-6xl mx-auto flex bg-white-bg dark:bg-sec-black-bg dark:text-gray-100 text-black py-16 lg:py-20 ">
      <DashNav />
      <main className="flex-1 flex flex-col p-8 h-full">
        {children}
      </main>
    </div>
  )
}