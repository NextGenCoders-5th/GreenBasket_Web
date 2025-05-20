'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DropDownProps } from '@/types/general.types';

interface SortDropdownProps {
  options: DropDownProps[];
}

export default function SortDropdown({ options }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'none');

  const handleChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'none') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <Select  onValueChange={handleChange} value={sort}>
        <SelectTrigger className='py-1.5'>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className='py-1.5'>
          <SelectItem className='py-1.5 border border-red-700' value="none">None</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
