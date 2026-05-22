import Button from "../assets/components/button";
import PlusIcon from "../assets/icons/Plus-Regular.svg?react"
import useTask from "../hooks/use-task";
import useTasks from "../hooks/use-tasks";
import { Task, TaskState } from "../models/task";
import TaskItem from "./task-item";

export default function TasksList() {
    const {tasks, isLoadingTasks} = useTasks()
    const {prepareTask} = useTask()

    function handleNewTask() {
        prepareTask()
    }

    return (
        <>
            <section>
                <Button icon={PlusIcon} className="w-full" onClick={handleNewTask} 
                disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}>
                    Nova tarefa
                </Button>
            </section>

            <section className="space-y-2">
                {!isLoadingTasks && tasks.map((task) => <TaskItem key={task.id} task={task} loading={false}/>)}
                {isLoadingTasks && <>
                <TaskItem task={{} as Task} loading/>
                <TaskItem task={{} as Task} loading/>
                <TaskItem task={{} as Task} loading/>
                </>}
            </section>
        </>
    )
}