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
        className="flex size-5 -translate-x-[10px] -translate-y-[8px] -rotate-[70deg] transform sm:size-6 sm:-translate-x-[12px] sm:-translate-y-[10px]"
        style={{ color: iconColor }}
      >
        <SendArrowIcon />
      </div>
      <div
        className="max-w-[9rem] truncate rounded-br-full rounded-bl-full rounded-tr-full border px-2 py-0.5 text-xs font-medium text-white sm:max-w-none sm:py-1 sm:text-base"
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
