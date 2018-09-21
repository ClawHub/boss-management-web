/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const authRouter = {
  path: '/auth',
  component: Layout,
  redirect: '/auth/resource',
  name: 'Auth',
  meta: {
    title: 'Auth',
    icon: 'auth'
  },
  children: [
    {
      path: 'resource',
      component: () => import('@/views/auth/resource/index'),
      name: 'Resource',
      meta: { title: 'resource' }
    },
    {
      path: 'role',
      component: () => import('@/views/auth/role/index'),
      name: 'Role',
      meta: { title: 'role' }
    },
    {
      path: 'user',
      component: () => import('@/views/auth/user/index'),
      name: 'User',
      meta: { title: 'user' }
    }
  ]
}
export default authRouter
