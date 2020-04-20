import {
  FETCH_CANVASES_LISTS,
  CANVAS_FETCH_ERROR,
} from './actionTypes';

const fetchCanvasesLists = ({ payload }: any) => ({
  type: FETCH_CANVASES_LISTS,
  payload,
});

const canvasFetchError = () => ({ type: CANVAS_FETCH_ERROR });

export { fetchCanvasesLists, canvasFetchError };
