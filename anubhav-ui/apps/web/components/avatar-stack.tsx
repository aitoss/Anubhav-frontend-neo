import { AvatarBubble } from "./avatar-bubble"

export interface Avatar {
  src: string
  alt: string
  borderColor: string
}

interface AvatarStackProps {
  avatars: Avatar[]
}

export function AvatarStack({ avatars }: AvatarStackProps) {
  return (
    <div className="absolute bottom-40 left-1/2 z-10 flex -translate-x-1/2 items-center">
      {avatars.map((avatar, index) => (
        <AvatarBubble
          key={avatar.alt}
          src={avatar.src}
          alt={avatar.alt}
          borderColor={avatar.borderColor}
          zIndex={30 - index}
          isFirst={index === 0}
        />
      ))}
    </div>
  )
}
