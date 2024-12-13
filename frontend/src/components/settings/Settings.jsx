import { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Input, Select } from '../../styles/SharedStyles';

const Settings = () => {
  const [settings, setSettings] = useState({
    currency: 'USD',
    theme: 'light',
    notifications: true,
    categories: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping'],
    budgetLimit: 2000
  });

  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !settings.categories.includes(newCategory)) {
      setSettings(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category) => {
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  const handleSaveSettings = () => {
    // Save to backend/localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  return (
    <SettingsContainer>
      <h2>Settings</h2>
      
      <SettingsSection>
        <h3>General Settings</h3>
        <SettingsGroup>
          <Label>Currency</Label>
          <Select
            value={settings.currency}
            onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </Select>
        </SettingsGroup>

        <SettingsGroup>
          <Label>Theme</Label>
          <Select
            value={settings.theme}
            onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </SettingsGroup>

        <SettingsGroup>
          <Label>Monthly Budget Limit</Label>
          <Input
            type="number"
            value={settings.budgetLimit}
            onChange={(e) => setSettings(prev => ({ ...prev, budgetLimit: e.target.value }))}
          />
        </SettingsGroup>
      </SettingsSection>

      <SettingsSection>
        <h3>Category Management</h3>
        <CategoryManager>
          <CategoryInput>
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory}>Add</Button>
          </CategoryInput>
          
          <CategoryList>
            {settings.categories.map(category => (
              <CategoryItem key={category}>
                {category}
                <DeleteButton onClick={() => handleRemoveCategory(category)}>×</DeleteButton>
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoryManager>
      </SettingsSection>

      <Button onClick={handleSaveSettings}>Save Settings</Button>
    </SettingsContainer>
  );
};

const SettingsContainer = styled(Card)`
  max-width: 800px;
  margin: 2rem auto;

  h2 {
    margin-bottom: 2rem;
    color: ${props => props.theme.text};
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }
`;

const SettingsGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const CategoryManager = styled.div`
  margin-top: 1rem;
`;

const CategoryInput = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.lightGray};
  border-radius: 20px;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.danger};
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.3rem;

  &:hover {
    opacity: 0.8;
  }
`;

export default Settings; 