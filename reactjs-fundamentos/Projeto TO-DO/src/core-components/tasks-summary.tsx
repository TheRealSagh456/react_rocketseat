import Badge from "../assets/components/badge";
import Text from "../assets/components/text";
import useTasks from "../hooks/use-tasks";


export default function TasksSummary() {
const { tasksCount, concludedTasksCount, isLoadingTasks} = useTasks()

    return <>
    
    <div className="flex items-center gap-2">
        <Text variant={"body-sm-bold"} className="text-gray-300!">
            Tarefas Criadas
        </Text>
        <Badge variant={'secondary'} loading={isLoadingTasks}>
            {tasksCount}
        </Badge>
    </div>

    <div className="flex items-center gap-2">
        <Text variant={"body-sm-bold"} className="text-gray-300!">
            Concluídas
        </Text>
        <Badge variant={'primary'} loading={isLoadingTasks}>
            {concludedTasksCount} de {tasksCount}
        </Badge>
    </div>
    
    </>
}