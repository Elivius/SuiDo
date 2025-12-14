// Ref: https://docs.enoki.mystenlabs.com/ts-sdk/examples
import { enokiClient } from '@/lib/enokiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { transactionKindBytes, sender, allowedMoveCallTargets, allowedAddresses } = await req.json();

        if (!transactionKindBytes || !sender) {
            return NextResponse.json(
                { error: 'Missing required fields: transactionKindBytes and sender' },
                { status: 400 }
            );
        }

        const network = process.env.NEXT_PUBLIC_NETWORK as 'devnet' | 'testnet' | 'mainnet';

        const sponsored = await enokiClient.createSponsoredTransaction({
            network,
            transactionKindBytes,
            sender,
            allowedMoveCallTargets: allowedMoveCallTargets || [],
            allowedAddresses: allowedAddresses || [],
        });

        return NextResponse.json({
            bytes: sponsored.bytes,
            digest: sponsored.digest,
        });
    } catch (error) {
        console.error('Error sponsoring transaction:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to sponsor transaction' },
            { status: 500 }
        );
    }
}