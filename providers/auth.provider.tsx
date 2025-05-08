'use client';
import LoadingPage from '@/app/_components/Loading';
import NetworkErrorSection from '@/components/network-error';
import { useCurrentUserQuery } from '@/redux/api/user.api';
import { setCredentials } from '@/redux/slices/auth.slice';
import { useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Getting router isntance

  // Getting logged in user
  const user = useAppSelector((state) => state.auth.user);

  // Getting disptacher instance

  const dispatch = useDispatch();

  // Getting current user data;
  const { data, isLoading, error } = useCurrentUserQuery(undefined, {
    skip: !!user,
  });
  useEffect(() => {
    if (data) {
      dispatch(
        setCredentials({
          user: data.data.data,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log('Error fetching current user:', error);
    }
  }, [error]);
  if (isLoading) return <LoadingPage />;

  if (error) {
    return (
      <NetworkErrorSection/>
    );
  }

  return <>{children}</>;
};
export default AuthProvider;
