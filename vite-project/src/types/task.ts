export type Category = "today" | "tomorrow" | "later"

export interface Task {
  id: string
  text: string
  completed: boolean
  category: Category
}
