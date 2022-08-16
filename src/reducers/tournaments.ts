import {
  FETCH_TOURNAMENTS_START,
  FETCH_TOURNAMENTS_SUCCESS,
} from '../actions/tournaments';

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: Date;
}

enum TOURNAMENT_DATA_STATUS {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface TournamentsState {
  dataStatus: TOURNAMENT_DATA_STATUS;
  list: Tournament[] | [];
}

const initialState: TournamentsState = {
  dataStatus: TOURNAMENT_DATA_STATUS.IDLE,
  list: [],
};

// export const tournamentTypes = {
//   FETCH_TOURNAMENTS: "FETCH_TOURNAMENTS"
// }

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS';

interface Actions {
  type: typeof FETCH_TOURNAMENTS | unknown;
  payload: any;
}

export default function tournaments(
  state: {
    dataStatus: TOURNAMENT_DATA_STATUS;
    list: Tournament[] | [];
  } = initialState,
  action: Actions
) {
  switch (action.type) {
    case FETCH_TOURNAMENTS_START:
      console.log('starting and setting to loading');
      return {
        ...state,
        dataStatus: TOURNAMENT_DATA_STATUS.LOADING,
      };
    case FETCH_TOURNAMENTS_SUCCESS:
      console.log('action');
      const { payload } = action;
      console.log('payload', payload);
      const tournaments = payload.tournaments;
      return {
        dataStatus: TOURNAMENT_DATA_STATUS.SUCCESS,
        list: tournaments,
      };
  }

  return state;
}
