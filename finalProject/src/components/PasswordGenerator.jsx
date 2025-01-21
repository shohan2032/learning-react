import React, { useState, useCallback, useEffect, useRef } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showSourceCode, setShowSourceCode] = useState(false);

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
      pass += str.charAt(Math.floor(Math.random() * str.length));
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
    <div className="flex h-screen bg-gray-100">
      {/* Left Column: Password Generator UI */}
      <div
        className="w-1/2 flex flex-col items-center justify-center p-8 transition-colors duration-300"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Password Generator</h1>
        <p className="text-lg text-gray-600 mb-8">
          Customize and generate a secure password.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-4 py-2 shrink-0"
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
                onChange={(e) => setLength(Number(e.target.value))}
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
              <label className="text-gray-800 font-bold">Include numbers</label>
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
                <strong>useState:</strong> Used for managing password length and
                character inclusion options.
              </li>
              <li>
                <strong>useCallback:</strong> Memoized functions to improve
                performance and avoid unnecessary re-renders.
              </li>
              <li>
                <strong>useEffect:</strong> Automatically regenerates passwords
                when dependencies change.
              </li>
              <li>
                <strong>useRef:</strong> Accesses the password input for
                clipboard functionality.
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
                // Paste the full source code here for user reference.
              `}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;