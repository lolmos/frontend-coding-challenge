import React from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { searchTournaments } from '../actions/tournaments';
import Input from './Input';

export const Search = () => {
  const dispatch = useDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tournamentName = e.target.value;
    setTimeout(() => {
      dispatch(searchTournaments(tournamentName) as unknown as AnyAction);
    }, 1000);
  };
  return (
    <Input
      placeholder="Search tournament ..."
      name="tournament"
      onChange={(e) => handleSearch(e)}
    />
  );
};
