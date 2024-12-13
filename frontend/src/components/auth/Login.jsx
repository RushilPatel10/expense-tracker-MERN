import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { Card, Button, Input, FormGroup, Label } from '../../styles/SharedStyles';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <Logo>ExpenseTracker</Logo>
          <Subtitle>Welcome back! Please login to your account.</Subtitle>
        </AuthHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          <Button type="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </form>

        <AuthFooter>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.background.default};
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 400px;
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  color: ${props => props.theme.primary.main};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.text.secondary};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.error.main};
  background: ${props => props.theme.error.light}20;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const AuthFooter = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.text.secondary};

  a {
    color: ${props => props.theme.primary.main};
    font-weight: 500;
    
    &:hover {
      color: ${props => props.theme.primary.dark};
    }
  }
`;

export default Login; 