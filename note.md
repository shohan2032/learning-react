# React
**[First Start Reading it](https://react.dev/learn#sharing-data-between-components)**
- **Component:** A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.React component names must always start with a capital letter, while HTML tags must be lowercase.Your component also can’t return multiple JSX(markup into js) tags. You have to wrap them into a shared parent, like an empty <>...</> wrapper

- **Hooks:** [Documentation](https://react.dev/reference/react). Functions starting with use are called Hooks. Hooks are more restrictive than other functions. You can only call Hooks at the top of your components (or other Hooks).

- **Sharing data between components:** [Documentation](https://react.dev/learn#sharing-data-between-components)

- **Picking a key** [Documentation](https://react.dev/learn/tutorial-tic-tac-toe#picking-a-key)

- **Thinking in React** [Documentation](https://react.dev/learn/thinking-in-react)

- **TypeScript With React** [Documentation](https://react.dev/learn/typescript)

- **React Developer Tool** [Documentation](https://react.dev/learn/react-developer-tools)

# Single Page Application (SPA)

Single Page Application (SPA) er mane holo ekta website ba web application jekhane shudhu ekta HTML page load hoy, ar tar por user-er interaction-er upor vitti kore page-er content dynamically update hoy. Ei dhoroner application-e full page reload-er dorkar hoy na, jar fole user experience onek beshi smooth hoy.

## Sohoj Udaharan

Facebook ba Gmail ekta Single Page Application-er udaharan.

## Kibhabe SPA Kaj Kore?

1. **Initial Load**: Prothom bar user browser-e website ta open korle ekta single HTML file load hoy.
2. **Dynamic Update**: User jokhon kichu action kore (button click, link click), tokhon JavaScript er sahajye content update hoy, kintu full page abar reload hoy na.
3. **API Call**: Backend server theke data anar jonne JavaScript AJAX call ba fetch API use kore. Ei data asar por page-er ekta specific part update hoy.

## Sohoj Udaharan

Dhoro, tumi ekta online shopping website browse korcho.

- **Traditional Website**: Jodi kono product-er details dekhte chao, tahole pura page abar reload hobe.
- **SPA**: Jodi SPA hoy, tahole sudhu oi product-er details section update hobe, baki page same thakbe.

## SPA-er Kisu Pros ar Cons

### Pros

- Fast and smooth user experience.
- Server theke kom data load korte hoy.
- Responsive design.

### Cons

- SEO friendly na (Search Engine Optimization e problem hoy).
- Browser er JavaScript dependent.

## Technology

SPA toiri korte frameworks/library use kora hoy, jemon:

- React.js
- Angular
- Vue.js

Tahole, ekta Single Page Application user-er experience ke beshi interactive kore tole ebong performance improve kore.

# project creation type-1 steps

- npx create-react-app
- npx create-react-app 01_basics

# project creation type-2 steps

- npm create vite@latest
- then follow the steps

# Conventions

- file name should start with capital letter
- function name should start with capital letter
- if the function returns a html element,then the extension should be jsx.though in vite,it should be jsx always

# Configuring Tailwind with Vite and React

- [Just Go Through This Link](https://tailwindcss.com/docs/guides/vite)

---
### React-router-dom hooks


### **1. `useLoaderData`**
- **What it Does**: `useLoaderData` is a React Hook that retrieves the data returned by the `loader` function defined for a route.
- **When to Use**: Use this when you need to fetch route-specific data and make it available in the corresponding component.
- **Benefits**:
  - Avoids manual `useEffect` calls and state management.
  - Simplifies async data fetching in routes.

**Example**:
```jsx
export const userLoader = async () => {
  const response = await fetch("https://api.github.com/users/octocat");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};

function UserProfile() {
  const user = useLoaderData(); // Get data from loader
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Followers: {user.followers}</p>
    </div>
  );
}

// Route Setup
const router = createBrowserRouter([
  { path: "/user", element: <UserProfile />, loader: userLoader },
]);
```

---

### **2. `Link`**
- **What it Does**: `Link` allows navigation between routes in your app without a full page reload.
- **When to Use**: Use it for in-app navigation to maintain the SPA behavior.
- **Benefits**:
  - Prevents unnecessary page reloads.
  - Updates the URL while only re-rendering required components.

**Example**:
```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

---

### **3. `NavLink`**
- **What it Does**: `NavLink` is similar to `Link`, but it provides styling or class toggling when the link matches the current route.
- **When to Use**: Use it when you need to differentiate active links visually, such as highlighting the active menu item.
- **Benefits**:
  - Adds an `active` class to the active link automatically (customizable).
  - Ideal for navigation menus.

**Example**:
```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "text-blue-500" : "text-gray-500")}
      >
        About
      </NavLink>
    </nav>
  );
}
```

---

### **4. `Outlet`**
- **What it Does**: `Outlet` acts as a placeholder to render child routes in nested routing.
- **When to Use**: Use it when you have nested routes and need to render child components dynamically within a parent layout.
- **Benefits**:
  - Allows dynamic rendering of child routes within a parent layout.
  - Keeps the parent layout intact.

**Example**:
```jsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>Header</header>
      <main>
        <Outlet /> {/* Renders child route components here */}
      </main>
      <footer>Footer</footer>
    </div>
  );
}

function About() {
  return <div>About Us</div>;
}

function Contact() {
  return <div>Contact Us</div>;
}

// Route Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);
```

---

### **5. `useParams`**
- **What it Does**: `useParams` is a React Hook that allows you to extract dynamic parameters from the URL.
- **When to Use**: Use it when your route has dynamic segments (e.g., `/user/:userId`) to access those parameters in the corresponding component.
- **Benefits**:
  - Simplifies accessing dynamic route parameters.
  - Works seamlessly with route matching in `react-router-dom`.

**Example**:
```jsx
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams(); // Extract the `userId` parameter from the URL
  return <div>Viewing User ID: {userId}</div>;
}

// Route Setup
const router = createBrowserRouter([
  {
    path: "/user/:userId",
    element: <User />, // Dynamic parameter is defined in the route
  },
]);
```

---

### Summary Table of Features

| Feature         | Purpose                                     | Key Feature                                            | Usage Example                    |
|------------------|---------------------------------------------|-------------------------------------------------------|----------------------------------|
| `useLoaderData`  | Access data returned by a route loader      | Simplifies fetching and passing route-specific data    | Fetch GitHub user data           |
| `Link`           | Navigate between routes without reload     | Updates URL without full page reload                  | Links in a navigation bar        |
| `NavLink`        | Highlight active links                     | Adds an `active` class for active links               | Navigation menu with active style |
| `Outlet`         | Render child routes within a parent        | Placeholder for nested routing                        | Layout component for nested routes |
| `useParams`      | Extract dynamic parameters from the URL    | Access URL parameters for dynamic routing             | Get `userId` in `/user/:userId`  |

| Feature       | Purpose                                 | Key Feature                                          | Usage Example               |
|---------------|-----------------------------------------|-----------------------------------------------------|-----------------------------|
| `useLoaderData` | Access data returned by a route loader | Simplifies data fetching in route components         | Fetch GitHub user data      |
| `Link`         | Navigate between routes without reload | Lightweight navigation without reloading the page   | Links in a navigation bar   |
| `NavLink`      | Highlight active links                | Adds `active` class or custom styles for active link | Navigation menu with active style |
| `Outlet`       | Render child routes within a parent   | Manages nested routing dynamically                  | Layout component with nested routes |

---

# State Management
React Context API, `useReducer`, and Redux Toolkit are tools for managing state in React applications.

---

### **1. React Context API**
#### **Concept**
- The **Context API** is a way to share state globally between components without passing props manually at every level.
- It works well for simple, non-frequent updates or static data like themes, user authentication, or language preferences.

#### **Use Case**
- Share a theme (`light` or `dark`) across the app.

#### **Example**

```jsx
// ThemeContext.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

```jsx
// App.js
import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
      <h1>{`Current Theme: ${theme}`}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedComponent />
  </ThemeProvider>
);

export default App;
```

#### **When to Use Context API**
- Small apps where the global state doesn't change frequently.
- Ideal for themes, user settings, or localization.

---

### **2. `useReducer`**
#### **Concept**
- `useReducer` is a React hook that manages more complex state logic than `useState`.
- It works similarly to Redux but is local to a component or a small section of the app.

#### **Use Case**
- Manage a counter with increment, decrement, and reset functionality.

#### **Example**

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action type");
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
};

