"use client"

import { ButtonLink } from "@/components/button-link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

const CARDS = [
  {
    number: 1,
    title: "June 2023: The Spark",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    rotation: "rotate-3",
    content: [
      { title: "Problem Identification:", text: "Students struggling with interview preparation and lack of real experiences" },
      { title: "Vision Formed:", text: "Build a platform where students share their real interview journeys and learnings" },
    ],
  },
  {
    number: 2,
    title: "Sep 2023: The Foundation",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
    rotation: "-rotate-2",
    content: [
      { text: "First line of code written for Anubhav platform" },
      { text: "Core team assembled - bringing together student success experts and developers" },
      { text: "Beta testing begins with college communities" },
    ],
  },
  {
    number: 3,
    title: "Feb 2024: Launch & Learn",
    image: "https://images.unsplash.com/photo-1553778014-faa25066d71d?w=500&h=400&fit=crop",
    rotation: "rotate-2",
    content: [
      { text: "Official launch of Anubhav to students nationwide" },
      { text: "Partnerships established with top colleges and placement cells" },
    ],
  },
  {
    number: 4,
    title: "Summer 2024: Scaling Heights",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    rotation: "-rotate-1",
    content: [
      { text: "Rapid growth in student community and story contributions" },
      { text: "Expanding to international students and alumni networks" },
    ],
  },
  {
    number: 5,
    title: "Today: A Movement",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    rotation: "rotate-3",
    content: [
      { text: "Serving thousands of students with real interview experiences" },
      { text: "Building the most authentic career guidance platform" },
    ],
  },
]

function AnimatedJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null])
  const pathBgRefs = useRef<(SVGPathElement | null)[]>([null, null, null, null])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const path0Length = useTransform(scrollYProgress, [0, 0.22], [0, 1])
  const path1Length = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const path2Length = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const path3Length = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])

  const updatePath = (
    card1Ref: HTMLDivElement | null,
    card2Ref: HTMLDivElement | null,
    pathRef: SVGPathElement | null,
    pathBgRef: SVGPathElement | null
  ) => {
    if (!card1Ref || !card2Ref || !pathRef || !containerRef.current || !pathBgRef) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const rect1 = card1Ref.getBoundingClientRect()
    const rect2 = card2Ref.getBoundingClientRect()

    const startX = rect1.right - containerRect.left
    const startY = rect1.top - containerRect.top + rect1.height / 2
    const endX = rect2.left - containerRect.left
    const endY = rect2.top - containerRect.top + rect2.height / 2

    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2

    const curve = `M${startX},${startY} Q${midX - 100},${midY - 80} ${endX},${endY}`

    pathRef.setAttribute("d", curve)
    pathBgRef.setAttribute("d", curve)
  }

  useEffect(() => {
    const updateAllPaths = () => {
      for (let i = 0; i < 4; i++) {
        const card1Ref = cardRefs.current[i]
        const card2Ref = cardRefs.current[i + 1]
        const pathRef = pathRefs.current[i]
        const pathBgRef = pathBgRefs.current[i]
        if (card1Ref && card2Ref && pathRef && pathBgRef) {
          updatePath(card1Ref, card2Ref, pathRef, pathBgRef)
        }
      }
    }

    updateAllPaths()
    window.addEventListener("resize", updateAllPaths)
    return () => window.removeEventListener("resize", updateAllPaths)
  }, [])

  return (
    <section className="bg-[#FAFAFA] py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="py-[40px] lg:py-[61px] text-center mb-20">
          <div className="text-[#F96B13] text-[32px] sm:text-[42px] font-semibold leading-[40px] sm:leading-[46px] tracking-[-1%] bg-[#FFF3EB] lg:h-[60px] w-fit rounded-[11px] items-center justify-center flex gap-[10px] px-[13px] mx-auto">
            <p>Our</p>
            <p>Journey</p>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26H21.77L16.54 12.45L18.63 18.71L12 14.52L5.37 18.71L7.46 12.45L2.23 8.26H8.91L12 2Z" fill="#F96B13" />
            </svg>
          </div>
        </div>

        {/* Journey Cards with SVG paths */}
        <div className="relative" ref={containerRef}>
          {/* SVG Paths */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" style={{ minHeight: "3000px" }}>
            {/* Background paths */}
            {[0, 1, 2, 3].map((i) => (
              <motion.path
                key={`bg-${i}`}
                ref={(el) => {
                  if (el) pathBgRefs.current[i] = el
                }}
                stroke="#ffffff"
                fill="transparent"
                strokeWidth={30}
              />
            ))}
          </svg>

          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" style={{ minHeight: "3000px" }}>
            {/* Animated paths */}
            <motion.path
              ref={(el) => {
                if (el) pathRefs.current[0] = el
              }}
              stroke="#FF2424"
              pathLength={path0Length}
              fill="transparent"
              strokeWidth={3}
            />
            <motion.path
              ref={(el) => {
                if (el) pathRefs.current[1] = el
              }}
              stroke="#FF2424"
              pathLength={path1Length}
              fill="transparent"
              strokeWidth={3}
            />
            <motion.path
              ref={(el) => {
                if (el) pathRefs.current[2] = el
              }}
              stroke="#24BDFF"
              pathLength={path2Length}
              fill="transparent"
              strokeWidth={3}
            />
            <motion.path
              ref={(el) => {
                if (el) pathRefs.current[3] = el
              }}
              stroke="#24BDFF"
              pathLength={path3Length}
              fill="transparent"
              strokeWidth={3}
            />
          </svg>

          {/* Cards Container */}
          <div className="relative space-y-24 lg:space-y-32 max-w-2xl lg:max-w-none">
            {CARDS.map((card, index) => (
              <motion.div
                key={index}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, margin: "-100px" }}
                className={`flex ${index % 2 === 0 ? "lg:mr-auto lg:pr-12" : "lg:ml-auto lg:pl-12"} max-w-lg`}
              >
                <div className={`w-full rounded-3xl shadow-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 ${card.rotation}`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    {/* Brush stroke overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                          d="M0,30 Q25,10 50,20 T100,15"
                          stroke="#000"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="lg:w-12 lg:h-12 w-[38px] h-[38px] rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500 text-lg lg:text-2xl font-bold">{card.number}</span>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight pt-1">
                        {card.title}
                      </h3>
                    </div>

                    <div className="space-y-3 ml-14">
                      {card.content.map((item, idx) => (
                        <div key={idx}>
                          {"title" in item && item.title && (
                            <p className="font-semibold text-gray-900">{item.title}</p>
                          )}
                          <p className="text-gray-600 text-sm">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 lg:mt-32 text-center">
          <ButtonLink href="/create" size="lg">
            Share Your Story
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export default function StoryPage() {
  return (
    <main className="w-full">
      <AnimatedJourney />
    </main>
  )
}
