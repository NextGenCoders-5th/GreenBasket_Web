'use client';
import LoadingPage from '@/app/_components/Loading';
import NetworkErrorSection from '@/components/network-error';
import { useCurrentUserQuery } from '@/redux/api/user.api';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useAppSelector } from '@/redux/store';
import { ResponseError } from '@/types/general.types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Getting router isntance
  // Getting logged in user
  const [errorOccured, setErrorOccured] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  // const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

  // Getting disptacher instance

  const dispatch = useDispatch();
  const pathename = usePathname();

  // Getting current user data;
  const { data, isLoading, error } = useCurrentUserQuery(undefined, {
    skip: !!user || pathename === '/login' || pathename === '/register',   
  });
  useEffect(() => {
    if (data && !error) {
      dispatch(
        setCredentials({
          user: data.data.data,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorOccured(true);
      console.log('Error fetching current user:', error);
    }
  }, [error]);
  if (isLoading) return <LoadingPage />;

  if (error ) {
    return (
      <NetworkErrorSection error={error as ResponseError}/>
    );
  }

  return <>{children}</>;
};
export default AuthProvider;
