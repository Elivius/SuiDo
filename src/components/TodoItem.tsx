import React, { useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { Task } from "../types/task";
import { LoadingPopup } from "./LoadingPopup";
import { useFilteredTask } from "../hooks/useFilteredTask";
import { useCompleteTask } from "../hooks/useCompleteTask";
import { useUndoCompletedTask } from "../hooks/useUndoCompletedTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useEditTask } from "../hooks/useEditTask";


export function TodoItem({ id, task_name, status, last_update }: Task) {
  // helper: shorten owner address (0x1234...abcd)
  const shorten = (addr: string) =>
    addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

  const { refetch } = useFilteredTask();

  const { completeTask, isPending: isCompleting  } = useCompleteTask(refetch);
  const { undoCompletedTask, isPending: isUndoing  } = useUndoCompletedTask(refetch);
  const { deleteTask, isPending: isDeleting } = useDeleteTask(refetch);
  const { editTask, isPending: isUpdating } = useEditTask(refetch);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task_name);

  const handleEditSave = () => {
    if (editText.trim() && editText !== task_name) {
      editTask(id, editText);
    } else {
      setEditText(task_name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleEditSave();
    if (e.key === "Escape") {
      setEditText(task_name);
      setIsEditing(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      
      <div className={status
                        ? "relative bg-gray-900/30 backdrop-blur-md border border-gray-700/30 p-6 rounded-xl hover:border-gray-400/40 transition-all duration-300"
                        : "relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-6 rounded-xl hover:border-gray-600/50 transition-all duration-300"
                      }
      >
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              if (status) {
                // Already completed -> undo
                undoCompletedTask(id);
              } else {
                // Not completed -> mark complete
                completeTask(id);
              }
            }}
            className={`flex-shrink-0 w-7 h-7 rounded-full border-2 
                        flex items-center justify-center cursor-pointer transition-all duration-200 ${
                          status
                            ? "bg-emerald-400 border-emerald-400 text-white shadow-lg"
                            : "border-gray-500 hover:border-emerald-400"
                        }`}
          >
            {status && <Check size={18} />}
          </div>


          {/* Text + Edit Mode */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEditSave}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg
                          focus:border-cyan-400 focus:outline-none text-white
                          transition-all duration-300"
                autoFocus
              />
            ) : (
              <>
                <p
                  className={`break-words transition-all duration-300 ${
                    status ? "line-through text-gray-400" : "text-gray-100"
                  }`}
                >
                  {task_name}
                </p>
                {id && (
                  <div className="text-xs text-gray-500 mt-1">
                    <p className="truncate">Object ID: {shorten(id)}</p>
                    <p>Last Update: {last_update.toLocaleString()}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Edit & Delete buttons */}
          <div
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-200"
          >
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-cyan-400 
                           hover:bg-cyan-500/10 rounded-lg transition-all duration-300
                           hover:shadow-lg hover:shadow-cyan-500/10"
                title="Edit task"
              >
                <Edit size={16} />
              </button>
            )}

            <button
              onClick={() => deleteTask(id)}
              className="p-2 text-gray-400 hover:text-red-400 
                         hover:bg-red-500/10 rounded-lg transition-all duration-300
                         hover:shadow-lg hover:shadow-red-500/10"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
      <LoadingPopup message="Completing task…" isVisible={isCompleting} />
      <LoadingPopup message="Undoing task…" isVisible={isUndoing} />
      <LoadingPopup message="Deleting task…" isVisible={isDeleting} />
      <LoadingPopup message="Updating task…" isVisible={isUpdating} />
    </div>
  );
}