"use client"

import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { BackgroundDots } from "@/components/background-dots"

type Member = { name: string; imageSrc: string; githubId: string }

const TEAMS: Record<string, Member[]> = {
  current: [
    { name: "Harshal Patil", imageSrc: "/dev/harshal.jpg", githubId: "Harshal141" },
    { name: "Aakash Sharma", imageSrc: "/dev/aakash.jpg", githubId: "dahighsky" },
    { name: "Nikhil Dhariwal", imageSrc: "/dev/nikhil.jpg", githubId: "404nikhil" },
    { name: "Lokendra Kushwah", imageSrc: "/dev/loki.png", githubId: "Lokendrakushwah12" },
    { name: "Gourav", imageSrc: "/dev/gourav.jpg", githubId: "Gourav2609" },
    { name: "Darshan Garad", imageSrc: "/dev/darshan.jpeg", githubId: "darkars33" },
  ],
  firstGen: [
    { name: "Arpit kr Mishra", imageSrc: "/dev/arp.jpg", githubId: "arkumish" },
    { name: "Akshay Sharma", imageSrc: "/dev/aks.jpg", githubId: "AkshaySharma008" },
    { name: "Satya Prakash", imageSrc: "/dev/sat.jpeg", githubId: "satya9500" },
    { name: "Akash Saxena", imageSrc: "/dev/aksx.jpg", githubId: "Akashsaxena2308" },
    { name: "Rishabh Rathore", imageSrc: "/dev/rrb.jpg", githubId: "xerycks" },
  ],
}

function MemberGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <div key={member.githubId} className="flex flex-col items-start gap-2">
          <Image
            src={member.imageSrc}
            alt={`${member.name}'s avatar`}
            width={300}
            height={300}
            className="aspect-square w-full max-w-[300px] select-none rounded-lg object-cover"
          />
          <h3 className="text-2xl leading-tight font-medium">{member.name}</h3>
          <a
            href={`https://github.com/${member.githubId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:underline"
          >
            GitHub
          </a>
        </div>
      ))}
    </div>
  )
}

// ponytail: dropped the WobbleCard 3D hover and the per-card motion stagger -
// neither exists in the new UI package. Add back if the effect is wanted.
export default function TeamPage() {
  return (
    <>
      <BackgroundDots dotSize={1.8} gap={15} fade />
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pt-6">
        <h1 className="mb-6 text-center text-3xl font-semibold sm:text-4xl">Dev Team</h1>
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mx-auto">
            <TabsTrigger value="current">Current Team</TabsTrigger>
            <TabsTrigger value="firstGen">First Gen</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <MemberGrid members={TEAMS.current!} />
          </TabsContent>
          <TabsContent value="firstGen">
            <MemberGrid members={TEAMS.firstGen!} />
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}
