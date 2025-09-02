import { useState, useMemo  } from 'react';
import { TaskProps, FilterType } from '../types/models';
import { useFetchTask } from "./useFetchTask";

export const useFilteredTask = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const { data, isLoading, error, refetch } = useFetchTask();

  // Transform blockchain objects into Task[]
  const tasks: TaskProps[] = useMemo(() => {
    return data.map((task: any) => {
      const fields = task.data?.content?.fields;
      return {
        id: task.data?.objectId,
        task_name:
          fields?.task_name
            ? String.fromCharCode(...fields.task_name)
            : "Untitled task",
        owner: task.data?.owner?.AddressOwner || "Unknown",
        status: fields?.status || false,
        last_update: new Date(Number(fields?.last_update)),
      };
    });
  }, [data]);

  // Filter
  const filteredTodos = useMemo(() => {
    return tasks.filter((task) => {
      switch (filter) {
        case "active":
          return !task.status;
        case "completed":
          return task.status;
        default:
          return true;
      }
    });
  }, [tasks, filter]);

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      active: tasks.filter((t) => !t.status).length,
      completed: tasks.filter((t) => t.status).length,
    };
  }, [tasks]);

  return {
    todos: filteredTodos,
    filter,
    stats,
    setFilter,
    isLoading,
    error,
    refetch,
  };
};
