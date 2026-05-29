import { useLocalStorage } from "usehooks-ts";
import { TASKS_KEY, TaskState, type Task } from "../models/task";
import React from "react";
import { delay } from "../helpers/utils";

export default function useTasks() {

    const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, [])
    const [tasks, setTasks] = React.useState<Task[]>([])
    const [isLoadingTasks, setIsLoadingTasks] = React.useState(true)

    const fetchTasks = React.useCallback(async () =>  {
        if(isLoadingTasks) {
            await delay(1000)
            setIsLoadingTasks(false)
        }
        setTasks(tasksData)
        console.timeEnd("Carregando tarefas...")
    }, [tasksData, isLoadingTasks, setIsLoadingTasks])

    React.useEffect(() => {
        fetchTasks(), [tasksData]
    })

    return {
        tasks,
        tasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
        concludedTasksCount: tasks.filter((task) => task.concluded).length,
        isLoadingTasks
    }
}