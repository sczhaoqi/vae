import StudyIndex from '../components/study/Index.vue';
import Demo1 from '../components/study/Demo1.vue';
import Demo2 from '../components/study/Demo2.vue';
import Demo3 from '../components/study/Demo3.vue';
import Demo4 from '../components/study/Demo4.vue';
import Details from '../components/study/Details.vue';
export default function (router) {
    router.addRoutes(
        [
            { 
                path: '/study', component: StudyIndex, // 需要登录才能进入的页面可以增加一个meta属性
                meta: { requireAuth: true },
                children: [
                    { path: '', component: Demo1 },
                    { path: 'demo1', component: Demo1 },
                    { path: 'demo2', component: Demo2 },
                    { path: 'demo3', component: Demo3 },
                    { path: 'demo4', component: Demo4 },
                    { path: 'details', component: Details },
                    { path: 'details/:gid', component: Details }]},
        ]);
} 