import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import AuthContext from "../../contexts/authContext";

function Header() {
  const { state } = useContext(AuthContext);
  const currentUser = state.user;
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Favorites", slug: "/favorites", active: currentUser !== null },
    { name: "Login", slug: "/login", active: currentUser === null },
    { name: "Signup", slug: "/signup", active: currentUser === null },
    { name: "MyBlogs", slug: "/my-blogs", active: currentUser !== null },
    { name: "AddBlog", slug: "/add-blog", active: currentUser !== null},
    { name: "Last 10 Liked Blogs", slug: "/last-10-liked-blogs", active: currentUser !== null}

  ];

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <span className="text-xl font-bold text-gray-700">Blog Hub</span>
          <span className="text-xl font-bold text-gray-700">{currentUser}</span>
        </div>

        <ul className="flex items-center space-x-6">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() =>
                      // console.log("Clicked")
                      navigate(item.slug)
                    }
                    className="text-gray-700 hover:text-blue-500 transition"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {currentUser && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;



// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LogoutBtn from "./LogoutBtn";
// import AuthContext from "../context/AuthContext";

// function Header() {
//   const navigate = useNavigate();
//   const { state } = useContext(AuthContext);
//   const currentUser = state.user;

//   const navItems = [
//     { name: "Home", slug: "/", active: true },
//     { name: "Favorites", slug: "/favorites", active: currentUser !== null },
//     { name: "Login", slug: "/login", active: currentUser === null },
//     { name: "Signup", slug: "/signup", active: currentUser === null },
//     { name: "MyBlogs", slug: "/my-blogs", active: currentUser !== null },
//     { name: "AddBlog", slug: "/add-blog", active: currentUser !== null },
//     { name: "Last 10 Liked Blogs", slug: "/last-10-liked-blogs", active: currentUser !== null }
//   ];

//   return (
//     <header className="bg-white shadow-md">
//       <nav className="container mx-auto flex items-center justify-between p-4">
//         <div className="flex items-center space-x-4">
//           <Link to="/">
//             <img
//               src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760"
//               alt="Logo"
//               className="h-10 w-10 rounded-full"
//             />
//           </Link>
//           <span className="text-xl font-bold text-gray-700">Blog Hub</span>
//           {currentUser && (
//             <span className="text-xl font-bold text-gray-700">{currentUser}</span>
//           )}
//         </div>

//         <ul className="flex items-center space-x-6">
//           {navItems.map(
//             (item) =>
//               item.active && (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="text-gray-700 hover:text-blue-500 transition"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               )
//           )}
//           {currentUser && (
//             <li>
//               <LogoutBtn />
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
