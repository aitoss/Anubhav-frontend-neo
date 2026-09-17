"use client"

import { AuthPage } from "supertokens-auth-react/ui"
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui"

export default function AuthRoutePage() {
    return <AuthPage preBuiltUIList={[EmailPasswordPreBuiltUI]} />
}