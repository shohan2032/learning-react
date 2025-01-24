# React ToolKit notes
Redux is a global state management Library.React-redux is the default tool to intregrate redux in react app.
- [Redux Documentation](https://redux-toolkit.js.org/introduction/getting-started) 
## Configuration of RTK
- npm install @reduxjs/toolkit
- npm install react-redux
---
### Basics of Redux
- First we have to create a Store using "configureStore"
```javascript
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    // reducer: {
    //     todos: todoReducer,
    // },
    // add all reducers to store
    reducer: todoReducer,
});

```
- Then we have to create Reducers(slices) using "createSlice". It has keys like name, innitialState and then reducers(every slice has a innitial state)
``` javascript
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "hello" }],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: nanoid(), text: action.payload });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
```

- nanoid: Create a unique id
- useDispatch: To send data from a component to stor.It uses a reducer to send data to the store
- useSelector: To take data from a store