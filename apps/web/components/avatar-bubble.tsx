interface AvatarBubbleProps {
  src: string
  alt: string
  borderColor: string
  zIndex: number
  isFirst?: boolean
}

export function AvatarBubble({
  src,
  alt,
  borderColor,
  zIndex,
  isFirst = false,
}: AvatarBubbleProps) {
  return (
    <div
      className={`${isFirst ? "z-30" : `z-${zIndex}`} -ml-2 rounded-full border-2 bg-background p-0.5 sm:-ml-3 sm:p-1`}
      style={{ borderColor, zIndex }}
    >
      <img
        src={src}
        alt={alt}
        className="size-12 rounded-full object-cover select-none sm:size-16"
        draggable={false}
      />
    </div>
  )
}
