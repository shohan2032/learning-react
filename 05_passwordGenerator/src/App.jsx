import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()-_=+[{]};:'\",<.>/?~";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-8 bg-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Password Generator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Customize and generate a secure password.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="range"
                value={length}
                min={8}
                max={15}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="text-gray-800 font-bold">
                Length: {length}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(!numberAllowed)}
              />
              <label className="text-gray-800 font-bold">
                Include numbers
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setCharacterAllowed(!characterAllowed)}
              />
              <label className="text-gray-800 font-bold">
                Include special characters
              </label>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;