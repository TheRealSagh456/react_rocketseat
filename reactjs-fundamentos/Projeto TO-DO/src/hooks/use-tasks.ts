import { useLocalStorage } from "usehooks-ts";
import { TASKS_KEY, type Task } from "../models/task";

export default function useTasks() {

    const [tasks] = useLocalStorage<Task[]>(TASKS_KEY, [])

    return {
        tasks,
        tasksCount: tasks.length,
        concludedTasksCount: tasks.filter((task) => task.concluded).length
    }
}