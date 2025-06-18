import AnubhavIcon from "@/components/assets/AnubhavIcon";
import { LinkButton } from "@/components/ui/link-button";
import { ChevronRight } from "lucide-react";
import FadeWrapper from "../../ui/fadeWrapper";
import MaskWrapper from "../../ui/maskWrapper";

const CTA = () => {
  return (
    <div className="mb-12 flex w-[90%] max-w-7xl items-start justify-between rounded-2xl border border-[#d2d2d6] bg-[#fafafa] p-16 shadow-sm md:gap-4 md:p-8">
      <div className="flex flex-col w-full items-start justify-center gap-8 text-center">
        <h2 className="text-left text-[2.6rem] font-[500] leading-[48px] text-[#212121] x-sm:text-4xl">
          <div className="flex flex-col -space-y-4">
            <MaskWrapper> Discover Our </MaskWrapper>
            <MaskWrapper>Latest Insights</MaskWrapper>
          </div>
        </h2>
        <div className="mb-6 w-3/4 text-left text-gray-600 md:w-full">
          <MaskWrapper>
            Dive into our blog to explore a variety of topics, from industry
            trends to practical tips. Whether you&rsquo;re looking for
            inspiration or knowledge, we&rsquo;ve got something for
            everyone.&nbsp;
            <span className="font-semibold">Explore now</span> and stay updated
            with our latest posts.
          </MaskWrapper>
        </div>
        <LinkButton href="/search" variant="default" icon={<ChevronRight />}>
          Start Reading
        </LinkButton>
      </div>
      <div className="hidden lg:block">
        <FadeWrapper>
          <AnubhavIcon />
        </FadeWrapper>
      </div>
    </div>
  );
};

export default CTA;
