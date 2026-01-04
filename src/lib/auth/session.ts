import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET || 'default-secret-key-change-this-in-prod'
const key = new TextEncoder().encode(secretKey)

export type SessionPayload = {
    userId: string
    username: string
    nama_lengkap: string
    role: 'ADMINISTRATOR' | 'PANITIA_ZIS'
    expires: Date
}

export async function encrypt(payload: Omit<SessionPayload, 'expires'>) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    return await new SignJWT({ ...payload, expires })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload as unknown as SessionPayload
    } catch (error) {
        return null
    }
}

export async function createSession(userId: string, username: string, nama_lengkap: string, role: 'ADMINISTRATOR' | 'PANITIA_ZIS') {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, username, nama_lengkap, role })

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}
