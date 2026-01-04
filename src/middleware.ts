import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'

const protectedRoutes = ['/users']
const panytiaForbiddenRoutes = ['/users']

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    if (isProtectedRoute) {
        const sessionCookie = request.cookies.get('session')?.value
        const session = await decrypt(sessionCookie)

        if (!session || !session.userId) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Role-based access control
        if (path.startsWith('/users')) {
            if (session.role !== 'ADMINISTRATOR' && session.role !== 'PANITIA_ZIS') {
                // Should realistically assume only these two roles exist if logged in, but checking validity.
                // Actually, requirements say: "Halaman User hanya dapat diakses oleh: Administrator dan Panitia ZIS"
                // Wait, User Request says:
                // "Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS"
                // BUT "Akses Aksi: ... Jika Panitia ZIS mengklik aksi... tampilkan popup..."
                // BUT "Tidak dapat: ... Mengakses halaman fitur User" for Panitia ZIS in "Role: Panitia ZIS" section.

                // CONFLICT IN REQ:
                // 1. "Role: Panitia ZIS... Tidak dapat: Mengakses halaman fitur User"
                // 2. "Halaman & fitur user... Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS"
                // 3. "Jika Panitia ZIS mengklik aksi... tampilkan popup"

                // Resolution: I will follow the "Role: Panitia ZIS" section which is more specific about "Tidak dapat mengakses halaman fitur User".
                // BUT the "Halaman & fitur user" section says "Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS".

                // Let's re-read carefully:
                // "Role: Panitia ZIS... Tidak dapat: ... Mengakses halaman fitur User"
                // "Halaman & fitur user ... Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS"

                // This IS a contradiction.
                // However, "Akses Aksi: Edit & Hapus user hanya bisa dilakukan oleh Administrator. Jika Panitia ZIS mengklik aksi tersebut: Tampilkan popup".
                // This implies Panitia CAN see the table, otherwise they couldn't click the action.
                // So I will ASSUME Panitia ZIS *CAN* access the page, but cannot perform actions.
                // And "Tidak dapat Mengakses halaman fitur User" in the first section might mean "Full access" or logic error in prompt.
                // I will trust the detailed breakdown in section 3 which implies they can see it but restricted actions.

                // WAIT. "Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS" means Guest cannot.
                // OK, I will allow Panitia to access /users.

                // But checking "Role: Panitia ZIS" -> "Tidak dapat: ... Mengakses halaman fitur User". 
                // That is very explicit.
                // Maybe the popup is if they somehow get there or if the UI is visible elsewhere?
                // "Jika Panitia ZIS mengklik aksi tersebut (Edit/Hapus)" -> Maybe actions on the profile? No, "Halaman User berisi tabel...".

                // I'll stick to: Panitia can access, but cannot edit/delete. This aligns with ensuring they can see "Username, Nama Lengkap, Role" possibly for transparency or their own account?
                // If I block them from the page, I satisfy "Tidak dapat mengakses".
                // If I let them in, I satisfy "Jika mengklik aksi... popup".
                // Blocking is safer for "Tidak dapat mengakses".
                // But "Halaman User hanya dapat diakses oleh: Administrator, Panitia ZIS" suggests they ARE allowed.
                // I will allow them for now. If user meant block, I'll switch.
                // Actually, usually "Panitia ZIS... Tidak dapat... Mengakses halaman fitur User" takes precedence as a restriction. 
                // BUT the "Halaman & fitur user" section is specifically designing that page.
                // I will Allow logic: Access to `/users` requires session.
                // Specific checks:
                // - Guest: No access (redirect login)
                // - Logged in: Access allowed.
                // - Modify actions will be guarded in UI and Server Action.

                if (session.role !== 'ADMINISTRATOR' && session.role !== 'PANITIA_ZIS') {
                    return NextResponse.redirect(new URL('/', request.url))
                }
            }
        }
    }

    // Redirect to dashboard if logged in and trying to access login
    if (path === '/login') {
        const sessionCookie = request.cookies.get('session')?.value
        const session = await decrypt(sessionCookie)
        if (session?.userId) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
