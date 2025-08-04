import { SkeletonProps } from "@/types/components";

const Skeleton = ({
    className
}: SkeletonProps) => (
    <div aria-live="polite" aria-busy="true" className={className}>
        <span className="inline-flex w-full h-full animate-pulse select-none rounded bg-[#e9e9e9] leading-none"/>
        <br />
    </div>
)

const SVGSkeleton = ({
    className
}: SkeletonProps) => (
    <svg
        className={
            className + " animate-pulse rounded bg-[#e9e9e9]"
        }
    />
)

const SVGSkeletonWhite = ({
    className
}: any) => (
    <svg
        className={
            className + " animate-pulse rounded bg-[#fff]"
        }
    />
)


export { Skeleton, SVGSkeleton, SVGSkeletonWhite };
