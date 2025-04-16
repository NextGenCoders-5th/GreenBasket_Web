'use client';
import Link from 'next/link'
import React from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
  return (
   <>
   <header className="w-full px-4 md:px-8 py-4 flex items-center justify-between shadow bg-white sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 text-green-600 font-bold text-xl md:text-2xl">
          <Image src="/logo.png" alt="GreenBasket Logo" width={32} height={32} />
          GreenBasket
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-green-600 transition">Home</Link>
          <Link href="/marketplace" className="hover:text-green-600 transition">Marketplace</Link>
          <Link href="/vendors" className="hover:text-green-600 transition">Vendors</Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow-lg flex flex-col gap-4 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Home</Link>
          <Link href="/marketplace" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Marketplace</Link>
          <Link href="/vendors" onClick={() => setMenuOpen(false)} className="hover:text-green-600">Vendors</Link>
        </div>
      )}
   </>
  )
}
