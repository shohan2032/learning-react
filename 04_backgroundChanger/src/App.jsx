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
