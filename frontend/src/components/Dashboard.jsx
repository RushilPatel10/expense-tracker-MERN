import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from './expenses/ExpenseForm';
import ExpenseList from './expenses/ExpenseList';
import ExpenseStats from './statistics/ExpenseStats';
import styled from 'styled-components';
import { PageContainer, Card, Button } from '../styles/SharedStyles';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('expenses');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <Navbar>
        <Logo>ExpenseTracker</Logo>
        <NavItems>
          <UserInfo>
            <UserAvatar>{user?.name?.[0]?.toUpperCase()}</UserAvatar>
            <UserName>{user?.name}</UserName>
          </UserInfo>
          <Button $secondary onClick={handleLogout}>Logout</Button>
        </NavItems>
      </Navbar>

      <PageContainer>
        <DashboardContainer>
          <Header>
            <HeaderContent>
              <h1>Dashboard</h1>
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
                <Button onClick={() => setIsFormVisible(!isFormVisible)}>
                  {isFormVisible ? 'Close Form' : 'Add Expense'}
                </Button>
              )}
            </NavButtons>
          </Header>

          <MainContent>
            {activeView === 'expenses' && (
              <>
                {isFormVisible && (
                  <Card>
                    <ExpenseForm onSuccess={() => setIsFormVisible(false)} />
                  </Card>
                )}
                <Card>
                  <ExpenseList />
                </Card>
              </>
            )}
            {activeView === 'stats' && (
              <Card>
                <ExpenseStats />
              </Card>
            )}
          </MainContent>
        </DashboardContainer>
      </PageContainer>
    </DashboardLayout>
  );
};

const DashboardLayout = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
`;

const Navbar = styled.nav`
  background: ${props => props.theme.white};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    color: ${props => props.theme.text};
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  text-align: center;
  background: ${props => props.theme.primary};
  color: white;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default Dashboard; 