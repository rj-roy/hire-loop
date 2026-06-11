import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/pricing/PricingSection";
import ThemeSwitch from "@/components/ui/ThemeSwitch";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <FeaturesSection/>
            <PricingSection/>
        </div>
    );
};

export default HomePage;