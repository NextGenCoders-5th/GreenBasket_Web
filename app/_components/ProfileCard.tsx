'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, KeyRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLogoutMutation } from '@/redux/api/auth.api';
import { useToast } from '@/providers/toast.provider';
import { useAppSelector } from '@/redux/store';
import { IUser } from '@/types/user.type';
import { Role } from '@/enums/role.enum';
import Link from 'next/link';

export default function ProfileDropdown() {
  // TOAST: toast instance to toast messages
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user) as IUser | null;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [logout] = useLogoutMutation()

  const handleLogout = () => {
    const toastId = toast.loading('Logging out...');
    logout()
      .unwrap()
      .then(() => {
        toast.dismiss(toastId);
        router.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        if (error.status === "UNKNOWN_ERROR") {
          toast.error('Logout failed. Please try again.', { id: toastId });
        }
        else {
          toast.error(error.message || 'Logout failed. Please try again.', { id: toastId });
        }
      });
  };


  const role = user?.role !== Role.CUSTOMER ? user?.role.toLowerCase() : 'user';
  const isAdminOrVendor = user && (user.role === Role.ADMIN || user.role === Role.VENDOR);
  return (
    <div className="relative" ref={ref}>
      <Avatar onClick={() => setOpen(!open)} className="cursor-pointer border">
        {
          (user?.profile_picture) ? (
            <AvatarImage src={(user).profile_picture} alt="User" />
          ) : (
            <AvatarFallback>
              {user?.first_name?.charAt(0).toUpperCase() + (user?.lastName?.charAt(0).toUpperCase() || 'U')}
            </AvatarFallback>
          )
        }
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl border bg-white shadow-xl z-50 p-4"
          >
            <div className="mb-4 text-center">
              <p className="font-semibold"> {user?.first_name || user?.email} </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <hr className="my-2" />

            <ul className="space-y-2">
              <li
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push('/' + role + '/profile')}
              >
                <User size={18} /> Profile
              </li>
              {isAdminOrVendor && 
              <li
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent-600 cursor-pointer text-slate-50  py-1.5  w-full bg-green-600 hover:underline font-semibold transition"
              >
                <Link href={ `/${(user as IUser).role.toLowerCase()}/dashboard`} className="">
                  Dashboard
                </Link>
              </li>}
              <li
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
