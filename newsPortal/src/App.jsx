import { useState } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

function App() {
  const [category, setCategory] = useState("General");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <Header category={category} onCategoryChange={handleCategoryChange} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Body category={category} />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
