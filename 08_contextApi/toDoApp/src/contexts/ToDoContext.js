import { useContext, createContext } from 'react'

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            todo: 'Task 1',
            completed: false
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, todo) => {}
})

export const ToDoProvider = ToDoContext.Provider

export const useToDo = () => {
    return useContext(ToDoContext)
}

export default useToDo;