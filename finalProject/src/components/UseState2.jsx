import React, { useState } from "react";

function UseState2() {
  const [counter, setCounter] = useState(10);
  const [showNotes, setShowNotes] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);

  const incrementValue = () => {
    if (counter < 20) {
      setCounter((prevCounter) => prevCounter + 1);
    } else {
      alert("Counter value should not be more than 20");
    }
  };

  const decrementValue = () => {
    if (counter > 0) {
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      alert("Counter value should not be less than 0");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Column: Counter UI */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          UseState Project-02
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Click the buttons below to increment or decrement the counter value.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Counter Value:{" "}
            <span className="text-blue-500 font-bold">{counter}</span>
          </h2>
          <div className="flex gap-4">
            <button
              onClick={incrementValue}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Increment Value
            </button>
            <button
              onClick={decrementValue}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Decrement Value
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Notes and Source Code Section */}
      <div className="w-1/2 bg-gray-900 text-white overflow-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Details</h2>

        {/* Notes Section */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
        >
          {showNotes ? "Hide Notes" : "Show Notes"}
        </button>
        {showNotes && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Notes:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>useState:</strong> Used for managing the state of the counter value. The state is updated based on user interactions.
              </li>
              <li>
                <strong>State Update with Functions:</strong> The counter is updated using the `setCounter` function, which takes a previous state value and increments or decrements it.
              </li>
              <li>
                <strong>Conditional Logic:</strong> Prevented the counter from going below 0 or above 20 by using conditional checks.
              </li>
              <li>
                <strong>Button Functionality:</strong> Buttons for incrementing and decrementing the counter value are styled using Tailwind CSS classes for a better user experience.
              </li>
              <li>
                <strong>Conditional Rendering:</strong> The notes section can be toggled on and off using the "Show Notes" button.
              </li>
            </ul>
          </div>
        )}

        {/* Source Code Section */}
        <button
          onClick={() => setShowSourceCode(!showSourceCode)}
          className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition mb-4"
        >
          {showSourceCode ? "Hide Source Code" : "Show Source Code"}
        </button>
        {showSourceCode && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Source Code:</h3>
            <pre className="text-sm whitespace-pre-wrap">
              {`
                import { useState } from 'react'

                function App() {
                  let [counter,setCounter] = useState(10);
                  const incrementValue = () => {
                    if(counter < 20) {
                      counter++;
                    } else {
                      alert('Counter value should not be more than 20');
                    }
                    setCounter(counter);
                    console.log(counter);
                  }
                  const decrementValue = () => {
                    if(counter > 0) {
                      counter--;
                    }  else {
                      alert('Counter value should not be less than 0');
                    }
                    setCounter(counter);
                    console.log(counter);
                  }
                  return (
                    <>
                      <div className="w-full h-screen flex flex-col items-center justify-center p-8 bg-gray-200">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                          UseState Project-02
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                          Click the buttons below to increment or decrement the counter value.
                        </p>
                        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Counter Value:{" "}
                            <span className="text-blue-500 font-bold">{counter}</span>
                          </h2>
                          <div className="flex gap-4">
                            <button
                              onClick={incrementValue}
                              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                            >
                              Increment Value
                            </button>
                            <button
                              onClick={decrementValue}
                              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                            >
                              Decrement Value
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }

                export default App

              `}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default UseState2;