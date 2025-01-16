import { FilterValueType, Task } from "../App.tsx"
import { Button } from "./Button.tsx"

export const TodolistItem = (props: Props) => {
  const { title, tasks, deleteTask, changeFilter } = props

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title={"+"} />
      </div>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <>
                <li key={task.id}>
                  <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                  <Button title={"x"} onClick={() => deleteTask(task.id)} />
                </li>
              </>
            )
          })}
        </ul>
      )}

      <div>
        <Button
          title={"All"}
          onClick={() => {
            changeFilter("All")
          }}
        />
        <Button
          title={"Active"}
          onClick={() => {
            changeFilter("Active")
          }}
        />
        <Button
          title={"Completed"}
          onClick={() => {
            changeFilter("Completed")
          }}
        />
      </div>
    </div>
  )
}

type Props = {
  title: string
  tasks: Task[]
  deleteTask: (taskId: number) => void
  changeFilter: (filter: FilterValueType) => void
}
