import { Link } from 'react-router-dom';
import './Navbar.css'; // se quiser separar o CSS

export default function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-title">Filmes, séries e muito mais</h1>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoritos</Link>
      </nav>
    </header>
  );
}