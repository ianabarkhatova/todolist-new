import "./App.css"
import { TodolistItem } from "./components/TodolistItem.tsx"
import { useState } from "react"

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ])

  const [filter, setFilter] = useState("All")

  const deleteTask = (taskId: number) => {
    setTasks(
      tasks.filter((task) => {
        return taskId !== task.id
      }),
    )
  }

  const filterTasks = () => {
    switch (filter) {
      case "Active": {
        return tasks.filter((task) => !task.isDone)
      }
      case "Completed": {
        return tasks.filter((task) => task.isDone)
      }
      default:
        return tasks
    }
  }

  let filteredTasks = filterTasks()

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }

  return (
    <div className="app">
      <TodolistItem title="What to learn" tasks={filteredTasks} deleteTask={deleteTask} changeFilter={changeFilter} />
    </div>
  )
}

export type Task = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"
