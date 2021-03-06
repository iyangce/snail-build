import VueRouter from 'vue-router';
import routerConf from './router';
import {eventBus, eventMsg} from '../events/systemEvent';
const routes = [
  {
    path: routerConf.root,
    component(resolve) {
      // require(['components/active1'], resolve)
    }
  }
];
const router = new VueRouter({
  // mode: 'history',//IOS低版本要开启history模式
  routes,
  transitionOnLoad: false
});
router.beforeEach((to, from, next) => {
  eventBus.$emit(eventMsg.ROUTER_BEFORE, to, from);
  setTimeout(next, 200);
});
router.afterEach(() => {
  console.log('完成');
  eventBus.$emit(eventMsg.ROUTER_AFTER);
});
export default router;
