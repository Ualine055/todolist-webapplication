
import { useState, useEffect } from "react"
import { TaskList } from "./components/TaskList"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([])
  const [newTaskText, setNewTaskText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("today")

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = () => {
    if (newTaskText.trim() === "") {
      return
    }

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false,
      category: selectedCategory,
    }

    setTasks([...tasks, newTask])
    setNewTaskText("")
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setTasks(result)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const categories = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "later", label: "Later" },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-16">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-white md:text-6xl bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text">
            Task Manager
          </h1>
          <p className="text-lg text-gray-400">Organize your tasks with drag and drop</p>
        </div>

        {/* Add Task Section */}
        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm p-6 shadow-2xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat.value
                    ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded-xl border border-gray-700 bg-gray-800/50 px-5 py-3.5 text-base text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
            <button
              onClick={addTask}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          </div>
        </div>

        {/* Task Lists by Category */}
        <div className="space-y-8">
          {categories.map((cat) => {
            const categoryTasks = tasks.filter((task) => task.category === cat.value)
            return (
              <div key={cat.value} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{cat.label}</h2>
                  <span className="rounded-full bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-4 py-1 text-sm font-semibold text-blue-400">
                    {categoryTasks.length}
                  </span>
                </div>
                <TaskList
                  tasks={categoryTasks}
                  onDelete={deleteTask}
                  onToggleComplete={toggleComplete}
                  onReorder={reorderTasks}
                  allTasks={tasks}
                />
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="mt-16 text-center">
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl">
              <svg className="h-14 w-14 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">No tasks yet</h3>
            <p className="text-gray-400 text-lg">Add your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
