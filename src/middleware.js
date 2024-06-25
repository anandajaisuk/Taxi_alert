import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function middleware(request) {
  const mycookie = cookies()
  const jwt_token = mycookie.get('token');
  if(!jwt_token){
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/alerts/:path*', '/profile/:path*'],
}
