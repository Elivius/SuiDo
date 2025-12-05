import { toast } from "react-toastify";
import { Transaction } from "@mysten/sui/transactions";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "@/config/network";

export function useEditTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const account = useCurrentAccount();

    const suiClient = useSuiClient();
    const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();

    const editTask = async (taskId: string, taskName: string) => {
        if (!account) {
            toast.warning("Connect wallet first");
            return;
        }

        try {
            const tx = new Transaction();
            tx.moveCall({
                target: `${packageId}::sui_do::edit_task`,
                arguments: [tx.object(taskId), tx.pure.string(taskName), tx.object('0x6')],
            });

            signAndExecute(
                { transaction: tx },
                {
                    onError: (err) => {
                        toast.error(err.message);
                    },
                    onSuccess: async ({ digest }) => {
                        toast.success(`Task updated. Digest: ${digest}`);
                        await suiClient.waitForTransaction({ digest }); // wait for confirmation

                        if (onSuccess) onSuccess();
                    },
                },
            );
        } catch (err) {
            const error = err as Error;

            toast.error(error.message || "Failed to edit task");
            console.error(error);
        }
    };

    return { editTask, isPending };
}