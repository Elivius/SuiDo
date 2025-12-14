// Ref: https://docs.enoki.mystenlabs.com/ts-sdk/examples
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Transaction } from '@mysten/sui/transactions';
import { useCurrentAccount, useSignTransaction, useSuiClient } from '@mysten/dapp-kit';
import { toBase64 } from '@mysten/sui/utils';
import { SponsoredTransactionOptions } from '@/types/models';

export function useSponsoredTransaction() {
    const [isPending, setIsPending] = useState(false);
    const account = useCurrentAccount();
    const suiClient = useSuiClient();
    const { mutateAsync: signTransaction } = useSignTransaction();

    const sponsorAndExecute = async (
        tx: Transaction,
        options: SponsoredTransactionOptions
    ) => {
        if (!account) {
            toast.warning('Connect wallet first');
            return null;
        }

        setIsPending(true);

        try {
            // Build transaction kind bytes (without gas info)
            const txBytes = await tx.build({
                client: suiClient,
                onlyTransactionKind: true,
            });

            // Request sponsorship from backend
            const sponsorRes = await fetch('/api/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transactionKindBytes: toBase64(txBytes),
                    sender: account.address,
                    allowedMoveCallTargets: options.allowedMoveCallTargets,
                    allowedAddresses: options.allowedAddresses || [],
                }),
            });

            if (!sponsorRes.ok) {
                const errorData = await sponsorRes.json();
                throw new Error(errorData.error || 'Failed to sponsor transaction');
            }

            const { bytes, digest } = await sponsorRes.json();

            // Sign the sponsored transaction with user's wallet
            const { signature } = await signTransaction({
                transaction: bytes,
            });

            if (!signature) {
                throw new Error('Failed to sign transaction');
            }

            // Execute the sponsored transaction
            const executeRes = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ digest, signature }),
            });

            if (!executeRes.ok) {
                const errorData = await executeRes.json();
                throw new Error(errorData.error || 'Failed to execute transaction');
            }

            const result = await executeRes.json();

            // Wait for transaction confirmation
            await suiClient.waitForTransaction({ digest: result.digest });

            toast.success(`Transaction successful! Digest: ${result.digest}`);
            options.onSuccess?.(result.digest);

            return result;
        } catch (err) {
            const error = err as Error;
            toast.error(error.message || 'Sponsored transaction failed');
            console.error('Sponsored transaction error:', error);
            options.onError?.(error);
            return null;
        } finally {
            setIsPending(false);
        }
    };

    return { sponsorAndExecute, isPending };
}