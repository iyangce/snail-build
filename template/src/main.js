import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import fastclick from "fastclick";
import throttle from "./util/throttle";
{{#ProjectType}}
import axios from "axios";
{{/ProjectType}}
import {eventBus, eventMsg} from "./events/systemEvent"

{{#router}}
import VueRouter from "vue-router";
import router from "./router/routerInstance";
{{/router}}
import base from "assets/js/common";

{{#router}}
Vue.use(VueRouter);
{{/router}}

fastclick.attach(document.body);
//采用了节流函数
window.addEventListener('scroll', throttle(()=>{

}, 200));

{{#ProjectType}}
if (appInterFace.getHeaderInfo()) {
    var headStr = appInterFace.getHeaderInfo();
    var params = JSON.parse(headStr);
    try {
        for (var k in params) {
            axios.defaults.headers[k] = params[k];
        }
    } catch (e) {
        console.log(e)
    }
}
{{/ProjectType}}
Vue.config.errorHandler = function (err, vm) {
    console.log(err);
};


eventBus.$on(eventMsg.ROUTER_BEFORE, (to, from)=> {
    Vue.$bee.loading.show();
});
eventBus.$on(eventMsg.ROUTER_AFTER, ()=> {
    Vue.$bee.loading.hide();
});

new Vue({
{{#router}}
    router,
    {{/router}}
    template: '<App/>',
    components: {App}
}).$mount('#app');
