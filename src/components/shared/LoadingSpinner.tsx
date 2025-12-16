import { Spinner } from '@/components/ui/spinner'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  )
}
