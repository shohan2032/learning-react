import Main from "./Main";
function Home() {
  // console.log("home a ashce")
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 shadow-md bg-white px-8 py-4 inline-block rounded-3xl">
          ✨ Welcome to <span className="text-blue-500">Blog Hub</span> ✨
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Explore insightful blogs from various authors!
        </p>
      </section>

      {/* Main Blog Section */}
      <Main />
    </div>
  );
}

export default Home;
