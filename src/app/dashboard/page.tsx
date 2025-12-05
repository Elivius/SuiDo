"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Sparkles } from "lucide-react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { TodoMain } from "@/components/todo/TodoMain";

export default function DashboardPage() {
    const currentAccount = useCurrentAccount();
    const router = useRouter();

    // Redirect to login if not connected
    useEffect(() => {
        if (!currentAccount) {
            router.push("/login");
        }
    }, [currentAccount, router]);

    // Don't render dashboard until we confirm user is connected
    if (!currentAccount) {
        return null;
    }

    return (
        <>
            {/* Wallet Connection Button (top right) */}
            <div className="fixed top-4 right-4 z-20">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                        <ConnectButton />
                    </div>
                </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center justify-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 text-sm font-medium">
                        Connected to Sui
                    </span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                    <span className="text-purple-300 text-sm font-medium">
                        AI Ready
                    </span>
                </div>
            </div>

            {/* Todo Main Content */}
            <div className="space-y-8 animate-in fade-in duration-700 mt-8">
                <div className="space-y-4">
                    <TodoMain />
                </div>
            </div>
        </>
    );
}
