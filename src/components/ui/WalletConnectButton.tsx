"use client";

import { useState } from "react";
import {
    useConnectWallet,
    useCurrentAccount,
    useDisconnectWallet,
    useWallets,
} from "@mysten/dapp-kit";
import { isEnokiWallet } from "@mysten/enoki";
import { Wallet, ChevronDown, LogOut, Copy, Check } from "lucide-react";

export function WalletConnectButton() {
    const currentAccount = useCurrentAccount();
    const { mutate: connect, isPending } = useConnectWallet();
    const { mutate: disconnect } = useDisconnectWallet();
    const wallets = useWallets().filter((wallet) => !isEnokiWallet(wallet));

    const [showWalletList, setShowWalletList] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleConnect = (wallet: (typeof wallets)[number]) => {
        connect(
            { wallet },
            {
                onSuccess: () => setShowWalletList(false),
            }
        );
    };

    const handleCopyAddress = () => {
        if (currentAccount?.address) {
            navigator.clipboard.writeText(currentAccount.address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Connected state - show account info
    if (currentAccount) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm text-white font-medium rounded-lg border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-700/80 transition-all duration-200"
                >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-sm">{formatAddress(currentAccount.address)}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Account dropdown */}
                {showAccountMenu && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowAccountMenu(false)}
                        />
                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            <div className="p-3 border-b border-gray-700">
                                <p className="text-xs text-gray-400 mb-1">Connected</p>
                                <p className="text-sm text-white font-mono">
                                    {formatAddress(currentAccount.address)}
                                </p>
                            </div>
                            <div className="p-1">
                                <button
                                    onClick={handleCopyAddress}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                    {copied ? "Copied!" : "Copy Address"}
                                </button>
                                <button
                                    onClick={() => {
                                        disconnect();
                                        setShowAccountMenu(false);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    }

    // Not connected - show connect button
    return (
        <div className="relative">
            <button
                onClick={() => setShowWalletList(!showWalletList)}
                disabled={isPending}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Wallet className="w-5 h-5" />
                <span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
                <ChevronDown className="w-4 h-4" />
            </button>

            {/* Wallet selection dropdown */}
            {showWalletList && !isPending && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowWalletList(false)}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="p-3 border-b border-gray-700">
                            <p className="text-sm font-medium text-white">Select Wallet</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Connect with one of your installed wallets
                            </p>
                        </div>
                        <div className="p-2 max-h-64 overflow-y-auto">
                            {wallets.length > 0 ? (
                                wallets.map((wallet) => (
                                    <button
                                        key={wallet.name}
                                        onClick={() => handleConnect(wallet)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-white hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        {wallet.icon ? (
                                            <img
                                                src={wallet.icon}
                                                alt={wallet.name}
                                                className="w-8 h-8 rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center">
                                                <Wallet className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                        <span className="text-sm font-medium">{wallet.name}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-400">No wallets detected</p>
                                    <a
                                        href="https://suiwallet.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-cyan-400 hover:underline mt-1 inline-block"
                                    >
                                        Install Sui Wallet →
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
