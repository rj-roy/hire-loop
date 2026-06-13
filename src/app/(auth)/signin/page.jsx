import SignInComponent from "@/components/auth/SigninComponent";
import { Suspense } from "react";

export const metadata = {
    title: "Sign In | Hire Loop",
    description: "Sign In to your account",
};

export default function SignInPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SignInComponent/>
            </Suspense>
        </div>
    );
}