import './App.css'
import {Todolist} from "./components/Todolist.tsx";

export const App = () => {
  return (
      <div className="app">
        <Todolist title='What to learn'/>
        <Todolist title='Songs'/>
        <Todolist title='Books'/>
      </div>
  )
}


