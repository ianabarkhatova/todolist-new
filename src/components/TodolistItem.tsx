import { FilterValueType, Task } from "../App.tsx"
import { Button } from "./Button.tsx"
import { ChangeEvent, KeyboardEvent, useState } from "react"

export const TodolistItem = (props: Props) => {
  const { title, tasks, deleteTask, changeFilter, addTask } = props
  const [taskTitle, setTaskTitle] = useState("")

  const changeFilterHandler = (filter: FilterValueType) => {
    changeFilter(filter)
  }
  const addTaskHandler = () => {
    addTask(taskTitle)
    setTaskTitle("")
  }
  const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler()
    }
  }
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const mappedTasks = tasks.map((task) => {
    const deleteTaskHandler = () => deleteTask(task.id)

    return (
      <>
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
          <Button title={"x"} onClick={deleteTaskHandler} />
        </li>
      </>
    )
  })

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={addTaskOnKeyDownHandler} />
        <Button title={"+"} onClick={addTaskHandler} />
      </div>
      {tasks.length === 0 ? <p>No tasks</p> : <ul>{mappedTasks}</ul>}

      <div>
        <Button title={"All"} onClick={() => changeFilterHandler("All")} />
        <Button title={"Active"} onClick={() => changeFilterHandler("Active")} />
        <Button title={"Completed"} onClick={() => changeFilterHandler("Completed")} />
      </div>
    </div>
  )
}

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: string) => void
  changeFilter: (filter: FilterValueType) => void
  addTask: (newTitle: string) => void
}
