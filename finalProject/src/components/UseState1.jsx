import React, { useState } from "react";

function UseState1() {
  const [color, setColor] = useState("olive");
  const [showNotes, setShowNotes] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Column: Color Selector UI */}
      <div
        className="w-1/2 flex flex-col items-center justify-center p-8 transition-colors duration-300"
        style={{ backgroundColor: color }}
      >
        <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
          UseState Project-01
        </h1>
        <p className="text-lg text-white mb-8 drop-shadow-md">
          Click the buttons below to change the background color.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="flex flex-wrap gap-4">
            {["red", "yellow", "green", "purple", "blue", "black"].map((col) => (
              <button
                key={col}
                onClick={() => setColor(col)}
                className="px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
                style={{
                  backgroundColor: col,
                  color: col === "yellow" ? "black" : "white",
                }}
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Notes and Source Code Section */}
      <div className="w-1/2 bg-gray-900 text-white overflow-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Details</h2>

        {/* Notes Section */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition mb-4"
        >
          {showNotes ? "Hide Notes" : "Show Notes"}
        </button>
        {showNotes && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Notes:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>useState:</strong> Used for managing the state of the
                background color. This allows dynamic updates to the UI based on
                user interactions.
              </li>
              <li>
                <strong>Dynamic Styles:</strong> The background color changes
                dynamically using inline styles.
              </li>
              <li>
                <strong>Reusable Button Logic:</strong> Buttons for changing
                colors use the same structure, making the code DRY (Don't Repeat
                Yourself).
              </li>
              <li>
                <strong>CSS Transitions:</strong> Smooth background color
                transitions improve the user experience.
              </li>
              <li>
                <strong>Conditional Rendering:</strong> The notes section can be
                toggled on and off using the "Show Notes" button.
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
                  const [color, setColor] = useState("olive")
                  return (
                    <div
                        className="w-full h-screen flex flex-col justify-center items-center transition-colors duration-300"
                        style={{ backgroundColor: color }}
                      >
                        {/* Header Section */}
                        <div className="text-center mb-12">
                          <h1 className="text-4xl font-bold text-white drop-shadow-md">
                            UseState Project-01
                          </h1>
                          <p className="text-lg text-white mt-2 drop-shadow-md">
                            Click any button below to change the background color.
                          </p>
                        </div>

                        {/* Buttons Section */}
                        <div className="flex flex-wrap justify-center gap-6 bg-white/80 p-6 rounded-lg shadow-lg">
                          <button
                            onClick={() => setColor("red")}
                            className="px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "red" }}
                          >
                            Red
                          </button>
                          <button
                            onClick={() => setColor("yellow")}
                            className="px-6 py-3 rounded-full font-semibold text-black shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "yellow" }}
                          >
                            Yellow
                          </button>
                          <button
                            onClick={() => setColor("green")}
                            className="px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "green" }}
                          >
                            Green
                          </button>
                          <button
                            onClick={() => setColor("purple")}
                            className="px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "purple" }}
                          >
                            Purple
                          </button>
                          <button
                            onClick={() => setColor("blue")}
                            className="px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "blue" }}
                          >
                            Blue
                          </button>
                          <button
                            onClick={() => setColor("black")}
                            className="px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                            style={{ backgroundColor: "black" }}
                          >
                            Black
                          </button>
                        </div>
                      </div>
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

export default UseState1;