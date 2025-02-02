# [Documentation](https://react.dev/learn/typescript)

### Install this dependency to use typescript with react
- npm install @types/react @types/react-dom

# Typing Props of functions

```javascript
function MyButton({ title }: { title: string }) {
  return <button>{title}</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```

```javascript
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a disabled button" disabled={true} />
    </div>
  );
}
```

# Typing Hooks

- The type definitions from @types/react include types for the built-in Hooks, so you can use them in your components without any additional setup.However, we can look at a few examples of how to provide types for Hooks.

### useState

```javascript
// Infer the type as "boolean"
const [enabled, setEnabled] = useState(false);

// Explicitly set the type to "boolean"
const [enabled, setEnabled] = useState < boolean > false;

// Union type
type Status = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState < Status > "idle";

// you can group related state as an object and describe the different possibilities via object types
type RequestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success", data: any }
  | { status: "error", error: Error };

const [requestState, setRequestState] =
  useState < RequestState > { status: "idle" };
```

### useReducer

```javascript
import { useReducer } from "react";

interface State {
  count: number;
}

type CounterAction =
  | { type: "reset" }
  | { type: "setCount", value: State["count"] };

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const [state, dispatch] = useReducer < State > (stateReducer, initialState);
  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```
### useContext
```javascript
import { createContext, useContext, useState } from 'react';

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  )
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  )
}
```
```javascript
import { createContext, useContext, useState, useMemo } from 'react';

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  kind: string
};

// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}

export default function MyApp() {
  const object = useMemo(() => ({ kind: "complex" }), []);

  return (
    <Context.Provider value={object}>
      <MyComponent />
    </Context.Provider>
  )
}

function MyComponent() {
  const object = useGetComplexObject();

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
}
```
### useMemo
The useMemo Hooks will create/re-access a memorized value from a function call, re-running the function only when dependencies passed as the 2nd parameter are changed. The result of calling the Hook is inferred from the return value from the function in the first parameter. You can be more explicit by providing a type argument to the Hook.
```javascript
// The type of visibleTodos is inferred from the return value of filterTodos
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```
### [useCallback](https://react.dev/learn/typescript#typing-usecallback)
```javascript
import { useState, useCallback } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, [setValue])
  
  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```
### DOM Events 
If you need to use an event that is not included in this list, you can use the React.SyntheticEvent type, which is the base type for all events.
```javascript
import { useState } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```
### Children
```javascript   
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```
This is a very broad definition of children. The second is to use the React.ReactElement type, which is only JSX elements and not JavaScript primitives like strings or numbers:
```javascript
interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
```
### Style Props
```javascript
interface MyComponentProps {
  style: React.CSSProperties;
}
```
# [Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup)
