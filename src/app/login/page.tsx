"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap, Wallet, Shield, Sparkles } from "lucide-react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isEnokiWallet } from '@mysten/enoki'
import { GoogleLoginButton } from "@/components/ui/GoogleLoginButton";

export default function LoginPage() {
    const currentAccount = useCurrentAccount();
    const router = useRouter();

    // Redirect to dashboard if already connected
    useEffect(() => {
        if (currentAccount) {
            router.push("/dashboard");
        }
    }, [currentAccount, router]);

    return (
        <div className="flex flex-col items-center justify-center mt-24 space-y-8 animate-in fade-in duration-1000">
            <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-2xl opacity-30 animate-pulse delay-300"></div>

                <div className="relative w-24 h-24 flex items-center justify-center bg-gray-900/80 border border-gray-700/50 rounded-3xl shadow-2xl backdrop-blur-md group-hover:scale-110 transition-all duration-500">
                    <Wallet className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg hover:scale-105 transition-transform duration-300 cursor-default">
                    Connect Your Wallet
                </h2>

                <p className="text-gray-400 text-lg font-light max-w-sm mx-auto leading-relaxed">
                    Unlock the power of decentralized task management on{" "}
                    <span className="text-cyan-400 font-medium">Sui Network</span>
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Secure • Decentralized • AI-Powered</span>
                </div>
            </div>

            {/* Connect Button Container */}
            <div className="relative group mt-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative">
                    <ConnectButton walletFilter={(wallet) => !isEnokiWallet(wallet)} />
                </div>
            </div>            

            {/* Divider */}
            <div className="flex items-center gap-3 w-full my-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                <span className="text-xs text-gray-500 font-medium">or continue with</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            </div>

            <GoogleLoginButton />

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
                <div className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                        <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-xs text-gray-400">Lightning Fast</p>
                </div>

                <div className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                        <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-xs text-gray-400">Secure</p>
                </div>

                <div className="text-center group">
                    <div className="w-12 h-12 mx-auto mb-2 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-xs text-gray-400">AI-Powered</p>
                </div>
            </div>
        </div>
    );
}
