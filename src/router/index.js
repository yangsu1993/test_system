import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import First from '@/components/text/login'
import New_user from '@/components/text/new'
import home from '@/components/text/home'
import add from '@/components/text/data_add'
import change from '@/components/text/change'
Vue.use(Router)

export default new Router({
  routes: [
    /* {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    },*/{
      path: '/',
      name: 'First',
      component: First
    },{
      path: '/register',
      name: 'New_user',
      component: New_user
    },{
      path: '/home',
      name: 'home',
      component: home
    }
    ,{
      path: '/add',
      name: 'add',
      component: add
    }  ,{
      path: '/update',
      name: 'change',
      component: change
    }
  ]
})
