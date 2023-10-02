import request from '@/config/axios'
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
