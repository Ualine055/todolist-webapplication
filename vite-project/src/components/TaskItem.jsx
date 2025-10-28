import React from "react"
export function TaskItem({
  task,
  index,
  onDelete,
  onToggleComplete,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDragLeave,
  isDragging,
  isDragOver,
}) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        onDragStart(index)
        try {
          e.dataTransfer.setData("text/task-id", task.id)
          e.dataTransfer.setData("text/source", "list")
          e.dataTransfer.effectAllowed = "move"
        } catch {}
      }}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
      className={`group flex items-center gap-4 rounded-xl border bg-linear-to-r from-gray-900 to-gray-900/80 backdrop-blur-sm p-4 shadow-lg transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95 rotate-2" : "opacity-100 scale-100"
      } ${
        isDragOver
          ? "border-blue-500 ring-2 ring-blue-500/30 shadow-blue-500/20"
          : "border-gray-800 hover:border-blue-500/50 hover:shadow-xl"
      } ${task.completed ? "bg-gray-800/30" : ""}`}
    >
      <div className="cursor-grab text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          </div>
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="h-5 w-5 cursor-pointer rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500/30 transition-all"
      />

      {/* Task Text */}
      <div className="flex-1">
        <p
          className={`text-base font-medium transition-all ${task.completed ? "text-gray-500 line-through" : "text-white"}`}
        >
          {task.text}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-500 group-hover:opacity-100 active:scale-90"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
