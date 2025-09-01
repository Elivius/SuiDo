import { toast } from "react-toastify";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

export function useDeleteTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const account = useCurrentAccount();

    const suiClient = useSuiClient();
    const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

    const deleteTask = async (taskId: string) => {
        if (!account) {
            toast.warning("Connect wallet first");
            return;
        }
        
        try {
            const tx = new Transaction();
            tx.moveCall({
                target: `${packageId}::sui_do::delete_task`,
                arguments: [tx.object(taskId)],
            });
        
            signAndExecute(
                { transaction: tx },
                {
                    onError: (err) => {
                        toast.error(err.message);
                    },
                    onSuccess: async ({ digest }) => {
                        toast.success(`Task deleted. Digest: ${digest}`);
                        await suiClient.waitForTransaction({ digest }); // wait for confirmation
                        
                        if (onSuccess) onSuccess();
                    },
                },
            );
        } catch (err) {
            const error = err as Error;

            toast.error(error.message || "Failed to delete task");
            console.error(error);
        }
    };

    return { deleteTask, isPending };
}