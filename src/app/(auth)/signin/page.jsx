import SignInComponent from "@/components/auth/SigninComponent";
import { Suspense } from "react";

export default function SignInPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SignInComponent/>
            </Suspense>
        </div>
    );
}