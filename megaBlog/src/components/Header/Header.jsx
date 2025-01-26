import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isLoggedIn,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !isLoggedIn,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: isLoggedIn,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: isLoggedIn,
    },
  ];

  return (
    <header>
      <Container>
        <nav className="flex">
          <div className="flex justify-between items-center space-x-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  {/* <Link
                    to={item.slug}
                    className="text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    {item.name}
                  </Link> */}
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-sm font-medium text-gray-600
                    hover:text-gray-800"
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {isLoggedIn && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
