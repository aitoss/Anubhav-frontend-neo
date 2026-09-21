import type * as React from "react"

import {
  DocumentTextIcon,
  EnvelopeIcon,
  HomeIcon,
  PencilSquareIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid"

export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: NavItem[]
}

export const sections: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Stories", href: "/stories", icon: DocumentTextIcon },
  { label: "Videos", href: "/videos", icon: VideoCameraIcon },
  { label: "Team", href: "/team", icon: UserGroupIcon },
  { label: "Request Article", href: "/request", icon: EnvelopeIcon },
  { label: "Create Article", href: "/create", icon: PencilSquareIcon },
]
