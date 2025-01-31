import React from 'react'
import Main from './Main'
function Home() {
  // console.log("home a ashce")
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-6">
      <h1 className="text-3xl font-bold text-gray-700 shadow-lg justify-center text-center rounded-4xl">Welcome to Blog Hub</h1>
      </section>
      <Main />
    </div>
  )
}

export default Home