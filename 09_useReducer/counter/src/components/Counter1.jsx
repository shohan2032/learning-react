import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.value };
    case "decrement":
      return { count: state.count - action.value };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
};

function Counter1() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <div>
        <h1>Count: {state.count}</h1>
        <button onClick={() => dispatch({ type: "increment",value: 1 })}>Increment</button>
        <button onClick={() => dispatch({ type: "decrement" , value: 1})}>Decrement</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    );
}

export default Counter1