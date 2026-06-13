export default function AuthLayout({ children }) {
    return (
        <div className="h-screen">
            <div className="pt-16 lg:pt-20">
                {children}
            </div>
        </div>
    );
};