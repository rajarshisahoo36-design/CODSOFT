import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/enter' : '/join';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password } 
      : { ...formData, role: 'scout' };

    try {
      const res = await axios.post(`http://localhost:5000/api/v1/auth${endpoint}`, payload);
      login(res.data.token, res.data.data?.user);
      navigate('/board');
    } catch (err) {
      alert(err.response?.data?.message || 'Connection failed.');
    }
  };

  return (
    <div className="auth-container card">
      <h2 className="text-center">{isLogin ? 'Welcome Back' : 'Join the Ranks'}</h2>
      <p className="text-center text-muted" style={{ marginBottom: '20px' }}>
        {isLogin ? 'Login to access your dashboard' : 'Create an account to start posting'}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <input name="username" placeholder="Username" className="form-input" onChange={handleChange} />
          </div>
        )}
        <div className="form-group">
          <input name="email" type="email" placeholder="Email Address" className="form-input" onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="password" type="password" placeholder="Password" className="form-input" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
      
      <div className="text-center" style={{ marginTop: '1rem' }}>
        <span 
          style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
        </span>
      </div>
    </div>
  );
};

export default Auth;