import request from '@/utils/request'

export function fetchPic (classify) {
  return request({
    url: '/picBed/queryPic/' + classify,
    method: 'get'
  })
}
export function upload (data) {
  return request({
    url: '/picBed/upload',
    method: 'post',
    data
  })
}

