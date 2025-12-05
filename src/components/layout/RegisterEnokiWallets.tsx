"use client";

import { useSuiClientContext } from "@mysten/dapp-kit";
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki";
import { useEffect } from "react";

export function RegisterEnokiWallets() {
    const { client, network } = useSuiClientContext();

    useEffect(() => {
        // Only register for networks that Enoki supports (devnet, testnet, mainnet)
        if (!isEnokiNetwork(network)) return;

        const { unregister } = registerEnokiWallets({
            apiKey: process.env.NEXT_PUBLIC_ENOKI_API_KEY!,
            providers: {
                google: {
                    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
                },
            },
            client: client as any,
            network,
        });

        // Cleanup: unregister wallets when network changes or component unmounts
        return unregister;
    }, [client, network]);

    return null;
}