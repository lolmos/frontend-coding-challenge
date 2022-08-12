import { API_TOURNAMENTS_URL } from '../constants/api';
import { Tournament } from '../reducers/tournaments';

export const getTournaments = () => {
  return fetch(API_TOURNAMENTS_URL)
    .then(handleErrors)
    .then((res) => res.json());
};

// export const fetchTournaments()

const handleErrors = (res: any) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

export const FETCH_TOURNAMENTS_BEGIN = 'FETCH_TOURNAMENTS_BEGIN';
export const FETCH_TOURNAMENTS_SUCCESS = 'FETCH_TOURNAMENTS_SUCCESS';
export const FETCH_TOURNAMENTS_FAILURE = 'FETCH_TOURNAMENTS_FAILURE';

export const fetchTournamentsBegin = () => ({
  type: FETCH_TOURNAMENTS_BEGIN,
});

export const fetchTournamentsSuccess = (tournaments: Tournament[]) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: { tournaments },
});

export const fetchTournamentsFailure = (error: any) => ({
  type: FETCH_TOURNAMENTS_FAILURE,
  payload: { error },
});
