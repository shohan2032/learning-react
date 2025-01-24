import React from "react";
import GetPost1 from "./components/GetPost1";
import GetPost2 from "./components/GetPost2";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Posts Dashboard</h1>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post 1</h2>
          <GetPost1 />
        </section>

        <hr className="border-t border-gray-300" />

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post 2</h2>
          <GetPost2 />
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; 2025 News App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
