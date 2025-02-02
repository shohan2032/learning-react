import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { Store } from "../../interface/reduxInterface";
const Header: React.FC = () => {
  const currentUser = useSelector((state:Store) => state.auth.user);
  const navigate = useNavigate();

  interface NavItems {
    name: string;
    slug: string;
    active: boolean;
  }

  const navItems: NavItems[] = [
    { name: "Home", slug: "/", active: true },
    { name: "Favorites", slug: "/favorites", active: currentUser !== null },
    { name: "Login", slug: "/login", active: currentUser === null },
    { name: "Signup", slug: "/signup", active: currentUser === null },
    { name: "My Blogs", slug: "/my-blogs", active: currentUser !== null },
    { name: "Add Blog", slug: "/add-blog", active: currentUser !== null },
    {
      name: "Last 10 Liked Blogs",
      slug: "/last-10-liked-blogs",
      active: currentUser !== null,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo and Branding */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://images-platform.99static.com/v84irzbNBd5aawXGKXfH4SEjcn0=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/117/117132/attachment_117132760"
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-white shadow-md"
            />
          </Link>
          <span className="text-2xl font-bold text-white tracking-wide">
            Blog Hub
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-white font-medium px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-white hover:text-blue-500"
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
