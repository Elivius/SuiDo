import { toast } from "react-toastify";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";

export function useUndoCompletedTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const account = useCurrentAccount();

    const suiClient = useSuiClient();
    const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

    const undoCompletedTask = async (taskId: string) => {
        if (!account) {
            toast.warning("Connect wallet first");
            return;
        }

        try {
            const tx = new Transaction();
            tx.moveCall({
                target: `${packageId}::sui_do::undo_completed_task`,
                arguments: [tx.object(taskId), tx.object('0x6')], 
            });

            signAndExecute(
                { transaction: tx},
                {
                    onError: (err) => {
                        toast.error(err.message);
                    },
                    onSuccess: async ({ digest }) => {
                        toast.success(`Task undone. Digest: ${digest}`);
                        await suiClient.waitForTransaction({ digest });

                        if (onSuccess) onSuccess();
                    },
                },
            );
        } catch (err) {
            const error = err as Error;

            toast.error(error.message || "Failed to undone task");
            console.error(error);
        }
    };

    return { undoCompletedTask, isPending };
}