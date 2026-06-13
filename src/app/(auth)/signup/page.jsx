import SignupComponent from "@/components/auth/SignUpComponent";
import { Suspense } from "react";

export const metadata = {
    title: "Sign Up | Hire Loop",
    description: "Sign Up to Hire Loop",
};

const SignUpPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SignupComponent/>
            </Suspense>
        </div>
    );
};

export default SignUpPage;