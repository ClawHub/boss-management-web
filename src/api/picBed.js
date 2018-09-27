import request from '@/utils/request'

export function fetchPic (classify) {
  return request({
    url: '/picBed/queryPic/' + classify,
    method: 'get'
  })
}

