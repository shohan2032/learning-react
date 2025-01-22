import { useState } from 'react'
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

function App() {
  const [category, setCategory] = useState("General");
  const handleCategory = (category) => {
    setCategory(category);
  }
  return (
    <>
      <Header category={category} onCategoryChange={handleCategory}/>
      <Body category={category}/>
      <Footer />
    </>
  )
}

export default App
