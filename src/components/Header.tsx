import { Link, useLocation } from "react-router-dom";
import { Zap, Heart } from "lucide-react";

function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-red-600 text-white ">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-yellow-300" />
            <h1 className="text-2xl font-bold tracking-tight">
              Pokémon Explorer
            </h1>
          </div>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 hover:text-yellow-300 transition-colors ${
                location.pathname === "/" ? "text-yellow-300" : ""
              }`}
            >
              <span>Home</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-2 hover:text-yellow-300 transition-colors ${
                location.pathname === "/favorites" ? "text-yellow-300" : ""
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
