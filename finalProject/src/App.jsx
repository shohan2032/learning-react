import UseState1 from "./components/UseState1";
import UseState2 from "./components/UseState2";
import PasswordGenerator from "./components/PasswordGenerator";
function App() {
  return (
    <div className="bg-white min-h-screen p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">React Hook Projects</h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore interactive examples of <code className="font-bold">React</code> hook.
        </p>
      </header>

      {/* UseState1 Component */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Project 01: Change Background Color
        </h2>
        <UseState1 />
      </section>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8"></div>

      {/* UseState2 Component */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Project 02: Counter Value
        </h2>
        <UseState2 />
      </section>

      <div className="border-t border-gray-300 my-8"></div>

       {/* useCallback, useEffect, useRef project: PasswordGenerator  */}
       <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Project 03: Password Generator
        </h2>
        <PasswordGenerator />
      </section>

    </div>
  );
}

export default App;