import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network";
import { useSponsoredTransaction } from "./useSponsoredTransaction";

export function useEditTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const { sponsorAndExecute, isPending } = useSponsoredTransaction();

    const editTask = async (taskId: string, taskName: string) => {
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::sui_do::edit_task`,
            arguments: [tx.object(taskId), tx.pure.string(taskName), tx.object('0x6')],
        });

        await sponsorAndExecute(tx, {
            allowedMoveCallTargets: [`${packageId}::sui_do::edit_task`],
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return { editTask, isPending };
}