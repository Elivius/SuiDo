import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

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

    return {
        data: data && data.data.length > 0 ? data?.data : [],
        isLoading,
        isError,
        error,
        refetch,
    };
}