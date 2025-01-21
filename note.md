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

# 01_basics project creation steps

- npx create-react-app
- npx create-react-app 01_basics

# 02_basics project creation steps

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

### Redux Toolkit 