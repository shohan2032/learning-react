import React from 'react'
import Main from './Main'
function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section>
      <h1 className="text-3xl font-bold text-gray-700 shadow-lg justify-center text-center rounded-4xl">Welcome to Food Hub</h1>
      </section>
      {/* <h1 className="text-4xl font-bold text-gray-700 shadow-lg justify-center text-center">Welcome to Food Hub</h1> */}
      <Main />
    </div>
  )
}

export default Home