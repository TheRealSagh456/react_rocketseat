import ButtonIcon from "../assets/components/button-icon";
import Card from "../assets/components/card";
import InputCheckbox from "../assets/components/check-box";
import Text from "../assets/components/text";
import TrashIcon from "../assets/icons/Trash-Regular.svg?react"
import PencilIcon from "../assets/icons/PencilSimple-Regular.svg?react"
import XIcon from "../assets/icons/X-Regular.svg?react"
import  CheckIcon from "../assets/icons/Check-Regular.svg?react"
import React from "react";
import InputText from "../assets/components/input-text";
import { TaskState, Task } from "../models/task";
import { cx } from "class-variance-authority";
import useTask from "../hooks/use-task";
import Skeleton from "../assets/components/skeleton";

interface TaskItemProps {
    task: Task
    loading: boolean
}

export default function TaskItem({task, loading}: TaskItemProps) {
    const [isEditing, setIsEditing] = React.useState(
        task?.state === TaskState.Creating
    );

    const [taskTitle, setTaskTitle] = React.useState(task.title || "")

    const {updateTask, changeTaskStatus, deleteTask, deletingTask, updatingTask} = useTask()

    function handleEditTask() {
        setIsEditing(true);
    }

    function handleExitEditTask() {
        if(task.state === TaskState.Creating) {
            deleteTask(task.id)
        }
        setIsEditing(false)
    }

    function handleChangeTextTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value || "")
    }

    async function handleSaveTask(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        
        await updateTask(task.id, {title: taskTitle})
        
        setIsEditing(false)
    }

    function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
        const checked = e.target.checked;   
        changeTaskStatus(task.id, checked)
    }

    async function handleDeleteTask() {
        await deleteTask(task.id)
    }


    return (
            <Card size={'md'}>
                {!isEditing ? (
                    <div className="flex items-center gap-4">
                        <InputCheckbox checked={task?.concluded} onChange={handleChangeTaskStatus} loading={loading}/>
                        
                       {!loading ? <Text className={cx("flex-1", {"line-through": task?.concluded,})}> 
                            {task?.title} 
                        </Text> 
                        : 
                        <Skeleton className="flex-1 h-6"/>
                        }
                        
                        <div className="flex gap-2">
                            <ButtonIcon icon={TrashIcon} variant={"tertiary"} onClick={handleDeleteTask} loading={loading} handling={deletingTask}/>
                            <ButtonIcon icon={PencilIcon} variant={"tertiary"} onClick={handleEditTask} loading={loading}/>
                        </div>
                    </div>
                    ) : (
                    <form onSubmit={handleSaveTask} className="flex items-center gap-4">
                        <InputText value={taskTitle} className="w-full" onChange={handleChangeTextTitle} required autoFocus/>
                        <div className="flex gap-1">
                            <ButtonIcon type="button" icon={XIcon} variant={"secondary"} onClick={handleExitEditTask}/>
                            <ButtonIcon type="submit" icon={CheckIcon} variant={"primary"} handling={updatingTask}/>
                        </div>
                    </form>
                    )
                }
                
            </Card>
    )
}