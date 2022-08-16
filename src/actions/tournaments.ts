import { Dispatch } from 'redux';
import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';

export const getTournaments = () => {
  console.log('fetching');
  return fetch(API_TOURNAMENTS_URL)
    .then(handleErrors)
    .then((res) => res.json());
};

export const fetchTournaments = () =>
  // dispatch:Dispatch
  {
    console.log('getting to here??');
    return (dispatch: Dispatch) => {
      dispatch(fetchTournamentsStart());
      return getTournaments()
        .then((json) => {
          dispatch(fetchTournamentsSuccess(json));
        })
        .catch((err) => dispatch(fetchTournamentsFailure(err)));
    };
  };

const handleErrors = (res: any) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

export const FETCH_TOURNAMENTS_START = 'FETCH_TOURNAMENTS_START';
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS';
export const FETCH_TOURNAMENTS_FAILURE = 'FETCH_TOURNAMENTS_FAILURE';

export const DELETE_TOURNAMENT_START = 'DELETE_TOURNAMENT_START';
export const DELETE_TOURNAMENT_SUCCESS = 'DELETE_TOURNAMENT_SUCCESS';
export const DELETE_TOURNAMENT_FAILURE = 'DELETE_TOURNAMENT_FAILURE';

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
