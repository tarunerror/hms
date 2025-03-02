import { Link } from 'react-router-dom';

function HospitalCard({ hospital, onDelete }) {
  const { _id, name, city, imageUrl, specialities, rating } = hospital;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      onDelete(_id);
    }
  };

  return (
    <div className="card hospital-card">
      <img src={imageUrl} alt={name} />
      <div className="hospital-card-content">
        <h3>{name}</h3>
        <p>City: {city}</p>
        <div className="rating">
          <span className="rating-star">★</span>
          <span>{rating}</span>
        </div>
        <div className="specialities">
          {specialities.slice(0, 3).map((speciality, index) => (
            <span key={index} className="speciality-tag">{speciality}</span>
          ))}
          {specialities.length > 3 && (
            <span className="speciality-tag">+{specialities.length - 3} more</span>
          )}
        </div>
      </div>
      <div className="hospital-card-footer">
        <Link to={`/hospitals/${_id}`} className="btn btn-primary">View Details</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default HospitalCard;
