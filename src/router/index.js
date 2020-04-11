import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/home/home'
import VideoUpload from '../manage/videoUpload'
import VideoUpdata from '../manage/videoUpdata'
import ElegantUpdata from '../manage/elegantUpdata'
import ElegantUpload from '../manage/elegantUpload'
import ElegantUpdataList from '../manage/elegantUpdataList'
import VideoUpdataList from '../manage/videoUpdataList'

import elegantDetail from '../components/home/elegantDetail/elegantDetail'
import videoDetail from '../components/home/videoDetail/videoDetail'
import Elegants from '../components/home/elegant/elegant'
import Videos from '../components/home/videos/video'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'elegant',
          name: 'home',
          component: Elegants
        },
        {
          path:'details',
          name:'details',
          component:elegantDetail
        },
        {
          path:'videos',
          name:'videos',
          component:Videos
        },
        {
          path:'videoDetails',
          name:'videoDetails',
          component:videoDetail
        }
      ]
    },
    {
      path: '/videoUpload',
      name: 'videoUpload',
      component: VideoUpload,
    },
    {
      path: '/videoUpdata',
      name: 'videoUpdata',
      component: VideoUpdata,
    },
    {
      path: '/elegantUpdata',
      name: 'elegantUpdata',
      component: ElegantUpdata,
    },
    {
      path: '/elegantUpdataList',
      name: 'elegantUpdataList',
      component: ElegantUpdataList,
    },
    {
      path: '/videoUpdataList',
      name: 'videoUpdataList',
      component: VideoUpdataList,
    },
    {
      path: '/elegantUpload',
      name: 'elegantUpload',
      component: ElegantUpload,
    },
  ]
})

export default router
