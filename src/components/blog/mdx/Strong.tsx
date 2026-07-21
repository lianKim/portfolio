import { ReactNode } from 'react'

interface StrongProps {
  children: ReactNode
}

export function Strong({ children }: StrongProps) {
  return <strong className="font-semibold text-foreground">{children}</strong>
}
