"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { signOut, useSessionContext } from "supertokens-auth-react/recipe/session"
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/solid"

import { ButtonLink } from "@/components/button-link"
import { Logo } from "@/components/logo"
import { Button } from "@workspace/ui/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

const navLinks = [
    { href: "/videos", label: "Videos" },
    { href: "/article", label: "Stories" },
    { href: "/team", label: "Team" },
]

const AUTH_USER_CACHE_KEY = "anubhav.auth.user"

type CachedAuthUser = {
    email?: string
    name?: string
    avatarUrl?: string
}

export function Header() {
    const router = useRouter()
    const sessionContext = useSessionContext()
    const [cachedUser, setCachedUser] = React.useState<CachedAuthUser | null>(null)
    const doesSessionExist = sessionContext.loading ? false : sessionContext.doesSessionExist
    const accessTokenPayload = (sessionContext as { accessTokenPayload?: Record<string, unknown> }).accessTokenPayload

    React.useEffect(() => {
        if (!doesSessionExist) {
            setCachedUser(null)
            return
        }

        const rawUser = localStorage.getItem(AUTH_USER_CACHE_KEY)
        if (!rawUser) {
            setCachedUser(null)
            return
        }

        try {
            const parsedUser = JSON.parse(rawUser) as CachedAuthUser
            setCachedUser(parsedUser)
        } catch {
            setCachedUser(null)
        }
    }, [doesSessionExist])

    const payloadName =
        (typeof accessTokenPayload?.name === "string" && accessTokenPayload.name) ||
        (typeof accessTokenPayload?.fullName === "string" && accessTokenPayload.fullName) ||
        (typeof accessTokenPayload?.username === "string" && accessTokenPayload.username) ||
        (typeof accessTokenPayload?.userName === "string" && accessTokenPayload.userName) ||
        cachedUser?.name ||
        ""

    const payloadEmail =
        (typeof accessTokenPayload?.email === "string" && accessTokenPayload.email) ||
        (typeof accessTokenPayload?.primaryEmail === "string" && accessTokenPayload.primaryEmail) ||
        cachedUser?.email ||
        ""

    const profileImageUrl =
        (typeof accessTokenPayload?.picture === "string" && accessTokenPayload.picture) ||
        (typeof accessTokenPayload?.avatar === "string" && accessTokenPayload.avatar) ||
        (typeof accessTokenPayload?.avatar_url === "string" && accessTokenPayload.avatar_url) ||
        cachedUser?.avatarUrl ||
        ""

    const derivedName =
        payloadName ||
        (payloadEmail
            ? (payloadEmail.split("@")[0] ?? payloadEmail).replace(/[._-]+/g, " ")
            : "Anubhav User")
    const displayName = derivedName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() + part.slice(1))
        .join(" ")
    const displayEmail = payloadEmail || "Signed in user"
    const avatarInitials = displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")

    const handleLogout = async () => {
        await signOut()
        localStorage.removeItem(AUTH_USER_CACHE_KEY)
        router.refresh()
        router.push("/")
    }

    return (
        <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 xl:px-0">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="w-6 h-6 text-foreground" />
                    <span className="text-2xl font-heading font-medium tracking-tight">anubhav</span>
                </Link>
                <nav className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative group text-sm px-2.5 py-1 rounded-md font-medium text-muted-foreground transition hover:text-foreground"
                        >
                            {link.label}
                            <span className="absolute -z-1 left-0 right-0 top-0 bottom-0 scale-95 group-hover:scale-100 rounded-md group-hover:bg-secondary w-full h-full transition-transform"/>
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                <Link
                    href="/request"
                    className="hidden text-sm px-2.5 py-1 rounded-md font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex"
                >
                    Request Article
                </Link>
                <Button size="sm" render={<Link href="/create" />}>
                    Write Article
                </Button>
                {sessionContext.loading ? (
                    <Button variant="outline" size="sm" disabled>
                        Loading...
                    </Button>
                ) : doesSessionExist ? (
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <button
                                    type="button"
                                    className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-muted text-xs font-semibold text-foreground transition-colors hover:bg-accent"
                                    aria-label="Open profile menu"
                                >
                                    {profileImageUrl ? (
                                        <img
                                            src={profileImageUrl}
                                            alt={displayName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        avatarInitials || "AU"
                                    )}
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" sideOffset={10} className="w-64 min-w-64 overflow-hidden rounded-xl p-0">
                                <div className="flex items-center gap-3 border-b border-border/70 px-3 py-3">
                                    <div className="h-9 w-9 overflow-hidden rounded-full border border-border/80 bg-muted text-xs font-semibold text-foreground inline-flex items-center justify-center">
                                        {profileImageUrl ? (
                                            <img
                                                src={profileImageUrl}
                                                alt={displayName}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            avatarInitials || "AU"
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm leading-tight font-semibold text-foreground">{displayName}</p>
                                        <p className="truncate text-xs text-muted-foreground">{displayEmail}</p>
                                    </div>
                                </div>

                                <div className="px-2 py-2">
                                    <DropdownMenuItem
                                        className="px-3 py-2 text-sm"
                                        onClick={() => router.push("/profile/me")}
                                    >
                                        <UserCircleIcon className="size-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="px-3 py-2 text-sm"
                                        onClick={() => router.push("/profile/edit")}
                                    >
                                        <Cog6ToothIcon className="size-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                </div>

                                <DropdownMenuSeparator className="my-0" />

                                <div className="px-2 py-2">
                                    <DropdownMenuItem
                                        variant="destructive"
                                        className="px-3 py-2 text-sm"
                                        onClick={() => void handleLogout()}
                                    >
                                        <ArrowLeftStartOnRectangleIcon className="size-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <ButtonLink variant="outline" href="/log-in" size="sm">
                        Log in
                    </ButtonLink>
                )}
                </div>
            </div>
        </header>
    )
}
