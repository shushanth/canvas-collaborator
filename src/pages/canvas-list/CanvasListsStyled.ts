import styled from "styled-components";

import { BaseColors } from "../../shared/BaseTheme";

const { white, lightGrayWhite, blueDull } = BaseColors;

const CanvasListsStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

const CanvasListsItemsStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const CanvasListsItemStyled = styled.div`
  align-items: center;
  background: ${lightGrayWhite};
  border: 1px solid ${white};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;

  &:hover {
    background: ${blueDull};
  }
`;

const CanvasItemIdStyled = styled.p`
  flex: 0;
  font-size: 15px;
  margin: 0 20px 0 0;
`;

const CanvasItemTitleStyled = styled.p`
  flex: 1;
  font-size: 20px;
`;

export {
  CanvasListsStyled,
  CanvasListsItemsStyled,
  CanvasListsItemStyled,
  CanvasItemIdStyled,
  CanvasItemTitleStyled,
};
