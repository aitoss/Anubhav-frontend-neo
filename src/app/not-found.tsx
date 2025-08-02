"use client"
import Navbar from "@/components/Navbar/Navbar";
import { LinkButton } from "@/components/ui/link-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <section className="mx-auto flex h-[90vh] w-[100%] pt-24 flex-col px-4 place-items-center justify-center md:justify-center">
                <div className="flex flex-col place-items-center justify-center gap-2 md:bottom-20">
                    <BlurFade delay={0}>
                        <h1 className="text-[#212121] font-medium text-5xl xs:text-3xl">
                            Page not found
                        </h1>
                    </BlurFade>
                    <BlurFade delay={0.02} className="flex h-[390px] items-center justify-center">
                        <Image
                            className="pointer-events-none -mt-12 w-[500px] select-none md:w-[400px]"
                            width={500}
                            height={390}
                            draggable="false"
                            src="/assets/images/404Illustration.png"
                            alt="error illustration"
                        />
                    </BlurFade>
                    <BlurFade delay={0.04}>
                        <p className="-mt-12 text-center text-[#212121] md:text-[15px]">
                            Oops! Looks like you followed a bad link. If you think is a
                            problem with us, please tell us
                        </p>
                    </BlurFade>
                    <BlurFade delay={0.06}>
                        <LinkButton href="/" variant="outline" icon={<ChevronRight />}>
                            Home
                        </LinkButton>
                    </BlurFade>
                </div>
            </section>
            {/* <div className="w-full flex justify-center h-screen items-center"><Logo /></div> */}
        </>
    );
}
