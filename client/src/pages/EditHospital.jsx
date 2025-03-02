import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHospitalById, updateHospital, addHospitalDetails } from '../api/hospitalApi';

function EditHospital() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [hospital, setHospital] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    imageUrl: '',
    specialities: [],
    rating: 0
  });
  const [detailsData, setDetailsData] = useState({
    description: '',
    images: [],
    numberOfDoctors: 0,
    numberOfDepartments: 0
  });
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setLoading(true);
        const data = await getHospitalById(id);
        setHospital(data);
        
        // Set form data
        setFormData({
          name: data.name || '',
          city: data.city || '',
          imageUrl: data.imageUrl || '',
          specialities: data.specialities || [],
          rating: data.rating || 0
        });
        
        // Set details data
        if (data.details) {
          setDetailsData({
            description: data.details.description || '',
            images: data.details.images || [],
            numberOfDoctors: data.details.numberOfDoctors || 0,
            numberOfDepartments: data.details.numberOfDepartments || 0
          });
        }
        
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetailsData({
      ...detailsData,
      [name]: value
    });
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setDetailsData({
        ...detailsData,
        images: [...detailsData.images, newImage]
      });
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    setDetailsData({
      ...detailsData,
      images: detailsData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Update basic hospital info
      await updateHospital(id, formData);
      
      // Update hospital details
      await addHospitalDetails(id, detailsData);
      
      navigate(`/hospitals/${id}`);
    } catch (err) {
      setError('Failed to update hospital. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading hospital details...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!hospital) return <p>Hospital not found</p>;

  return (
    <div className="edit-hospital-page">
      <h1>Edit Hospital</h1>
      
      <form onSubmit={handleSubmit} className="hospital-form card">
        <h2>Basic Information</h2>
        
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
        
        <h2>Additional Details</h2>
        
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={detailsData.description}
            onChange={handleDetailsChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="numberOfDoctors" className="form-label">Number of Doctors</label>
          <input
            type="number"
            id="numberOfDoctors"
            name="numberOfDoctors"
            className="form-control"
            min="0"
            value={detailsData.numberOfDoctors}
            onChange={handleDetailsChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="numberOfDepartments" className="form-label">Number of Departments</label>
          <input
            type="number"
            id="numberOfDepartments"
            name="numberOfDepartments"
            className="form-control"
            min="0"
            value={detailsData.numberOfDepartments}
            onChange={handleDetailsChange}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Additional Images</label>
          
          <div className="images-list">
            {detailsData.images.map((image, index) => (
              <div key={index} className="image-item">
                <span>{image}</span>
                <button 
                  type="button" 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-image-form">
            <input
              type="url"
              className="form-control"
              placeholder="Enter image URL"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleAddImage}
            >
              Add Image
            </button>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditHospital;
