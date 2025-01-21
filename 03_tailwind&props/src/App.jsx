import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let obj = {
    name: 'Shohan',
    age: 25,
    city: 'Dhaka',
  }
  return (
    <>
      {/* <Card shoeName="Retro" myObj={obj}></Card> */}
      <Card shoeName="Retro" addToBag="ADD TO BAG" buyNow="BUY NOW"></Card>
    </>
  )
}

export default App
