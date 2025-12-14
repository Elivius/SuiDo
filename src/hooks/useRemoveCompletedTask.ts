import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network";
import { useSponsoredTransaction } from "./useSponsoredTransaction";

export function useRemoveCompletedTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const { sponsorAndExecute, isPending } = useSponsoredTransaction();

    const removeCompletedTask = async (taskIds: string[]) => {
        const tx = new Transaction();

        taskIds.forEach((taskId) => {
            tx.moveCall({
                target: `${packageId}::sui_do::remove_completed_task`,
                arguments: [tx.object(taskId)],
            });
        });

        await sponsorAndExecute(tx, {
            allowedMoveCallTargets: [`${packageId}::sui_do::remove_completed_task`],
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return { removeCompletedTask, isPending };
}