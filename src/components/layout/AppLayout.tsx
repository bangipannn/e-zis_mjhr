"use client"

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useState } from "react";
import { SessionPayload } from "@/lib/auth/session";

interface AppLayoutProps {
    children: React.ReactNode;
    session: SessionPayload | null;
}

export function AppLayout({ children, session }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} role={session?.role} />
            <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
                <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} session={session} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50">
                    {children}
                </main>
            </div>
        </>
    );
}
