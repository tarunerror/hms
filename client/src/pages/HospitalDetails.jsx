import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospitalById } from '../api/hospitalApi';

function HospitalDetails() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const data = await getHospitalById(id);
        setHospital(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch hospital details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [id]);

  if (loading) return <p>Loading hospital details...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!hospital) return <p>Hospital not found</p>;

  const { 
    name, 
    city, 
    imageUrl, 
    specialities, 
    rating,
    details = {}
  } = hospital;

  const { 
    description = '', 
    images = [], 
    numberOfDoctors = 0, 
    numberOfDepartments = 0 
  } = details;

  return (
    <div className="hospital-details-page">
      <div className="hospital-header">
        <h1>{name}</h1>
        <div className="hospital-actions">
          <Link to={`/edit-hospital/${id}`} className="btn btn-primary">Edit Hospital</Link>
        </div>
      </div>
      
      <div className="hospital-main card">
        <div className="hospital-image">
          <img src={imageUrl} alt={name} />
        </div>
        
        <div className="hospital-info">
          <p><strong>City:</strong> {city}</p>
          <div className="rating">
            <strong>Rating:</strong> 
            <span className="rating-star">★</span>
            <span>{rating}</span>
          </div>
          
          <div className="specialities">
            <h3>Specialities</h3>
            <div>
              {specialities.map((speciality, index) => (
                <span key={index} className="speciality-tag">{speciality}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="hospital-details card">
        <h2>Hospital Details</h2>
        
        <div className="details-section">
          <h3>Description</h3>
          <p>{description || 'No description available'}</p>
        </div>
        
        <div className="details-section">
          <h3>Statistics</h3>
          <p><strong>Number of Doctors:</strong> {numberOfDoctors}</p>
          <p><strong>Number of Departments:</strong> {numberOfDepartments}</p>
        </div>
        
        {images.length > 0 && (
          <div className="details-section">
            <h3>Additional Images</h3>
            <div className="image-gallery">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`${name} - ${index + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HospitalDetails;
