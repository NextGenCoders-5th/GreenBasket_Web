'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { SortOption } from '@/types/general.types';

interface DropDownInputProps {
  options: SortOption[];
  setValue: (value: any) => void;
  placeholder: string;
  [key: string] : any
}

export default function DropDownInput({ options,  setValue, placeholder, ...leftProps }: DropDownInputProps) {
  return (
    <div className="flex items-center  justify-stretch  h-16 w-full object-cover  ">
      <Select  onValueChange={setValue} {...leftProps}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
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
