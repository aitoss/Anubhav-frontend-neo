"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import EmailPassword from "supertokens-auth-react/recipe/emailpassword"

import { HugeiconsIcon } from "@hugeicons/react"
import { Login01Icon, ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"

import { ButtonLink } from "@/components/button-link"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

type AuthMode = "signIn" | "signUp"
const AUTH_USER_CACHE_KEY = "anubhav.auth.user"

type CachedAuthUser = {
    email?: string
    name?: string
    avatarUrl?: string
}

function cacheAuthUser(rawUser: unknown) {
    if (typeof window === "undefined" || !rawUser || typeof rawUser !== "object") {
        return
    }

    const user = rawUser as {
        email?: unknown
        emails?: unknown
        name?: unknown
        fullName?: unknown
        username?: unknown
        userName?: unknown
        picture?: unknown
        avatar?: unknown
        avatar_url?: unknown
    }

    const email =
        (typeof user.email === "string" && user.email) ||
        (Array.isArray(user.emails) && typeof user.emails[0] === "string" ? user.emails[0] : "")

    const name =
        (typeof user.name === "string" && user.name) ||
        (typeof user.fullName === "string" && user.fullName) ||
        (typeof user.username === "string" && user.username) ||
        (typeof user.userName === "string" && user.userName) ||
        ""

    const avatarUrl =
        (typeof user.picture === "string" && user.picture) ||
        (typeof user.avatar === "string" && user.avatar) ||
        (typeof user.avatar_url === "string" && user.avatar_url) ||
        ""

    const payload: CachedAuthUser = {}
    if (email) payload.email = email
    if (name) payload.name = name
    if (avatarUrl) payload.avatarUrl = avatarUrl

    if (Object.keys(payload).length === 0) {
        return
    }

    localStorage.setItem(AUTH_USER_CACHE_KEY, JSON.stringify(payload))
}

export default function AuthRoutePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [mode, setMode] = React.useState<AuthMode>("signIn")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

    const redirectToPath = searchParams.get("redirectToPath") ?? "/"

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)
        setErrorMessage(null)
        setSuccessMessage(null)

        if (mode === "signUp" && password !== confirmPassword) {
            setIsSubmitting(false)
            setErrorMessage("Passwords do not match.")
            return
        }

        const formFields = [
            { id: "email", value: email },
            { id: "password", value: password },
        ]

        try {
            const response =
                mode === "signIn"
                    ? await EmailPassword.signIn({ formFields })
                    : await EmailPassword.signUp({ formFields })

            if (response.status === "OK") {
                if (mode === "signIn") {
                    cacheAuthUser(response.user)
                    router.replace(redirectToPath)
                    router.refresh()
                    return
                }

                setSuccessMessage("Account created. You can sign in now.")
                setMode("signIn")
                setPassword("")
                setConfirmPassword("")
                return
            }

            if (response.status === "WRONG_CREDENTIALS_ERROR") {
                setErrorMessage("Invalid email or password.")
                return
            }

            if (response.status === "FIELD_ERROR") {
                const fieldError = response.formFields.find((field) => field.error)
                setErrorMessage(fieldError?.error ?? "Please check the entered details.")
                return
            }

            setErrorMessage("Unable to complete authentication. Please try again.")
        } catch {
            setErrorMessage("Something went wrong while signing in. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-[calc(100vh-5rem)] flex w-full items-center justify-center">
            <div className="mx-auto min-w-sm lg:min-w-md">
                <div className="flex justify-center items-center w-full">
                    <Card className="w-full shadow-lg shadow-black/5">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl">{mode === "signIn" ? "Log in" : "Sign up"}</CardTitle>
                            <CardDescription>
                                {mode === "signIn"
                                    ? "Enter your details to continue."
                                    : "Fill in your details to create a new account."}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            placeholder="••••••••"
                                            className="pr-10"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute inset-y-0 right-2 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="size-4" />
                                        </button>
                                    </div>
                                </div>

                                {mode === "signUp" ? (
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm password</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            autoComplete="new-password"
                                            value={confirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                ) : null}

                                {errorMessage ? (
                                    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                                        {errorMessage}
                                    </p>
                                ) : null}

                                {successMessage ? (
                                    <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
                                        {successMessage}
                                    </p>
                                ) : null}

                                <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
                                    {isSubmitting ? "Please wait..." : mode === "signIn" ? "Log in" : "Create account"}
                                </Button>
                            </form>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                                <button
                                    type="button"
                                    className="font-medium text-foreground transition-colors hover:text-primary"
                                    onClick={() => {
                                        setErrorMessage(null)
                                        setSuccessMessage(null)
                                        setMode(mode === "signIn" ? "signUp" : "signIn")
                                    }}
                                >
                                    {mode === "signIn" ? "Need an account? Sign up" : "Already have an account? Log in"}
                                </button>

                                <ButtonLink href="/" variant="ghost" size="sm">
                                    Back home
                                </ButtonLink>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}