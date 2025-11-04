# Interactive To-Do List Application

A fully interactive To-Do List web application built with Vite, React, and Tailwind CSS. Features drag-and-drop functionality, task categories, completion tracking, and localStorage persistence.

## Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with input validation (no blank tasks)
- ✅ **Display Tasks**: Clean, organized vertical list with clear separation
- ✅ **Delete Tasks**: Remove tasks with a single click
- ✅ **Drag & Drop Reordering**: Smooth drag-and-drop to reorder tasks within categories
- ✅ **No Duplicates**: Clean swapping with instant updates

### Bonus Features
- 💾 **localStorage Persistence**: Tasks persist across browser sessions
- ✓ **Task Completion**: Checkbox with strike-through styling for completed tasks
- 📁 **Categories**: Organize tasks into "Today", "Tomorrow", and "Later" sections
- 📊 **Task Counter**: Visual count of tasks in each category

### UI/UX
- 🎨 **Modern Dark Theme**: Professional color palette with blue accents
- ✨ **Smooth Animations**: Hover effects, drag animations, and transitions
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- ♿ **Accessible**: Semantic HTML and proper ARIA attributes
- 🎯 **Intuitive Design**: Clear visual hierarchy and user feedback

## Tech Stack

- **Build Tool**: Vite (fast development and optimized builds)
- **Frontend**: React 18
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React

## screenshots
![homepage](/vite-project/src/assets/Capture.PNG)

## GitHub link
![GitHub-repository-link](https://github.com/Ualine055/todolist-webapplication.git)

## live Demo
![Demo deployed link](https://todolist-webapplication-4o13vgchr-ualine055-5515s-projects.vercel.app/)


## Installation

1. Download the project files
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Adding Tasks
1. Select a category (Today, Tomorrow, or Later)
2. Type your task in the input field
3. Click "Add" or press Enter
4. Blank inputs are automatically rejected

### Managing Tasks
- **Complete**: Click the checkbox to mark as complete (adds strike-through)
- **Delete**: Click the trash icon to remove a task
- **Reorder**: Click and drag the grip icon (or anywhere on the task) to reorder within a category

### Data Persistence
All tasks are automatically saved to localStorage and will persist when you:
- Refresh the page
- Close and reopen the browser
- Navigate away and return

## Project Structure

\`\`\`
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── components/
│       ├── TaskList.jsx     # Task list container with drag-and-drop
│       └── TaskItem.jsx     # Individual task component
│   └── types/
│       ├── TaskList.jsx
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md
\`\`\`

## How Drag & Drop Works

The drag-and-drop functionality is implemented using native HTML5 drag-and-drop API:

1. **Draggable Elements**: Each task has `draggable={true}` attribute
2. **Drag Events**: 
   - `onDragStart` - Tracks which task is being dragged
   - `onDragOver` - Highlights the drop target
   - `onDragEnd` - Swaps tasks and updates state
3. **Visual Feedback**: 
   - Dragging task becomes semi-transparent
   - Drop target gets blue border and ring effect
   - Smooth animations throughout
