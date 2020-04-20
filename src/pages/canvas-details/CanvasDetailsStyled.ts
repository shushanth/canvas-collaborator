import styled from 'styled-components';

const CanvasDetailsStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

const CanvasPaintStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
`;

export { CanvasDetailsStyled, CanvasPaintStyled };
