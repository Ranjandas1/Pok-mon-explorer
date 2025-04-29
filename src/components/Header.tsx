import { Zap } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="h-10 w-8 text-yellow-300" />
          <h1 className="text-2xl font-bold tracking-tight">
            Pokémon Explorer
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
