import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCell as ShadcnTableCell,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils/cn'

interface TableProps {
  children: React.ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="my-6">
      <ShadcnTable className={className}>{children}</ShadcnTable>
    </div>
  )
}

export function TableHeader({ children, className }: TableProps) {
  return <ShadcnTableHeader className={className}>{children}</ShadcnTableHeader>
}

export function TableBody({ children, className }: TableProps) {
  return <ShadcnTableBody className={className}>{children}</ShadcnTableBody>
}

export function TableRow({ children, className }: TableProps) {
  return <ShadcnTableRow className={className}>{children}</ShadcnTableRow>
}

export function TableCell({ children, className }: TableProps) {
  return <ShadcnTableCell className={className}>{children}</ShadcnTableCell>
}

export function TableHead({ children, className }: TableProps) {
  return <ShadcnTableHead className={cn('font-semibold', className)}>{children}</ShadcnTableHead>
}
