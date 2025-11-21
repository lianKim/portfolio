import { ReactNode } from 'react'

interface StrongProps {
  children: ReactNode
}

export function Strong({ children }: StrongProps) {
  return (
    <strong className="font-medium text-accent-foreground">{children}</strong>
  )
}
