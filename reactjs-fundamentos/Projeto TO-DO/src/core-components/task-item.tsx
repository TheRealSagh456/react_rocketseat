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

interface TaskItemProps {
    task: Task
}

export default function TaskItem({task}: TaskItemProps) {
    const [isEditing, setIsEditing] = React.useState(
        task?.state === TaskState.Creating
    );

    const [taskTitle, setTaskTitle] = React.useState(task.title || "")

    const {updateTask} = useTask()

    function handleEditTask() {
        setIsEditing(true);
    }

    function handleExitEditTask() {
        setIsEditing(false)
    }

    function handleChangeTextTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value || "")
    }

    function handleSaveTask(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log({title: taskTitle, id: task.id })
        updateTask(task.id, {title: taskTitle})
        setIsEditing(false)
    }


    return (
            <Card size={'md'}>
                {!isEditing ? (
                    <div className="flex items-center gap-4">
                        <InputCheckbox value={task?.concluded?.toString()} checked={task?.concluded}/>
                        
                        <Text className={cx("flex-1", {"line-through": task?.concluded,})}>{task?.title}

                        </Text>
                        
                        <div className="flex gap-2">
                            <ButtonIcon icon={TrashIcon} variant={"tertiary"}/>
                            <ButtonIcon icon={PencilIcon} variant={"tertiary"} onClick={handleEditTask}/>
                        </div>
                    </div>
                    ) : (
                    <form onSubmit={handleSaveTask} className="flex items-center gap-4">
                        <InputText value={taskTitle} className="w-full" onChange={handleChangeTextTitle} required autoFocus/>
                        <div className="flex gap-1">
                            <ButtonIcon type="button" icon={XIcon} variant={"secondary"} onClick={handleExitEditTask}/>
                            <ButtonIcon type="submit" icon={CheckIcon} variant={"primary"}/>
                        </div>
                    </form>
                    )
                }
                
            </Card>
    )
}