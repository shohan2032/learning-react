import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Favorites", slug: "/favorites", active: currentUser !== null },
    { name: "Login", slug: "/login", active: currentUser === null },
    { name: "Signup", slug: "/signup", active: currentUser === null },
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
          <span className="text-xl font-bold text-gray-700">Food Hub</span>
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
