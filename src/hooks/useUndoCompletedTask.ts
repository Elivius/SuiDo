import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network";
import { useSponsoredTransaction } from "./useSponsoredTransaction";

export function useUndoCompletedTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const { sponsorAndExecute, isPending } = useSponsoredTransaction();

    const undoCompletedTask = async (taskId: string) => {
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::sui_do::undo_completed_task`,
            arguments: [tx.object(taskId), tx.object('0x6')],
        });

        await sponsorAndExecute(tx, {
            allowedMoveCallTargets: [`${packageId}::sui_do::undo_completed_task`],
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return { undoCompletedTask, isPending };
}