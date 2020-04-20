import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiService } from '../../utils/apiService';
import { rootStateModel } from '../../store/reducers/canvasReducer';
import { isArrayEmpty, uuid } from '../../utils';
import { fetchCanvasesLists, canvasFetchError } from '../../store/actions/action';
import {
  BaseHeaderStyled,
  BaseLoadingStyled,
  BaseErrorStyled,
} from '../../shared/BaseStyled';
import {
  CanvasListsStyled,
  CanvasListsItemsStyled,
  CanvasListsItemStyled,
  CanvasItemIdStyled,
  CanvasItemTitleStyled,
} from './CanvasListsStyled';
interface canvasModel {
  readonly title: String;
  readonly id: String;
}

const CanvasLists = (): JSX.Element => {
  const dispatch = useDispatch();
  const canvasesList = useSelector((state: rootStateModel) => state.canvasesList);
  const canvasError: boolean = useSelector(
    (state: rootStateModel) => state.canvasFetchError
  );
  const page: number = useSelector((state: rootStateModel) => state.page);
  const pageSize: number = useSelector((state: rootStateModel) => state.pageSize);

  const requestCanvasesLists = () => {
    apiService.request({
      url: '/canvases',
      method: 'GET',
      pagination: {
        page,
        pageSize,
      },
      onSuccess: (result) => {
        dispatch(fetchCanvasesLists({ payload: result }));
      },
      onFailure: () => {
        dispatch(canvasFetchError());
      },
    });
  };

  useEffect(() => {
    requestCanvasesLists();
  }, []);

  return (
    <CanvasListsStyled>
      {canvasError && <BaseErrorStyled>Something went wrong</BaseErrorStyled>}
      <BaseHeaderStyled>Canvases</BaseHeaderStyled>
      {isArrayEmpty(canvasesList) ? (
        <BaseLoadingStyled></BaseLoadingStyled>
      ) : (
        <CanvasListsItemsStyled>
          {canvasesList.map(({ title, id }: canvasModel) => {
            return (
              <Link key={uuid()} to={`/details/${id}`}>
                <CanvasListsItemStyled>
                  <CanvasItemIdStyled>{id}</CanvasItemIdStyled>
                  <CanvasItemTitleStyled>{title}</CanvasItemTitleStyled>
                </CanvasListsItemStyled>
              </Link>
            );
          })}
        </CanvasListsItemsStyled>
      )}
    </CanvasListsStyled>
  );
};

export default CanvasLists;
