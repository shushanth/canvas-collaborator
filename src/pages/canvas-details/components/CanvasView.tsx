import React, { FunctionComponent } from 'react';

import {
  CanvasViewStyled,
  CanvasViewElementsStyled,
  CanvasViewElementStyled,
  CanvasEmptyElementStyled,
} from './CanvasViewStyled';
import { uuid } from '../../../utils';

interface CanvasViewProps {
  readonly content: Array<String>;
  onElementPress: (row: number, column: number) => void;
}

const CanvasView: FunctionComponent<CanvasViewProps> = ({
  content,
  onElementPress,
}): JSX.Element => {
  const onCanvasPress = (value: boolean, row: number, column: number) => {
    value && onElementPress(row, column);
  };
  const renderInsideElements = (elementValue: any, row: number) => {
    return [...elementValue].map((val, index) => {
      const value = !!parseInt(val, 10);
      const column = index + 1;
      return (
        <CanvasViewElementStyled
          onClick={() => onCanvasPress(value, row, column)}
          key={uuid()}
          val={value}
          index={index}
        >
          {!value && <CanvasEmptyElementStyled></CanvasEmptyElementStyled>}
        </CanvasViewElementStyled>
      );
    });
  };

  const renderCanvasElements = () => {
    return content.map((contentVal, indexValue) => {
      return (
        <CanvasViewElementsStyled key={uuid()}>
          {renderInsideElements(contentVal, indexValue)}
        </CanvasViewElementsStyled>
      );
    });
  };
  return <CanvasViewStyled>{renderCanvasElements()}</CanvasViewStyled>;
};

export default CanvasView;
