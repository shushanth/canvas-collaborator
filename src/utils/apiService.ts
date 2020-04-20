import axios from 'axios';

import { BASE_URL } from './constants';

export interface apiRequest {
  url?: string;
  method?: string;
  onSuccess: (result: any) => void;
  onFailure: (error: any) => void;
  pagination?: { page: number; pageSize: number };
}

const apiMiddleWare = (request: apiRequest) => {
  const pageParams =
    request.pagination &&
    Object.keys(request.pagination)
      .map((pageParam) => {
        const resultParam: any = request.pagination;
        const resultValueParams = resultParam[pageParam];
        return `${pageParam}=${resultValueParams}`;
      })
      .join('&');
  const baseUrl: string = pageParams
    ? `${BASE_URL}${request.url}?${pageParams}`
    : `${BASE_URL}${request.url}`;
  const httpRequestConfig: any = {
    ['GET']: async ({ onSuccess = request.onSuccess, onFailure = request.onFailure }) => {
      try {
        const response = await axios.get(baseUrl);
        const { data } = response;
        onSuccess(data);
      } catch (e) {
        onFailure(e);
      }
    },
    ['POST']: async ({
      onSuccess = request.onSuccess,
      onFailure = request.onFailure,
    }) => {
      try {
        const response = await axios.post(baseUrl);
        const { data } = response;
        onSuccess(data);
      } catch (e) {
        onFailure(e);
      }
    },
  };
  return httpRequestConfig[request.method || 'GET'](request);
};
export const apiService = {
  request: (serviceRequest: apiRequest) => apiMiddleWare(serviceRequest),
};
