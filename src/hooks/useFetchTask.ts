import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "@/config/network";

export function useFetchTask() {
    const packageId = useNetworkVariable("packageId");
    const account = useCurrentAccount();

    if (!account) {
        return { data: [] };
    }

    const { data, isLoading, isError, error, refetch } = useSuiClientQuery(
        "getOwnedObjects",
        {
            owner: account.address,
            filter: {
                MatchAll: [
                    {
                        StructType: `${packageId}::sui_do::Task`,
                    },
                    {
                        AddressOwner: account.address,
                    },
                ],
            },
            options: {
                showOwner: true,
                showContent: true,
                showType: true,
            },
        },
        { queryKey: ["Task", account.address] },
    );

    // Sort: Incomplete first (latest → oldest), then Completed (latest → oldest)
    const sortedTasks =
        data && data.data.length > 0
            ? [...data.data].sort((a: any, b: any) => {
                const aFields = a.data?.content?.fields ?? {};
                const bFields = b.data?.content?.fields ?? {};

                const aCompleted = aFields.status ? 1 : 0;
                const bCompleted = bFields.status ? 1 : 0;

                // Incomplete first → Completed last
                if (aCompleted !== bCompleted) {
                    return aCompleted - bCompleted;
                }

                // Within same group, sort by last_update (newest → oldest)
                const aTime = Number(aFields.last_update ?? 0);
                const bTime = Number(bFields.last_update ?? 0);

                return aTime - bTime;
            })
            : [];

    return {
        data: sortedTasks,
        isLoading,
        isError,
        error,
        refetch,
    };
}