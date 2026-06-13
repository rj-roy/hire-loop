export default function MainLayout({ children }) {
    return (
        <div className="pt-16 lg:pt-20 flex flex-col min-h-screen">
            {children}
        </div>
    );
};