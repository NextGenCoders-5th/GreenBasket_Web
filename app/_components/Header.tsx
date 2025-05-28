'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../redux/store';
import { IUser } from '@/types/user.type';
import ProfileDropdown from './ProfileCard';
import { Role } from '@/enums/role.enum';
import { motion } from 'framer-motion';
import { IconBasket } from '@tabler/icons-react';
import { ShoppingCart } from 'lucide-react';

export const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const isVendor = user && (user as IUser).role === Role.VENDOR;
  const isAdmin = user && (user as IUser).role === Role.ADMIN;
  const isAdminOrVendor = isVendor || isAdmin;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-green-100 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <IconBasket className="w-6 h-6 text-white" />
              </div>
              <p className="inline-block text-accent-500 tracking-tighter">
                Green<strong>Basket</strong>
              </p>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/#home" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Home
              </a>
              <a href="/#vendors" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Vendors
              </a>
              <a href="/#features" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Features
              </a>
              <a href="/#contact" className="text-slate-700 hover:text-green-600 transition-colors font-medium">
                Contact
              </a>
              <Link href="/marketplace" className="hover:text-green-600 hover:underline font-semibold   transition">
                Marketplace
              </Link>

              {user ? (
                <>
                  {!isAdminOrVendor && <Link href={`/user/carts`} className="hover:text-slate-50  flex items-center gap-1 p-2 py-1.5 text-accent-500  hover:bg-green-600 hover:underline font-semibold transition">
                    <ShoppingCart className="w-5 h-5" /> My Cart
                  </Link>}
                  <div className="flex">
                    <ProfileDropdown />
                  </div>
                </>
              ) : (
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

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
