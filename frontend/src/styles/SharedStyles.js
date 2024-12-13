import styled from 'styled-components';

export const theme = {
  primary: '#6C63FF',
  secondary: '#4CAF50',
  danger: '#FF5252',
  background: '#F5F7FF',
  text: '#2C3E50',
  white: '#FFFFFF',
  gray: '#95A5A6',
  lightGray: '#ECEFF1',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
};

export const Card = styled.div`
  background: ${theme.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: 2rem;
  margin: 1rem 0;
`;

export const Button = styled.button`
  background: ${props => props.$secondary ? props.theme.white : props.theme.primary};
  color: ${props => props.$secondary ? props.theme.primary : props.theme.white};
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: ${props => props.theme.gray};
    border-color: ${props => props.theme.gray};
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid ${theme.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${theme.primary};
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid ${theme.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  background: ${theme.white};
  cursor: pointer;

  &:focus {
    border-color: ${theme.primary};
    outline: none;
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.background};
  padding: 2rem;
`;

export const FormContainer = styled(Card)`
  max-width: 500px;
  margin: 2rem auto;
`;

export const Title = styled.h1`
  color: ${theme.text};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

export const Subtitle = styled.h2`
  color: ${theme.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

export const ErrorMessage = styled.div`
  color: ${theme.danger};
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`; 