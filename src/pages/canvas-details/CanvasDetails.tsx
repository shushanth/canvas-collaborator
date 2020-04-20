import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CanvasView from './components/CanvasView';
import { rootStateModel } from '../../store/reducers/canvasReducer';
import { apiService } from '../../utils/apiService';
import { isArrayEmpty } from '../../utils';
import { CanvasDetailsStyled, CanvasPaintStyled } from './CanvasDetailsStyled';
import {
  fetchCanvas,
  clearCanvas,
  canvasFetchError,
  toggleCanvasValue,
} from '../../store/actions/action';
import {
  BaseHeaderStyled,
  BaseLoadingStyled,
  BaseErrorStyled,
} from '../../shared/BaseStyled';

const CanvasDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasContext, setCanvasContext]: any = useState({
    canvas: null,
    context: null,
  });
  const currentCanvas: any = useSelector(
    (state: rootStateModel) => state.currentCanvasDetail
  );
  const canvasError: boolean = useSelector(
    (state: rootStateModel) => state.canvasFetchError
  );
  const requestCanvas = () => {
    apiService.request({
      url: `/canvases/${params.id}/`,
      method: 'GET',
      onSuccess: (result) => {
        dispatch(fetchCanvas({ payload: result }));
      },
      onFailure: () => {
        dispatch(canvasFetchError());
      },
    });
  };
  const exitCanvas = () => {
    dispatch(clearCanvas());
  };
  const handlePaintOption = () => {
    let isDown = false;
    let canvasX = null;
    let canvasY = null;
    canvasContext.canvas.width = 1000;
    canvasContext.canvas.height = 1000;
    const start = (event: any) => {
      isDown = true;
      canvasContext.context.beginPath();
      canvasX = event.pageX - canvasContext.canvas.offsetLeft;
      canvasY = event.pageY - canvasContext.canvas.offsetTop;
      canvasContext.context.moveTo(canvasX, canvasY);
    };
    const draw = (event: any) => {
      if (isDown) {
        canvasX = event.pageX - canvasContext.canvas.offsetLeft;
        canvasY = event.pageY - canvasContext.canvas.offsetTop;
        canvasContext.context.lineTo(canvasX, canvasY);
        canvasContext.context.stroke();
        canvasContext.context.strokeStyle = '#ff1c1c';
        canvasContext.context.lineWidth = 12;
      }
    };
    const stop = () => {
      isDown = false;
      canvasContext.context.closePath();
    };
    canvasContext.canvas.addEventListener(
      'mousedown',
      (event: any) => start(event),
      false
    );
    canvasContext.canvas.addEventListener('mouseup', (event: any) => stop(), false);
    canvasContext.canvas.addEventListener(
      'mousemove',
      (event: any) => draw(event),
      false
    );
  };
  const paintCanvas = () => {
    const canvas: HTMLCanvasElement | any = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    setCanvasContext({ canvas, context });
  };
  const toggleElement = async (row: number, column: number) => {
    const result = await dispatch(toggleCanvasValue({ payload: { row, column } }));
    if (result) {
      setShowCanvas(true);
      paintCanvas();
    }
  };
  useEffect(() => {
    canvasContext.canvas && handlePaintOption();
  }, [canvasContext]);
  useEffect(() => {
    requestCanvas();
    return () => exitCanvas();
  }, []);
  return (
    <CanvasDetailsStyled>
      {canvasError && <BaseErrorStyled>something went wrong</BaseErrorStyled>}
      {isArrayEmpty(Object.keys(currentCanvas)) ? (
        <BaseLoadingStyled></BaseLoadingStyled>
      ) : (
        <Fragment>
          <BaseHeaderStyled>{currentCanvas.title}</BaseHeaderStyled>
          {showCanvas && (
            <CanvasPaintStyled>
              <canvas id="canvas"></canvas>
            </CanvasPaintStyled>
          )}
          <CanvasView
            onElementPress={(row, column) => toggleElement(row, column)}
            content={currentCanvas.content}
          ></CanvasView>
        </Fragment>
      )}
    </CanvasDetailsStyled>
  );
};

export default CanvasDetails;
