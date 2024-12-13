import styled from 'styled-components';

export const theme = {
  primary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1E40AF',
    text: '#FFFFFF'
  },
  secondary: {
    main: '#059669',
    light: '#34D399',
    dark: '#047857',
    text: '#FFFFFF'
  },
  background: {
    default: '#F8FAFC',
    paper: '#FFFFFF',
    dark: '#1E293B'
  },
  text: {
    primary: '#1E293B',
    secondary: '#475569',
    light: '#94A3B8'
  },
  border: {
    light: '#E2E8F0',
    default: '#CBD5E1'
  },
  error: {
    main: '#DC2626',
    light: '#EF4444',
    dark: '#B91C1C'
  },
  success: {
    main: '#059669',
    light: '#34D399',
    dark: '#047857'
  },
  warning: {
    main: '#D97706',
    light: '#FBBF24',
    dark: '#B45309'
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  }
};

export const Card = styled.div`
  background: ${props => props.theme.background.paper};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadow.md};
  padding: 1.5rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${props => props.$secondary ? props.theme.background.paper : props.theme.primary.main};
  color: ${props => props.$secondary ? props.theme.text.primary : props.theme.primary.text};
  border: 2px solid ${props => props.$secondary ? props.theme.border.default : props.theme.primary.main};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadow.md};
    background: ${props => props.$secondary ? props.theme.background.default : props.theme.primary.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.border.default};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${props => props.theme.text.primary};
  background: ${props => props.theme.background.paper};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.primary.light}30;
  }

  &::placeholder {
    color: ${props => props.theme.text.light};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.border.default};
  border-radius: 8px;
  font-size: 0.875rem;
  color: ${props => props.theme.text.primary};
  background: ${props => props.theme.background.paper};
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary.main};
    box-shadow: 0 0 0 3px ${props => props.theme.primary.light}30;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.text.primary};
  font-size: 0.875rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.theme.text.primary};
  margin-bottom: 1.5rem;
`;

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`; 