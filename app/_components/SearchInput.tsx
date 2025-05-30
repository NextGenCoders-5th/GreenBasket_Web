'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Props{
  className?: string;
}
const SearchInput = ({className}:Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  // Sync local state with URL param on mount
  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      className={` max-w-xs p-3 py-2 border-[0.5px] border-green-300 rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-green-500 ${className}`}
      placeholder="Search by product name"
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
