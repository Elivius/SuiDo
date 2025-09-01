import { toast } from "react-toastify";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

export function useRemoveCompletedTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const account = useCurrentAccount();

    const suiClient = useSuiClient();
    const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

    const removeCompletedTask = async (taskIds: string[]) => {
        if (!account) {
            toast.warning("Connect wallet first");
            return;
        }

        try {
            const tx = new Transaction();

            taskIds.forEach((taskId) => {
                tx.moveCall({
                    target: `${packageId}::sui_do::remove_completed_task`,
                    arguments: [tx.object(taskId)],
                });
            });

            signAndExecute(
                { transaction: tx },
                {
                    onError: (err) => {
                        toast.error(err.message);
                    },
                    onSuccess: async ({ digest }) => {
                        toast.success(`Task cleared. Digest: ${digest}`);
                        await suiClient.waitForTransaction({ digest });

                        if (onSuccess) onSuccess();
                    },
                },
            );
        } catch (err) {
            const error = err as Error;

            toast.error(error.message || "Failed to clear completed task");
            console.error(error);
        }
    };

    return { removeCompletedTask, isPending };
}