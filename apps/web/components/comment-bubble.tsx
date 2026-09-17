import { SendArrowIcon } from "./send-arrow-icon"

interface CommentBubbleProps {
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  iconColor: string
  borderColor: string
  backgroundColor: string
  name: string
}

export function CommentBubble({
  position,
  iconColor,
  borderColor,
  backgroundColor,
  name,
}: CommentBubbleProps) {
  return (
    <div
      className="absolute z-20 flex items-start gap-2"
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      }}
    >
      <div
        className="flex h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform"
        style={{ color: iconColor }}
      >
        <SendArrowIcon />
      </div>
      <div
        className="rounded-bl-full rounded-br-full rounded-tr-full border px-2 py-1 text-base font-medium text-white"
        style={{
          borderColor,
          backgroundColor,
        }}
      >
        {name}
      </div>
    </div>
  )
}
