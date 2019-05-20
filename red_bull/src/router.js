import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/*导入对应的路由组件*/
import Index from './components/Index/Index'
import Goods from './components/Goods/Index'
import myIframe from './components/sub/my-iframe'//页中页


var router = new Router({
    routes: [
        {path: '/index', component: Index,meta: {keepAlive: true}},
        {path: '/', redirect: '/index'},
        {path: '/goods/:goods_id', component: Goods},
        {path: '/myIframe', component: myIframe},
    ]
});

/*router.beforeEach((to, from, next) => {
    var gl_cms_token_ = JSON.parse(localStorage.getItem('gl_cms_token') || '[]');
    //获取当前时间时间戳
    let now_time = (new Date()).getTime();
    let over_time = gl_cms_token_.over_time;
    if (gl_cms_token_.length < 1 && to.path !== '/login') {
        // 第一次进入项目
        localStorage.setItem('beforeLoginUrl', to.fullPath);// 保存用户进入的url
        next('/login');
        return false
    } else if (parseInt(now_time) >= parseInt(over_time) && to.path !== '/login') {
        //删除token
        localStorage.removeItem('gl_cms_token');
        //进入登录页面
        localStorage.setItem('beforeLoginUrl', to.fullPath);// 保存用户进入的url
        next('/login');
        return false
    }
    next()
});*/

// 把路由对象暴露出去
export default router