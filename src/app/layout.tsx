"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/components/layout/Providers";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { Header } from "@/components/layout/Header";

import "@mysten/dapp-kit/dist/index.css";
import "@/styles/globals.css";

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
                    <Providers>
                        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
                            <BackgroundEffects />

                            <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
                                <Header />
                                {children}
                            </div>

                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                pauseOnHover
                                draggable
                                theme="dark"
                            />
                        </div>
                    </Providers>
                </React.StrictMode>
            </body>
        </html>
    );
}
