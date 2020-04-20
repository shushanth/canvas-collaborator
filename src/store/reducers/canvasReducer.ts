import {
  FETCH_CANVASES_LISTS,
  CANVAS_FETCH_ERROR,
} from '../actions/actionTypes';

export interface rootAction {
  type: string;
  payload?: any;
}

export interface canvasesListModel {
  id: string;
  title: string;
}

export interface rootStateModel {
  canvasesList: Array<canvasesListModel>;
  canvasFetchError: boolean;
  page: number;
  pageSize: number;
}

export const rootState: rootStateModel = {
  canvasesList: [],
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
    default:
      return rootState;
  }
};
export default canvasReducer;
