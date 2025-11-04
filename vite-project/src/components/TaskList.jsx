
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
    const rect = e.currentTarget.getBoundingClientRect()
    const isAfter = e.clientY > rect.top + rect.height / 2
    const insertionIndex = index + (isAfter ? 1 : 0)
    setDragOverIndex(insertionIndex)
  }

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null) {
      const clampedTarget = Math.max(0, Math.min(dragOverIndex, tasks.length))
      const draggedTask = tasks[draggedIndex]
      const fullDraggedIndex = allTasks.findIndex((t) => t.id === draggedTask.id)

      // Build mapping from visible list indices to full task indices
      const fullIndices = tasks.map((t) => allTasks.findIndex((at) => at.id === t.id))

      // Translate insertion position to full array index (before the item at clampedTarget, or after last)
      const targetFullIndex =
        clampedTarget < fullIndices.length ? fullIndices[clampedTarget] : Math.max(...fullIndices) + 1

      // Adjust end index to account for removal if dragging from before target
      const adjustedEndIndex = targetFullIndex > fullDraggedIndex ? targetFullIndex - 1 : targetFullIndex

      if (adjustedEndIndex !== fullDraggedIndex) {
        onReorder(fullDraggedIndex, adjustedEndIndex)
      }
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
          isDragOver={dragOverIndex === index || dragOverIndex === index + 1}
        />
      ))}
    </div>
  )
}
