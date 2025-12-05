"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "@/config/network";
import { RegisterEnokiWallets } from "./RegisterEnokiWallets";

const queryClient = new QueryClient();

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork={process.env.NEXT_PUBLIC_NETWORK as "devnet" | "mainnet" | "testnet" | undefined}>
                <RegisterEnokiWallets />
                <WalletProvider autoConnect>
                    {children}
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}
