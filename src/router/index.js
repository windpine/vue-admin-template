import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import UserSpace from '../views/UserSpace/index'
import DataDetail from '../views/UserSpace/DataDetail'
import FrontLayout from '../views/FrontPage/FrontLayout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/welcome',
    component: FrontLayout,
    redirect: '/welcome/userspace',
    name: 'FrontLayout',
    hidden: true,
    children: [
      {
        path: 'userspace',
        name: 'UserSpace',
        component: UserSpace
      },
      {
        path: 'datadetail',
        name: 'DataDetail',
        component: DataDetail
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree', roles: ['ADMIN'] }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  {
    path: '/datafile',
    component: Layout,
    redirect: '/datafile/index',
    meta: {
      title: 'DataFile',
      icon: 'data'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/datafile/index'),
        name: 'AllFile',
        meta: {
          title: 'AllFile'
        }
      },
      {
        path: 'upload',
        component: () => import('@/views/datafile/upload'),
        name: 'UploadFile',
        meta: {
          title: 'UploadFile'
        }
      },
      {
        path: 'test',
        component: () => import('@/views/datafile/test'),
        name: 'Test',
        meta: {
          title: 'Test',
          roles: ['ADMIN']
        }
      },
      {
        path: 'pdf',
        component: () => import('@/views/datafile/pdffile'),
        name: 'PdfFile',
        meta: {
          title: 'PdfFile'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    name: 'AdminCenter',
    meta: { title: 'AdminCenter', icon: 'example', roles: ['ADMIN'] },
    children: [
      {
        path: 'user',
        component: () => import('@/views/AdminCenter/user'),
        name: 'UserCenter',
        meta: {
          title: 'UserCenter'
        }
      },
      {
        path: 'resource',
        component: () => import('@/views/AdminCenter/resource'),
        name: 'ResourceCenter',
        meta: {
          title: 'ResourceCenter'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/AdminCenter/role'),
        name: 'RoleCenter',
        meta: {
          title: 'RoleCenter'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