export default Counter;
```

#### **When to Use `useReducer`**
- When the state logic involves multiple actions or complex state transitions.
- Suitable for managing local state within a single component or tightly coupled components.

---

### **3. Redux Toolkit**
#### **Concept**
- Redux Toolkit is a library for managing global state in large applications. It simplifies Redux by providing utilities like `createSlice` and `configureStore`.
- Redux Toolkit is a better choice than raw Redux because it's less verbose and avoids boilerplate code.

#### **Use Case**
- Manage a global cart in an e-commerce app.

#### **Example**

```bash
# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux
```

```jsx
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

export default store;
```

```jsx
// App.js
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { addItem, removeItem } from "./store";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      <h1>Cart</h1>
      <button onClick={() => dispatch(addItem({ id: 1, name: "Product 1" }))}>
        Add Product 1
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <Cart />
  </Provider>
);

export default App;
```

#### **When to Use Redux Toolkit**
- Large applications with complex global state.
- Scenarios requiring predictable state management, middleware (e.g., for logging or async actions), or debugging tools.

---

### **Comparison: When to Use What?**

| **Feature**          | **Context API**               | **useReducer**              | **Redux Toolkit**                |
|-----------------------|-------------------------------|-----------------------------|----------------------------------|
| **Scope**            | Small-scale, lightweight apps | Localized state management  | Large-scale, complex apps        |
| **Ease of Use**      | Simple to set up             | Simple for local logic      | Slightly more setup, but powerful|
| **State Sharing**    | Global, non-frequent updates | Local to components         | Global, frequent updates         |
| **Best For**         | Themes, user settings        | Component-specific logic    | E-commerce, dashboards, etc.     |

---

# Do this Project
Here’s a list of React project ideas arranged in ascending order of complexity. These projects will help you progressively build your skills.

---

### **Beginner Level**
1. **Counter App**  
   - **Features**: Increment, decrement, and reset a number.  
   - **Objective**: Learn how to use React state and event handlers.

2. **To-Do List**  
   - **Features**: Add, mark as completed, and delete tasks.  
   - **Objective**: Practice state management, list rendering, and basic form handling.

3. **Weather App (Static)**  
   - **Features**: Show weather details for a hardcoded location.  
   - **Objective**: Work with props and basic component structure.

---

### **Intermediate Level**
4. **Recipe Book**  
   - **Features**: Display a list of recipes, view details, and search by name.  
   - **Objective**: Use props, state, and conditional rendering.

5. **Expense Tracker**  
   - **Features**: Add expenses, filter by date, and calculate total expenses.  
   - **Objective**: Practice state management and date filtering.

6. **Quiz App**  
   - **Features**: Display questions, show multiple-choice answers, and calculate scores.  
   - **Objective**: Learn how to handle multiple states and events.

7. **Weather App (API Integration)**  
   - **Features**: Fetch and display live weather data using an API like OpenWeatherMap.  
   - **Objective**: Introduce API calls using `fetch` or `axios`.

---

### **Advanced Level**
8. **E-Commerce Product List**  
   - **Features**: Display products, filter by category or price, and add to cart.  
   - **Objective**: Manage a larger application state and implement a basic cart system.

9. **Movie Search App**  
   - **Features**: Search for movies using an API (e.g., OMDB API), view details, and save favorites.  
   - **Objective**: Combine API calls, form handling, and local storage.

10. **Authentication System**  
    - **Features**: Create a sign-up and login page, validate users, and manage authentication states.  
    - **Objective**: Introduce concepts like form validation and basic authentication flow.

11. **Chat Application**  
    - **Features**: Real-time chat using WebSocket (or a library like Firebase).  
    - **Objective**: Work with WebSocket or Firebase for real-time updates.

12. **Portfolio Website**  
    - **Features**: Create a personal portfolio with sections like About, Projects, and Contact.  
    - **Objective**: Learn routing with React Router and responsive design integration.

---

### **Expert Level**
13. **Blog Application**  
    - **Features**: Create, edit, and delete posts; add comments; use an API for backend.  
    - **Objective**: Work on CRUD operations and manage nested state.

14. **Project Management Tool**  
    - **Features**: Add projects, assign tasks, update statuses, and filter by team members.  
    - **Objective**: Learn advanced state management (e.g., Redux) and complex forms.

15. **Social Media App**  
    - **Features**: Post creation, likes, comments, and follow/unfollow functionality.  
    - **Objective**: Handle large-scale state and component interactions.

16. **Real-Time Collaborative Editor**  
    - **Features**: Live editing of documents with multiple users using WebSocket.  
    - **Objective**: Explore advanced real-time features and collaborative design.

---

Start with the simpler projects, and as you progress, each step will prepare you for the more advanced ones.