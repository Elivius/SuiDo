"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function Home() {
    const currentAccount = useCurrentAccount();
    const router = useRouter();

    useEffect(() => {
        if (currentAccount) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    }, [currentAccount, router]);

    // Show nothing while redirecting
    return null;
}
