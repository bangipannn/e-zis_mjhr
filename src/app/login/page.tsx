'use client';

import { useActionState } from 'react';
import { login } from '@/lib/actions/auth'; // You might need to adjust this import path
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"

const initialState = {
    success: false,
    message: '',
};

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, initialState);

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-black text-emerald-950">Masuk Akun</h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Sistem ZIS MJHR</p>
                </div>

                <form action={action} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Role</label>
                        <div className="relative">
                            <Select name="role" defaultValue="PANITIA_ZIS" required>
                                <SelectTrigger className="bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-gray-700 h-11 rounded-xl">
                                    <SelectValue placeholder="Pilih Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                                    <SelectItem value="PANITIA_ZIS">Panitia ZIS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            name="username"
                            required
                            className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                            placeholder="Masukkan username"
                            suppressHydrationWarning={true}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm font-bold text-gray-700 placeholder:text-gray-300"
                            placeholder="Masukkan password"
                            suppressHydrationWarning={true}
                        />
                    </div>

                    {state?.message && !state.success && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100">
                            {state.message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
                    >
                        {isPending ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            'Masuk'
                        )}
                    </Button>

                    <div className="text-center">
                        <a href="/" className="text-[10px] font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">
                            Kembali ke Dashboard (Guest)
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
