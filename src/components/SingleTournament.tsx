import React from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import styled from 'styled-components';
import { editTournament, removeTournament } from '../actions/tournaments';
import { Tournament } from '../reducers/tournaments';
import theme from '../theme';
import Button from './Button';
import H6 from './H6';
import { StyledSingleTournament } from './StyledSingleTournament';

const SingleTournament = ({ tournament }: { tournament: Tournament }) => {
  const dispatch = useDispatch();
  const { id, name, organizer, game, participants, startDate } = tournament;
  const date = new Date(startDate).toLocaleString('en-GB');
  const handleEdit = () => {
    let newName = prompt('New tournament name', name);
    if (newName !== name) {
      dispatch(editTournament(id, newName as string) as unknown as AnyAction);
    }
  };

  const handleDelete = () => {
    let isDeleteConfirm = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (isDeleteConfirm) {
      dispatch(removeTournament(id) as unknown as AnyAction);
    }
  };

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
        <Button onClick={handleEdit}>EDIT</Button>
        <Button onClick={handleDelete}>DELETE</Button>
      </StyledButtonGroup>
    </StyledSingleTournament>
  );
};

export default SingleTournament;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing(2)};
`;
