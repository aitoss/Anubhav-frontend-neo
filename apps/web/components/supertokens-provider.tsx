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
            // Auth is proxied through this app (see app/api/auth) so it is
            // same-origin: the session cookie is then set on our origin and is
            // sent on the /api/anubhav calls too.
            apiDomain: window.location.origin,
            websiteDomain: window.location.origin,
            apiBasePath: "/api/auth",
            websiteBasePath: "/log-in",
        },
        recipeList: [EmailPassword.init(), Session.init()],
    })
}

export function SuperTokensProvider({ children }: React.PropsWithChildren) {
    initSuperTokens()

    return <SuperTokensWrapper>{children as any}</SuperTokensWrapper>
}