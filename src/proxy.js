import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './lib/auth';

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/find-doctors/:id',
    '/dashboard/admin/analytics',
    '/dashboard/admin/users',
    '/dashboard/admin/verify-doctors',
    '/dashboard/admin/appointments-registry',
    '/dashboard/admin/cash-flows',
    '/dashboard/doctor/overview',
    '/dashboard/doctor/appointments',
    '/dashboard/doctor/prescriptions',
    '/dashboard/doctor/profile',
    '/dashboard/patient/overview',
    '/dashboard/patient/appointments',
    '/dashboard/patient/payments',
    '/dashboard/patient/reviews',
    '/dashboard/patient/profile',
  ],
};
