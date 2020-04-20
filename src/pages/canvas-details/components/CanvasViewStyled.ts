import styled from 'styled-components';

import { BaseColors } from '../../../shared/BaseTheme';

const { blackFade, white, blueCloud } = BaseColors;
const GRID_COUNT = 16;
const offset = 200;
const CANVAS_WIDTH = `${GRID_COUNT * GRID_COUNT + offset}px`;
interface canvasItemModel {
  index: number;
  val: boolean;
}

const CanvasViewStyled = styled.div`
  border: 1px solid ${blueCloud};
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(${GRID_COUNT}, calc(${CANVAS_WIDTH} / ${GRID_COUNT}));
`;

const CanvasEmptyElementStyled = styled.div`
  background: ${blackFade};
  height: 0.3rem;
  position: absolute;
  width: 0.3rem;
`;

const CanvasViewElementsStyled = styled.div`
  display: grid;
`;

const CanvasViewElementStyled = styled.div<canvasItemModel>`
  ${(props: any) => `
    align-items: center;
    background: ${props.val ? blackFade : white};
    cursor: ${props.val ? 'pointer' : 'default'};
    display: flex;
    grid-column-start: ${props.index};
    grid-column-end: ${props.index + 1};
    justify-content: center;
    margin: 1px;
  `}
`;

export {
  CanvasViewStyled,
  CanvasViewElementsStyled,
  CanvasViewElementStyled,
  CanvasEmptyElementStyled,
};
