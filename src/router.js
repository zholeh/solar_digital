import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import WidgetSettings from './components/WidgetSetting/WidgetSettingContainer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/widgetSettings/:numTab',
      name: 'Widget settings',
      component: WidgetSettings,
    },
    {
      path: '/widgetSettings',
      name: 'Widget settings',
      component: WidgetSettings,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
