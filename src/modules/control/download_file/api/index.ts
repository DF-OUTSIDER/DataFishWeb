import request from '@/config/axios'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  // todo 待处理
  //InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError
} from 'axios'

import { DownloadFileType } from './types'

export const downByFullpath = (
  storageConfigId: number,
  fullpath: string
): Promise<IResponse<DownloadFileType>> => {
  return request.get({
    url: '/downloadFile/download/by-fullpath',
    params: { storageConfigId, fullpath }
  })
}

export const downByCode = (code: string): Promise<IResponse> => {
  return request.get({
    url: '/downloadFile/download/' + code
  })
}

export const playRemoteMedia = (url: string): Promise<IResponse> => {
  return axios.get(url).then((res) => res.data)
  //return request.get({ url: url })
}
