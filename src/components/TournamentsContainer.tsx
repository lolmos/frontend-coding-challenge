import styled from 'styled-components';
import theme from '../theme';

export const TournamentsContainer = styled.div`
  width: 100%;
  margin-top: ${theme.spacing(6)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${theme.spacing(6)};
  grid-row-gap: ${theme.spacing(6)};
`;
