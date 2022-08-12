import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Button from './components/Button';
import Container from './components/Container';
import H4 from './components/H4';
import Input from './components/Input';
import GlobalStyle from './GlobalStyle';
import store from './store';

const App = () => {
  // const tournaments = useSelector()
  const handleSearch = (e: React.MouseEvent<HTMLInputElement>) => {
    const tournament = e.target;
    console.log('toournament', tournament);
  };
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Input placeholder="Search tournament ..." name="tournament" />
      <Button>CREATE TOURNAMENT</Button>
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
