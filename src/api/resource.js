import request from '@/utils/request'

export function fetchTree () {
  return request({
    url: '/resource/tree',
    method: 'get'
  })
}

export function addResource (data) {
  return request({
    url: '/resource/add',
    method: 'post',
    data
  })
}

export function fetchArticle (id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv (pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}


export function updateArticle (data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
