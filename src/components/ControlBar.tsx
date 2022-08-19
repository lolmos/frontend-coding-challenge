import styled from 'styled-components';
import theme from '../theme';

export const ControlBar = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  // flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing(6)};
  margin-top: ${theme.spacing(6)};
`;
