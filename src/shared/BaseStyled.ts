import styled, { keyframes } from 'styled-components';

import { BaseColors } from './BaseTheme';

const { lightGray, blueCloud, colorSafron } = BaseColors;

const animateRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }  
`;

const BaseHeaderStyled = styled.h2`
  color: ${blueCloud};
  margin: 15px 0;
`;

const BaseLoadingStyled = styled.div`
  border: 2px solid ${lightGray};
  border-top: 2px solid ${blueCloud};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${animateRotate} 1s linear infinite;
`;

const BaseErrorStyled = styled.p`
  color: ${colorSafron};
`;

export { BaseHeaderStyled, BaseLoadingStyled, BaseErrorStyled };
