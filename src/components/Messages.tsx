import styled from 'styled-components';
import theme from '../theme';
import Button from './Button';

export const Messages = styled.div`
  width: 100%;
  margin-top: ${theme.spacing(6)};
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // justify-content: space-around;
  ${Button} {
    flex-shrink: 3;
    // background: red;
    margin-top: ${theme.spacing(4)};
  }
`;
