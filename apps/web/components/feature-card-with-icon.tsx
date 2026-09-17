import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"

interface FeatureCardWithIconProps {
  icon: IconSvgElement
  title: string
  boldedText: string
  description: string
}

export function FeatureCardWithIcon({
  icon,
  title,
  boldedText,
  description,
}: FeatureCardWithIconProps) {
  return (
    <div className="flex flex-col gap-3 p-8 lg:p-8">
      <div className="flex items-center justify-start gap-2">
        <HugeiconsIcon icon={icon} size={20} strokeWidth={1.5} />
        <h4 className="text-base font-normal">{title}</h4>
      </div>
      <p className="max-w-xl text-[20px] leading-snug tracking-tight text-muted-foreground">
        <span className="font-medium font-heading text-foreground">{boldedText}</span>
        {description}
      </p>
    </div>
  )
}
