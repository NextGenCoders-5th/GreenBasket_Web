'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {  useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'none')

  const handleChange = (value: string) => {
    setSort(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'none') {
      params.delete('sort')
    } else {
      params.set('sort', value)
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center">
      <Select onValueChange={handleChange} value={sort}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="first_name">First Name</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
          <SelectItem value="role">Role</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
