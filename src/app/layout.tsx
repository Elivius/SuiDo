"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "@/networkConfig";

import "@mysten/dapp-kit/dist/index.css";
import "@/index.css";

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sui Do - Web3 ToDo App</title>
            </head>
            <body className="bg-black">
                <React.StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                            <WalletProvider autoConnect>
                                {children}
                            </WalletProvider>
                        </SuiClientProvider>
                    </QueryClientProvider>
                </React.StrictMode>
            </body>
        </html>
    );
}
