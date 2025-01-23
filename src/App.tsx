import "./App.css"
import { TodolistItem } from "./components/TodolistItem.tsx"
import { useState } from "react"
import { v1 } from "uuid"

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ])
  const [filter, setFilter] = useState("All")

  const deleteTask = (taskId: string) => {
    setTasks(
      tasks.filter((task) => {
        return taskId !== task.id
      }),
    )
  }

  const addTask = (newTitle: string) => {
    const newTask = { id: v1(), title: newTitle, isDone: false }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
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

  const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, isDone: newIsDone } : task)))
  }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValueType = "All" | "Active" | "Completed"
