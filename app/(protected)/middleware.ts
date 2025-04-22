import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useAppSelector } from '../../redux/store';

export function middleware(request: NextRequest) {
  const auth = useAppSelector((state) => state.auth);
  const token = auth.token;
  const refreshToken = auth.refreshToken;
  const user = auth.user;

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/users/:path*', '/settings/:path*'],
};
