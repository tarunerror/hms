import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Hospital Management System</h1>
        <p>A comprehensive solution for managing hospital information</p>
        <div className="hero-buttons">
          <Link to="/hospitals" className="btn btn-primary">View Hospitals</Link>
          <Link to="/create-hospital" className="btn btn-secondary">Add New Hospital</Link>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <h3>Hospital Management</h3>
            <p>Add, update, and delete hospital information with ease</p>
          </div>
          <div className="feature-card card">
            <h3>City-based Search</h3>
            <p>Find hospitals in specific cities quickly</p>
          </div>
          <div className="feature-card card">
            <h3>Detailed Information</h3>
            <p>View comprehensive details about each hospital</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
