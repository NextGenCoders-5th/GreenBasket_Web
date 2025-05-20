'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchInput = () => {
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
      className="w-full max-w-xs p-3 py-2 border-1 border-green-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
      placeholder="Search by product name"
      value={searchQuery}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
