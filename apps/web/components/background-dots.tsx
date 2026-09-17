import type { CSSProperties, HTMLAttributes } from "react"

type BackgroundDotsProps = HTMLAttributes<HTMLDivElement> & {
  dotSize?: number
  dotColor?: string
  backgroundColor?: string
  gap?: number
  fade?: boolean
}

export function BackgroundDots({
  dotSize = 1.2,
  dotColor = "#fb3a5d",
  backgroundColor = "transparent",
  gap = 15,
  className = "",
  fade = true,
  style,
  ...props
}: BackgroundDotsProps) {
  const encodedDotColor = encodeURIComponent(dotColor)

  const maskStyle: CSSProperties = fade
    ? {
        maskImage: "radial-gradient(circle, white 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, white 0%, transparent 70%)",
      }
    : {}

  const backgroundStyle: CSSProperties = {
    backgroundColor,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='${gap}' height='${gap}' viewBox='0 0 ${gap} ${gap}' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodedDotColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='${dotSize}' cy='${dotSize}' r='${dotSize}'/%3E%3C/g%3E%3C/svg%3E")`,
    ...maskStyle,
    ...style,
  }

  return (
    <div
      className={`absolute inset-0 z-0 h-full w-full ${className}`}
      style={backgroundStyle}
      {...props}
    />
  )
}
