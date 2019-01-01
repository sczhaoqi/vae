export default function (router) {
    //路由拦截器
    router.beforeEach((to, from, next) => {
          //进入登录页面的时候清除 token
        
        if(to.path === '/login' ){
            sessionStorage.removeItem("token", '');
            sessionStorage.removeItem("user", '');
        }
        if (to.matched.some(res => res.meta.requireAuth)) { //判断是否需要登录权限
            if (sessionStorage.getItem('token')) {// 判断是否登录
                next();
            } else { //没登录 则跳转页面
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                });
            }
        } else {
            next();
        }
    });
}