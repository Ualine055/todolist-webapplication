
import { useState } from "react"
import { TaskItem } from "./TaskItem"

export function TaskList({ tasks, onDelete, onToggleComplete, onReorder, allTasks }) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleDragStart = (index) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      // Get the actual indices in the full tasks array
      const draggedTask = tasks[draggedIndex]
      const dragOverTask = tasks[dragOverIndex]

      const fullDraggedIndex = allTasks.findIndex((t) => t.id === draggedTask.id)
      const fullDragOverIndex = allTasks.findIndex((t) => t.id === dragOverTask.id)

      onReorder(fullDraggedIndex, fullDragOverIndex)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/30 backdrop-blur-sm p-10 text-center">
        <p className="text-sm text-gray-500">No tasks in this category yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragLeave={handleDragLeave}
          isDragging={draggedIndex === index}
          isDragOver={dragOverIndex === index}
        />
      ))}
    </div>
  )
}
