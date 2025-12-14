import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network";
import { useSponsoredTransaction } from "./useSponsoredTransaction";

export function useDeleteTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const { sponsorAndExecute, isPending } = useSponsoredTransaction();

    const deleteTask = async (taskId: string) => {
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::sui_do::delete_task`,
            arguments: [tx.object(taskId)],
        });

        await sponsorAndExecute(tx, {
            allowedMoveCallTargets: [`${packageId}::sui_do::delete_task`],
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return { deleteTask, isPending };
}