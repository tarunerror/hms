import { useState, useEffect } from 'react';
import { getHospitalsByCity, deleteHospital } from '../api/hospitalApi';
import HospitalCard from '../components/HospitalCard';

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHospitals = async (cityQuery = '') => {
    try {
      setLoading(true);
      const response = await getHospitalsByCity(cityQuery);
      setHospitals(response.data || response); // Handle both nested and flat responses
      setError(null);
    } catch (err) {
      setError('Failed to fetch hospitals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchCity = e.target.elements.cityInput.value.trim();
    setCity(searchCity);
    fetchHospitals(searchCity);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHospital(id);
      setHospitals(hospitals.filter(hospital => hospital._id !== id));
    } catch (err) {
      setError('Failed to delete hospital. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="hospital-list-page">
      <h1>Hospitals</h1>

      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          name="cityInput"
        />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <p>Loading hospitals...</p>
      ) : hospitals.length > 0 ? (
        <div className="hospital-grid">
          {hospitals.map(hospital => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p>No hospitals found. Try a different city or add a new hospital.</p>
      )}
    </div>
  );
}

export default HospitalList;
