import React, { useCallback, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { createTournament, fetchTournaments } from './actions/tournaments';
import Button from './components/Button';
import Container from './components/Container';
import { ControlBar } from './components/ControlBar';
import H4 from './components/H4';
import { Messages } from './components/Messages';
import { Search } from './components/Search';
import SingleTournament from './components/SingleTournament';
import { TournamentsContainer } from './components/TournamentsContainer';
import GlobalStyle from './GlobalStyle';
import { Tournament, TournamentsState } from './reducers/tournaments';
import store from './store';

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

  const handleCreate = () => {
    let newName = prompt('Tournament Name:');
    dispatch(createTournament(newName as string) as unknown as AnyAction);
  };

  const getAllTournaments = useCallback(() => {
    dispatch(fetchTournaments() as unknown as AnyAction);
  }, []);

  const handleRetry = getAllTournaments;

  useEffect(() => {
    getAllTournaments();
  }, []);

  return (
    <>
      <Container>
        <H4>FACEIT Tournaments</H4>
        <ControlBar>
          <Search />
          <Button onClick={handleCreate}>CREATE TOURNAMENT</Button>
        </ControlBar>
        {dataStatus === TOURNAMENT_DATA_STATUS.FAIL && (
          <Messages>
            <div>Something went wrong</div>
            <Button onClick={handleRetry}>RETRY</Button>
          </Messages>
        )}

        {dataStatus === TOURNAMENT_DATA_STATUS.LOADING && (
          <Messages>Loading tournaments...</Messages>
        )}

        {dataStatus === TOURNAMENT_DATA_STATUS.SUCCESS && (
          <>
            {tournamentsList.length > 0 ? (
              <TournamentsContainer>
                {tournamentsList?.map((trnmt: Tournament) => (
                  <SingleTournament tournament={trnmt} key={trnmt.id} />
                ))}
              </TournamentsContainer>
            ) : (
              <Messages>No tournaments found</Messages>
            )}
          </>
        )}
      </Container>
    </>
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
