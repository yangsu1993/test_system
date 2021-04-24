import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import First from '@/components/text/login'
import New_user from '@/components/text/new'
import home from '@/components/text/home'
import add from '@/components/text/data_add'
import change from '@/components/text/change'
import axios from 'axios' //引入axios

Vue.prototype.$axios = axios;

Vue.use(Router)

const router = new Router({

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
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path == '/' || to.path == '/register' ) {
    next();
  }else {
     
    let token = localStorage.Authorization
    console.log(token);
 
    if (token === undefined || token == '') {
      alert("no token");
     // console.log("????????????????????/");
      next('/');
    } else {
      //console.log("！！！！！！！！！！！！！！！");
      next();
    }
  }
});

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });



export default router;

