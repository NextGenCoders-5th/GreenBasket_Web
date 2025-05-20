'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { DropDownProps } from '@/types/general.types';

interface DropDownInputProps {
  options: DropDownProps[];
  setValue: (value: any) => void;
  placeholder: string;
  className?: string;
  [key: string] : any
}

export default function DropDownInput({ options,  setValue, placeholder, className,...leftProps }: DropDownInputProps) {
  return (
    <div className={` flex items-center border border-accent-400 justify-stretch   object-cover ${className} `}>
      <Select  onValueChange={setValue} {...leftProps}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='border border-accent-400'>
          {options.map((option) => (
            <SelectItem key={option.value} className='' value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
