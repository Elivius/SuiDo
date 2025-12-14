// For backend/API routes
// Ref: https://docs.enoki.mystenlabs.com/ts-sdk/examples
import { EnokiClient } from '@mysten/enoki';

export const enokiClient = new EnokiClient({
  apiKey: process.env.ENOKI_SPONSORED_TRANSACTION_KEY!,
});