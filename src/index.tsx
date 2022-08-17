import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchTournaments } from './actions/tournaments';
import Button from './components/Button';
import Container from './components/Container';
import H4 from './components/H4';
import Input from './components/Input';
import SingleTournament from './components/SingleTournament';
import GlobalStyle from './GlobalStyle';
import { Tournament, TournamentsState } from './reducers/tournaments';
import store from './store';
import theme from './theme';

enum TOURNAMENT_DATA_STATUS {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

interface AppState {
  tournaments: TournamentsState;
}

const App = () => {
  // const tournaments = useSelector()

  const dispatch = useDispatch();
  const tournamentsList = useSelector(
    (state: AppState) => state.tournaments.list
  );
  const dataStatus = useSelector(
    (state: AppState) => state.tournaments.dataStatus
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tournament = e.target.value;
    console.log('toournament', tournament);
    const filteredTournaments = tournamentsList.filter(
      (tournament) => tournament.name
    );
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTournaments());
  }, []);

  useEffect(() => {
    console.log('tournaments ----------', tournamentsList);
    console.log('|data status', dataStatus);
  }, [tournamentsList, dataStatus]);

  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Input
        placeholder="Search tournament ..."
        name="tournament"
        onChange={(e) => handleSearch(e)}
      />
      <Button>CREATE TOURNAMENT</Button>
      {dataStatus === TOURNAMENT_DATA_STATUS.LOADING && (
        <>Loading tournaments...</>
      )}

      {dataStatus === TOURNAMENT_DATA_STATUS.SUCCESS &&
        tournamentsList.length > 0 && (
          <TournamentsContainer>
            {tournamentsList?.map((trnmt: Tournament) => (
              <SingleTournament tournament={trnmt} key={trnmt.id} />
            ))}
          </TournamentsContainer>
        )}
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

const TournamentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing(6)};
  margin-top: ${theme.spacing(6)};
`;
