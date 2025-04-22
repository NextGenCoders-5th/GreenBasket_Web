'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'My Orders', path: '/dashboard/orders' },
  { name: 'Favorites', path: '/dashboard/favorites' },
  { name: 'Account Settings', path: '/dashboard/settings' },
];

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow hidden md:block">
        <div className="p-6 text-xl font-bold text-green-600">GreenBasket</div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn('block px-6 py-3 text-gray-700 hover:bg-green-50 rounded-l-full', {
                'bg-green-100 font-semibold text-green-700': pathname === item.path,
              })}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
