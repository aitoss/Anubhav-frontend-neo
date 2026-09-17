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
      className={`${isFirst ? "z-30" : `z-${zIndex}`} -ml-3 rounded-full border-2 bg-background p-1`}
      style={{ borderColor, zIndex }}
    >
      <img
        src={src}
        alt={alt}
        className="h-20 w-20 rounded-full object-cover select-none sm:h-16 sm:w-16"
        draggable={false}
      />
    </div>
  )
}
