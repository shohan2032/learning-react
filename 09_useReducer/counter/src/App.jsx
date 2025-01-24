import React, { useReducer } from "react";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";
import Counter3 from "./components/Counter3";

function App() {
  return (
    <>
        < Counter1 />
        <br />
        <hr />
        < Counter2 />
        <br />
        <hr />
        < Counter3 />
    </>
  );
}

export default App;
