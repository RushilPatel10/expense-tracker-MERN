import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { Card, Button, Input, FormGroup, Label } from '../../styles/SharedStyles';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <Logo>ExpenseTracker</Logo>
          <Subtitle>Create your account to get started</Subtitle>
        </AuthHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

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
              placeholder="Create a password"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>

          <Button type="submit" style={{ width: '100%' }}>
            Sign Up
          </Button>
        </form>

        <AuthFooter>
          Already have an account? <Link to="/login">Login</Link>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

// Reuse styled components from Login
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

export default Signup; 