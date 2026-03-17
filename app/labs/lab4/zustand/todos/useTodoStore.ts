import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, { ...todo, id: new Date().getTime().toString() }],
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    })),
}));