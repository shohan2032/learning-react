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
