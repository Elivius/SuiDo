// Ref: https://docs.enoki.mystenlabs.com/ts-sdk/examples
import { enokiClient } from '@/lib/enokiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { digest, signature } = await req.json();

        if (!digest || !signature) {
            return NextResponse.json(
                { error: 'Missing required fields: digest and signature' },
                { status: 400 }
            );
        }

        const result = await enokiClient.executeSponsoredTransaction({
            digest,
            signature,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error executing sponsored transaction:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to execute sponsored transaction' },
            { status: 500 }
        );
    }
}