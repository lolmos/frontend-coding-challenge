import React from 'react';
import styled from 'styled-components';
import { Tournament } from '../reducers/tournaments';
import theme from '../theme';
import Button from './Button';
import H6 from './H6';
import { StyledSingleTournament } from './StyledSingleTournament';

const SingleTournament = ({ tournament }: { tournament: Tournament }) => {
  const { id, name, organizer, game, participants, startDate } = tournament;
  const date = new Date(startDate).toLocaleString('en-GB');
  return (
    <StyledSingleTournament>
      <H6>{name}</H6>
      <div>Organizer: {organizer}</div>
      <div>Game: {game}</div>

      <div>
        Participants: {participants.current}/{participants.max}
      </div>
      <div>Start: {date}</div>
      <br />
      <StyledButtonGroup>
        <Button>Edit</Button>
        <Button>DELETE</Button>
      </StyledButtonGroup>
    </StyledSingleTournament>
  );
};

export default SingleTournament;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
`;
