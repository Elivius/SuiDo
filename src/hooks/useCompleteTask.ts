import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "@/config/network";
import { useSponsoredTransaction } from "./useSponsoredTransaction";

export function useCompleteTask(onSuccess?: () => void) {
    const packageId = useNetworkVariable("packageId");
    const { sponsorAndExecute, isPending } = useSponsoredTransaction();

    const completeTask = async (taskId: string) => {
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::sui_do::complete_task`,
            arguments: [tx.object(taskId), tx.object('0x6')],
        });

        await sponsorAndExecute(tx, {
            allowedMoveCallTargets: [`${packageId}::sui_do::complete_task`],
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        });
    };

    return { completeTask, isPending };
}