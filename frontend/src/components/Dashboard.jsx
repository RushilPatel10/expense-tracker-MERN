import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from './expenses/ExpenseForm';
import ExpenseList from './expenses/ExpenseList';
import ExpenseStats from './statistics/ExpenseStats';
import styled from 'styled-components';
import { Button } from '../styles/SharedStyles';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('expenses');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DashboardWrapper>
      <Navbar>
        <NavContent>
          <Logo>ExpenseTracker</Logo>
          <NavItems>
            <UserInfo>
              <UserAvatar>{user?.name?.[0]?.toUpperCase()}</UserAvatar>
              <UserName>{user?.name}</UserName>
            </UserInfo>
            <Button $secondary onClick={handleLogout}>Logout</Button>
          </NavItems>
        </NavContent>
      </Navbar>

      <PageContainer>
        <MainContent>
          <Header>
            <HeaderContent>
              <PageTitle>Dashboard</PageTitle>
              <QuickStats>
                <StatCard>
                  <StatLabel>This Month</StatLabel>
                  <StatValue>$2,450</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Last Month</StatLabel>
                  <StatValue>$1,980</StatValue>
                </StatCard>
                <StatCard>
                  <StatLabel>Total Expenses</StatLabel>
                  <StatValue>$12,340</StatValue>
                </StatCard>
              </QuickStats>
            </HeaderContent>
            
            <NavButtons>
              <Button 
                onClick={() => setActiveView('expenses')}
                $secondary={activeView !== 'expenses'}
              >
                Expenses
              </Button>
              <Button 
                onClick={() => setActiveView('stats')}
                $secondary={activeView !== 'stats'}
              >
                Statistics
              </Button>
              {activeView === 'expenses' && (
                <Button onClick={() => setIsFormVisible(true)}>
                  Add Expense
                </Button>
              )}
            </NavButtons>
          </Header>

          <ContentArea>
            {activeView === 'expenses' ? <ExpenseList /> : <ExpenseStats />}
          </ContentArea>
        </MainContent>
      </PageContainer>

      {isFormVisible && (
        <ModalOverlay>
          <ModalContent>
            <ExpenseForm onClose={() => setIsFormVisible(false)} />
          </ModalContent>
        </ModalOverlay>
      )}
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background.default};
`;

const Navbar = styled.nav`
  background: ${props => props.theme.background.paper};
  box-shadow: ${props => props.theme.shadow.sm};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
`;

const NavContent = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const PageContainer = styled.div`
  padding-top: 64px;
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  flex: 1;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const HeaderContent = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${props => props.theme.text.primary};
  margin-bottom: 24px;
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: ${props => props.theme.background.paper};
  padding: 24px;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadow.sm};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.text.secondary};
  font-size: 0.875rem;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  color: ${props => props.theme.text.primary};
  font-size: 1.5rem;
  font-weight: 600;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const ContentArea = styled.div`
  background: ${props => props.theme.background.paper};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadow.sm};
  padding: 24px;
  width: 100%;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary.main};
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primary.main};
  color: ${props => props.theme.primary.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserName = styled.span`
  color: ${props => props.theme.text.primary};
  font-weight: 500;

  @media (max-width: 480px) {
    display: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
`;

export default Dashboard; 