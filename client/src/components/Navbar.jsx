import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Hospital Management System</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/hospitals" className="navbar-link">Hospitals</Link>
          <Link to="/create-hospital" className="navbar-link">Add Hospital</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
