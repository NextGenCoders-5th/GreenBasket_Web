'use client';
import { SessionEnum } from '@/enums/session.enum';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  useEffect(() => {
    if (isAuthChecked && !user) {
      sessionStorage.setItem(SessionEnum.REDIRECT_URL, window.location.href);
      sessionStorage.setItem(SessionEnum.REDIRECT_MESSAGE, 'Please login to continue');
      router.push(`/login`);
    }
  }, [user, isAuthChecked]);

  if (!isAuthChecked) return null;

  return <>{children}</>;
};

export default ProtectedProvider;
