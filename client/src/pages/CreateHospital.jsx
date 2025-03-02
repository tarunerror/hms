import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital } from '../api/hospitalApi';

const specialityOptions = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 
  'Oncology', 'Gynecology', 'Dermatology', 'Ophthalmology',
  'ENT', 'Psychiatry', 'Urology', 'Gastroenterology'
];

function CreateHospital() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: '',
    specialities: [],
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSpecialityChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    setFormData(prevData => {
      if (isChecked) {
        return {
          ...prevData,
          specialities: [...prevData.specialities, value]
        };
      } else {
        return {
          ...prevData,
          specialities: prevData.specialities.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await createHospital(formData);
      navigate('/hospitals');
    } catch (err) {
      setError('Failed to create hospital. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-hospital-page">
      <h1>Add New Hospital</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="hospital-form card">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Hospital Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">Image URL (optional)</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://via.placeholder.com/400x200?text=Hospital+Image"
          />
          <small className="form-text text-muted">Leave empty to use default image</small>
        </div>
        
        <div className="form-group">
          <label className="form-label">Specialities</label>
          <div className="specialities-checkboxes">
            {specialityOptions.map(speciality => (
              <div key={speciality} className="speciality-checkbox">
                <input
                  type="checkbox"
                  id={`speciality-${speciality}`}
                  value={speciality}
                  checked={formData.specialities.includes(speciality)}
                  onChange={handleSpecialityChange}
                />
                <label htmlFor={`speciality-${speciality}`}>{speciality}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="rating" className="form-label">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="form-control"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Hospital'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateHospital;
