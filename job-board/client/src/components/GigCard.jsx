import { Link } from 'react-router-dom';

const GigCard = ({ data }) => {
  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ marginTop: 0 }}>{data.title}</h3>
        <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
          <span style={{ marginRight: '15px' }}>📍 {data.location}</span>
          <span>💰 {data.salaryRange}</span>
        </div>
        <p style={{ color: '#555' }}>{data.description.substring(0, 100)}...</p>
      </div>
      <Link to={`/board/${data._id}`} className="btn btn-outline" style={{ marginTop: '1rem', textAlign: 'center' }}>
        View Details
      </Link>
    </div>
  );
};

export default GigCard;