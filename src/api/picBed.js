import request from '@/utils/request'

export function fetchPic (tags) {
  return request({
    url: '/picBed/queryPic/' + tags,
    method: 'get'
  })
}

export function refreshPicBed () {
  return request({
    url: '/picBed/refreshPicBed/',
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

