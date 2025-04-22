'use client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useAppSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/auth.slice';

export function middleware(request: NextRequest) {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = auth.token;
  const refreshToken = auth.refreshToken;
  const user = auth.user;

  // Check if the user is authenticated
  dispatch(
    setCredentials({
      user,
      token,
      refreshToken,
    }),
  );

  return NextResponse.next();
}

export const config = {
  matcher: ['/users/:path*', '/settings/:path*'],
};
