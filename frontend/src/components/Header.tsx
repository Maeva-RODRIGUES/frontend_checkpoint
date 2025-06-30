import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="bg-pink-600 text-white text-center py-4 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          🌍 Checkpoint Frontend
        </Link>
      </div>
      <div className="flex-none space-x-4">
        <Link to="/" className="btn btn-ghost">Countries</Link>
        <Link to="/add" className="btn btn-outline btn-primary">Ajouter</Link>
      </div>
    </div>
  );
}



