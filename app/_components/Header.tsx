'use client';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../redux/store';
import { IUser } from '@/types/user.type';

export const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <header className="w-full bg-gradient-to-r from-gray-100 bg-white px-4 md:px-8 py-4 flex items-center justify-between shadow  sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl md:text-2xl">
          <Image src="/logo.png" alt="GreenBasket Logo" width={32} height={32} />
          <p className="inline-block  tracking-tighter">
            Green<strong>Basket</strong>
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/marketplace" className="hover:text-green-600 transition">
            Marketplace
          </Link>
          <Link href="/vendors" className="hover:text-green-600 transition">
            Vendors
          </Link>
          {user ? (
            <>
              <Link href={`/${(user as IUser).role.toLowerCase()}/dashboard`} className="hover:text-green-600 transition">
                Dashboard
              </Link>
              <div className="flex">
                <span className="px-3 py-2 rounded-full bg-green-400 text-white">U</span>
              </div>
            </>
          ) : (
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          )}
        </nav>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-green-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow-lg flex flex-col gap-4 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-green-600">
            Home
          </Link>
          <Link href="/marketplace" onClick={() => setMenuOpen(false)} className="hover:text-green-600">
            Marketplace
          </Link>
          <Link href="/vendors" onClick={() => setMenuOpen(false)} className="hover:text-green-600">
            Vendors
          </Link>
          <Link
            href="/signup"
            onClick={() => setMenuOpen(false)}
            className="bg-green-400/95 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
};
