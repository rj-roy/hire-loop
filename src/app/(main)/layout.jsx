import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";

export default function MainLayout({ children }) {
    return (
        <div>
            <div>
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};