import { appendRemainingZeros } from '../reducers/helpers';
import {
  FETCH_CANVASES_LISTS,
  CANVAS_FETCH_ERROR,
  FETCH_CANVAS,
  CLEAR_CANVAS,
  TOGGLE_CANVAS_VALUE,
} from '../actions/actionTypes';

export interface rootAction {
  type: string;
  payload?: any;
}

export interface canvasesListModel {
  id: string;
  title: string;
}

export interface canvasDetailModel {
  id: string;
  title: string;
  content: Array<any>;
}

export interface rootStateModel {
  canvasesList: Array<canvasesListModel>;
  currentCanvasDetail: canvasDetailModel;
  canvasFetchError: boolean;
  page: number;
  pageSize: number;
}

export const rootState: rootStateModel = {
  canvasesList: [],
  currentCanvasDetail: {
    id: '',
    title: '',
    content: [],
  },
  page: 1,
  pageSize: 25,
  canvasFetchError: false,
};

const canvasReducer = (
  state = rootState,
  { type, payload }: rootAction
): rootStateModel => {
  switch (type) {
    case FETCH_CANVASES_LISTS:
      const { data } = payload;
      const canvasesList = data.map(({ id, title }: any) => ({
        id,
        title,
      }));
      return {
        ...state,
        canvasesList,
      };
    case CANVAS_FETCH_ERROR:
      return {
        ...state,
        canvasFetchError: true,
      };
    case FETCH_CANVAS:
      const { content } = payload;
      const dataBinaryContent = content.map((eachContent: number) => {
        const binaryValue = eachContent.toString(2);
        return binaryValue.length === 16
          ? binaryValue
          : appendRemainingZeros(binaryValue, 16);
      });
      const updatedCanvas = {
        ...payload,
        ...{ content: dataBinaryContent },
      };
      return {
        ...state,
        currentCanvasDetail: updatedCanvas,
      };
    case TOGGLE_CANVAS_VALUE:
      const { row, column } = payload;
      const { currentCanvasDetail } = state;
      const beforeRowContent = currentCanvasDetail.content[row];
      const newUpdatedContent =
        beforeRowContent.substring(0, column - 1) + '0' + beforeRowContent.substr(column);
      const updatedContent = currentCanvasDetail.content.map((content, index) => {
        return index === row ? newUpdatedContent : content;
      });
      return {
        ...state,
        currentCanvasDetail: {
          ...state.currentCanvasDetail,
          content: updatedContent,
        },
      };
    case CLEAR_CANVAS:
      return {
        ...state,
        currentCanvasDetail: rootState.currentCanvasDetail,
      };
    default:
      return rootState;
  }
};
export default canvasReducer;
