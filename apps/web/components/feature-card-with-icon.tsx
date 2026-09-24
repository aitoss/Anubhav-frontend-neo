import type * as React from "react"

interface FeatureCardWithIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  boldedText: string
  description: string
}

export function FeatureCardWithIcon({
  icon: Icon,
  title,
  boldedText,
  description,
}: FeatureCardWithIconProps) {
  return (
    <div className="flex flex-col gap-3 p-8 lg:p-8">
      <div className="flex items-center justify-start gap-2">
        <Icon className="size-5" />
        <h4 className="text-base font-normal">{title}</h4>
      </div>
      <p className="max-w-xl text-[20px] leading-snug tracking-tight text-muted-foreground">
        <span className="font-medium font-heading text-foreground">{boldedText}</span>
        {description}
      </p>
    </div>
  )
}
