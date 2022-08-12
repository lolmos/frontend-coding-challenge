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

const initialState = {};

// export const tournamentTypes = {
//   FETCH_TOURNAMENTS: "FETCH_TOURNAMENTS"
// }

const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS';

interface Actions {
  type: typeof FETCH_TOURNAMENTS | unknown;
  payload: any;
}

export default function tournaments(
  state: unknown = initialState,
  action: Actions
) {
  switch (action.type) {
    case FETCH_TOURNAMENTS:
      return state;
  }

  // return state;
}
