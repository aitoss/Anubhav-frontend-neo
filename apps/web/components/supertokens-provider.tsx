"use client"

import * as React from "react"
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword"
import Session from "supertokens-auth-react/recipe/session"

let isInitialized = false

function initSuperTokens() {
    if (isInitialized || typeof window === "undefined") {
        return
    }

    isInitialized = true

    SuperTokens.init({
        appInfo: {
            appName: "Anubhav",
            apiDomain: process.env.NEXT_PUBLIC_SUPERTOKENS_API_DOMAIN ?? "https://oss-backend.vercel.app",
            websiteDomain: window.location.origin,
            apiBasePath: "/auth",
            websiteBasePath: "/log-in",
        },
        recipeList: [EmailPassword.init(), Session.init()],
    })
}

export function SuperTokensProvider({ children }: React.PropsWithChildren) {
    initSuperTokens()

    return <SuperTokensWrapper>{children as any}</SuperTokensWrapper>
}