import { useReducer } from 'react'
import { CounterContextProvider } from './context/CounterContext'
import ComponentA from './components/ComponentA';

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

function App() {
  const [count, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count: {count}</h1>
      <CounterContextProvider value={{ dispatch }}>
        <ComponentA />
      </CounterContextProvider>
    </div>
  )
}

export default App
