import request from '@/utils/request'

export function refreshBlog () {
  return request({
    url: '/blog/refreshBlog/',
    method: 'get'
  })
}

export function submit (data) {
  return request({
    url: '/blog/submit',
    method: 'post',
    data
  })
}

