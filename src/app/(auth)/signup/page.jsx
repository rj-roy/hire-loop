import SignupComponent from "@/components/auth/SignUpComponent";
import { Suspense } from "react";

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