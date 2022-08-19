import { Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';

const handleErrors = (res: any) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

export const FETCH_TOURNAMENTS_START = 'FETCH_TOURNAMENTS_START';
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS';
export const FETCH_TOURNAMENTS_FAILURE = 'FETCH_TOURNAMENTS_FAILURE';

export const fetchTournamentsStart = () => ({
  type: FETCH_TOURNAMENTS_START,
});

export const fetchTournamentsSuccess = (tournaments: Tournament[]) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: { tournaments },
});

export const fetchTournamentsFailure = (error: any) => ({
  type: FETCH_TOURNAMENTS_FAILURE,
  payload: { error },
});

export const getTournaments = () => {
  return fetch(API_TOURNAMENTS_URL)
    .then(handleErrors)
    .then((res) => res.json());
};

export const fetchTournaments = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchTournamentsStart());
    return getTournaments()
      .then((json) => {
        dispatch(fetchTournamentsSuccess(json));
      })
      .catch((err) => dispatch(fetchTournamentsFailure(err)));
  };
};

export const SEARCH_TOURNAMENT_START = 'SEARCH_TOURNAMENT_START';
export const SEARCH_TOURNAMENT_SUCCESS = 'SEARCH_TOURNAMENT_SUCCESS';
export const SEARCH_TOURNAMENT_FAILURE = 'SEARCH_TOURNAMENT_FAILURE';

export const searchTournamentStart = () => ({
  type: SEARCH_TOURNAMENT_START,
});

export const searchTournamentSuccess = (tournaments: Tournament[]) => ({
  type: SEARCH_TOURNAMENT_SUCCESS,
  payload: { tournaments },
});

export const searchTournamentFailure = (error: any) => ({
  type: EDIT_TOURNAMENT_FAILURE,
  payload: { error },
});

export const getSingleTournament = async (tournamentName: string) => {
  return fetch(API_TOURNAMENTS_URL + '/?name_like=' + tournamentName)
    .then(handleErrors)
    .then((res) => {
      return res.json();
    });
};

export const searchTournaments = (tournamentName: string) => {
  return (dispatch: Dispatch) => {
    dispatch(searchTournamentStart());
    return getSingleTournament(tournamentName)
      .then((json) => {
        dispatch(searchTournamentSuccess(json));
      })
      .catch((err) => dispatch(searchTournamentFailure(err)));
  };
};

export const EDIT_TOURNAMENT_OPTIMISTIC = 'EDIT_TOURNAMENT_OPTIMISTC';
export const EDIT_TOURNAMENT_START = 'EDIT_TOURNAMENT_START';
export const EDIT_TOURNAMENT_SUCCESS = 'EDIT_TOURNAMENT_SUCCESS';
export const EDIT_TOURNAMENT_FAILURE = 'EDIT_TOURNAMENT_FAILURE';

export const editTournamentOptimistic = (
  tournamentId: string,
  newTournamentName: string
) => ({
  type: EDIT_TOURNAMENT_OPTIMISTIC,
  payload: { tournamentId: tournamentId, newTournamentName: newTournamentName },
});

export const editTournamentStart = (
  tournamentId: string,
  newTournamentName: string
) => ({
  type: EDIT_TOURNAMENT_START,
});

export const editTournamentSuccess = (tournament: Tournament) => ({
  type: EDIT_TOURNAMENT_SUCCESS,
  payload: tournament,
});

export const editTournamentFailure = (error: any) => ({
  type: EDIT_TOURNAMENT_FAILURE,
  payload: { error },
});

export const patchTournament = async (
  tournamentId: string,
  newTournamentName: string
) => {
  return fetch(API_TOURNAMENTS_URL + '/' + tournamentId, {
    method: 'PATCH',
    body: JSON.stringify({
      name: newTournamentName,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleErrors)
    .then((res) => {
      console.log('the rest is ', res);
      return res.json();
    });
};

export const editTournament = (
  tournamentId: string,
  newTournamentName: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(editTournamentOptimistic(tournamentId, newTournamentName));
    // dispatch(editTournamentStart(tournamentId,newTournamentName));
    return patchTournament(tournamentId, newTournamentName)
      .then(() => {
        getTournaments().then((json) => {
          dispatch(fetchTournamentsSuccess(json));
        });
      })
      .catch((err) => dispatch(editTournamentFailure(err)));
  };
};

export const DELETE_TOURNAMENT_OPTIMISTIC = 'DELETE_TOURNAMENT_OPTIMISTIC';
export const DELETE_TOURNAMENT_START = 'DELETE_TOURNAMENT_START';
export const DELETE_TOURNAMENT_SUCCESS = 'DELETE_TOURNAMENT_SUCCESS';
export const DELETE_TOURNAMENT_FAILURE = 'DELETE_TOURNAMENT_FAILURE';

export const deleteTournamentOptimistic = (tournamentId: string) => ({
  type: DELETE_TOURNAMENT_OPTIMISTIC,
  payload: tournamentId,
});

export const deleteTournamentStart = (tournamentId: string) => ({
  type: DELETE_TOURNAMENT_START,
});

export const deleteTournamentSuccess = (tournament: Tournament) => ({
  type: DELETE_TOURNAMENT_SUCCESS,
  payload: tournament,
});

export const deleteTournamentFailure = (error: any) => ({
  type: DELETE_TOURNAMENT_FAILURE,
  payload: { error },
});

export const deleteTournament = async (tournamentId: string) => {
  return fetch(API_TOURNAMENTS_URL + '/' + tournamentId, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleErrors)
    .then((res) => {
      return res.json();
    });
};

export const removeTournament = (tournamentId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteTournamentOptimistic(tournamentId));
    // dispatch(editTournamentStart(tournamentId,newTournamentName));
    return deleteTournament(tournamentId)
      .then(() => {
        getTournaments().then((json) => {
          dispatch(fetchTournamentsSuccess(json));
        });
      })
      .catch((err) => dispatch(deleteTournamentFailure(err)));
  };
};

export const ADD_TOURNAMENT_OPTIMISTIC = 'ADD_TOURNAMENT_OPTIMISTIC';
export const ADD_TOURNAMENT_START = 'ADD_TOURNAMENT_START';
export const ADD_TOURNAMENT_SUCCESS = 'ADD_TOURNAMENT_SUCCESS';
export const ADD_TOURNAMENT_FAILURE = 'ADD_TOURNAMENT_FAILURE';

export const addTournamentOptimistic = (newTournamentName: string) => ({
  type: ADD_TOURNAMENT_OPTIMISTIC,
  payload: newTournamentName,
});

export const addTournamentStart = (newTournamentName: string) => ({
  type: ADD_TOURNAMENT_START,
});

export const addTournamentSuccess = (tournament: Tournament) => ({
  type: ADD_TOURNAMENT_SUCCESS,
  payload: tournament,
});

export const addTournamentFailure = (error: any) => ({
  type: ADD_TOURNAMENT_FAILURE,
  payload: { error },
});

export const addTournament = async (newTournamentName: string) => {
  return fetch(API_TOURNAMENTS_URL, {
    method: 'POST',
    body: JSON.stringify({
      name: newTournamentName,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleErrors)
    .then((res) => {
      return res.json();
    });
};

export const createTournament = (newTournamentName: string) => {
  return (dispatch: Dispatch) => {
    dispatch(addTournamentStart(newTournamentName));
    return addTournament(newTournamentName)
      .then(() => {
        getTournaments().then((json) => {
          dispatch(fetchTournamentsSuccess(json));
        });
      })
      .catch((err) => dispatch(addTournamentFailure(err)));
  };
};
