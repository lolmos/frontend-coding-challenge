import { AnyAction } from 'redux';
import {
  DELETE_TOURNAMENT_OPTIMISTIC,
  EDIT_TOURNAMENT_FAILURE,
  EDIT_TOURNAMENT_OPTIMISTIC,
  FETCH_TOURNAMENTS_FAILURE,
  FETCH_TOURNAMENTS_START,
  FETCH_TOURNAMENTS_SUCCESS,
  SEARCH_TOURNAMENT_FAILURE,
  SEARCH_TOURNAMENT_START,
  SEARCH_TOURNAMENT_SUCCESS,
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

export default function tournaments(
  state: {
    dataStatus: TOURNAMENT_DATA_STATUS;
    list: Tournament[] | [];
  } = initialState,
  action: AnyAction
) {
  let listSnapshot = [...state.list];
  let tournamentToChangeIndex: number;
  let updatedListSnapshot: Tournament[];
  switch (action.type) {
    case FETCH_TOURNAMENTS_START || SEARCH_TOURNAMENT_START:
      return {
        ...state,
        dataStatus: TOURNAMENT_DATA_STATUS.LOADING,
      };
    case FETCH_TOURNAMENTS_FAILURE ||
      SEARCH_TOURNAMENT_FAILURE ||
      EDIT_TOURNAMENT_FAILURE:
      return {
        ...state,
        dataStatus: TOURNAMENT_DATA_STATUS.FAIL,
      };
    case FETCH_TOURNAMENTS_SUCCESS:
      let fetchedTournaments = action?.payload.tournaments;
      return {
        dataStatus: TOURNAMENT_DATA_STATUS.SUCCESS,
        list: fetchedTournaments,
      };
    case SEARCH_TOURNAMENT_SUCCESS:
      let searchedTournaments = action.payload.tournaments;
      return {
        dataStatus: TOURNAMENT_DATA_STATUS.SUCCESS,
        list: searchedTournaments,
      };
    case EDIT_TOURNAMENT_OPTIMISTIC:
      tournamentToChangeIndex = listSnapshot.findIndex(
        (tournament) => tournament.id === action.payload.tournamentId
      );
      listSnapshot[tournamentToChangeIndex].name =
        action.payload.newTournamentName;
      return {
        dataStatus: TOURNAMENT_DATA_STATUS.SUCCESS,
        list: listSnapshot,
      };

    case DELETE_TOURNAMENT_OPTIMISTIC:
      tournamentToChangeIndex = listSnapshot.findIndex(
        (tournament) => tournament.id === action.payload.tournamentId
      );
      updatedListSnapshot = listSnapshot.splice(tournamentToChangeIndex, 1);
      return {
        dataStatus: TOURNAMENT_DATA_STATUS.SUCCESS,
        list: updatedListSnapshot,
      };
  }
  return state;
}
