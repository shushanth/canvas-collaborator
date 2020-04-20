import {
  FETCH_CANVASES_LISTS,
  CANVAS_FETCH_ERROR,
  FETCH_CANVAS,
  TOGGLE_CANVAS_VALUE,
  CLEAR_CANVAS,
} from './actionTypes';

const fetchCanvasesLists = ({ payload }: any) => ({
  type: FETCH_CANVASES_LISTS,
  payload,
});

const canvasFetchError = () => ({ type: CANVAS_FETCH_ERROR });

const fetchCanvas = ({ payload }: any) => ({
  type: FETCH_CANVAS,
  payload,
});

const toggleCanvasValue = ({ payload }: any) => ({
  type: TOGGLE_CANVAS_VALUE,
  payload,
});

const clearCanvas = () => ({ type: CLEAR_CANVAS });

export {
  fetchCanvasesLists,
  canvasFetchError,
  fetchCanvas,
  toggleCanvasValue,
  clearCanvas,
};
