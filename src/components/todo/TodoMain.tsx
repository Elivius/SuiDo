import { Zap, Database } from "lucide-react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { FilterBar } from "./FilterBar";
import { LoadingPopup } from "@/components/ui/LoadingPopup";
import { useFilteredTask } from "@/hooks/useFilteredTask";
import { useCreateTask } from "@/hooks/useCreateTask";
import { useRemoveCompletedTask } from "@/hooks/useRemoveCompletedTask";


export function TodoMain() {
  const {
    todos,
    filter,
    stats,
    setFilter,
    isLoading,
    error,
    refetch,
  } = useFilteredTask();

  const { createTask, isPending: isCreating } = useCreateTask(refetch);
  const { removeCompletedTask, isPending: isRemoving } = useRemoveCompletedTask(refetch);

  const handleClearCompleted = async () => {
    const completedIds = todos.filter(task => task.status).map(task => task.id);
    if (completedIds.length > 0) {
      await removeCompletedTask(completedIds);
    }
  }

  if (isLoading) {
    return <p className="text-gray-400 text-center">Loading tasks…</p>;
  }

  if (error) {
    return (
      <p className="text-red-400 text-center">Error: {error.message}</p>
    );
  }

  return (
    <div className="space-y-2 animate-in fade-in duration-700">
      {/* Create new task form */}
      <div className="transform hover:scale-[1.01] transition-transform duration-300">
        <TodoForm onAdd={createTask} />
      </div>

      {stats.total > 0 && (
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={handleClearCompleted}
          />
        </div>
      )}

      {/* Empty state */}
      {todos.length === 0 ? (
        <div className="text-center py-16 relative">
          <div className="relative inline-block mb-6">
            <Database className="mx-auto h-16 w-16 text-gray-500 animate-pulse" />
            <div className="absolute inset-0 h-16 w-16 text-cyan-400 animate-ping opacity-20">
              <Database className="h-16 w-16" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            No tasks in the blockchain
          </h3>
          <p className="text-gray-400 mb-4">
            Add your first task to get started with Sui Do!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 animate-pulse" />
            <span>Ready to sync with Sui Network</span>
          </div>
        </div>
      ) : (
        todos.map((todos) => (
          <TodoItem
            key={todos.id}
            id={todos.id}
            task_name={todos.task_name}
            owner={todos.owner}
            status={todos.status}
            last_update={todos.last_update}
          />
        ))
      )}

      <div className="animate-in fade-in duration-700">
        {stats.total > 0 && (
          <footer className="mt-16 text-center relative">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur opacity-0"></div>

              <div className="relative inline-flex items-center gap-3 px-8 py-4 bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-full shadow-2xl">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-gray-300 text-sm font-medium">
                  {stats.active} of {stats.total} tasks remaining
                </p>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>Synced with Sui Network</span>
            </div>
          </footer>
        )}
      </div>
      <LoadingPopup message="Creating task…" isVisible={isCreating} />
      <LoadingPopup message="Clearing completed tasks…" isVisible={isRemoving} />
    </div>
  );
}