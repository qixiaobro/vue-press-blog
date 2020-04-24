import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../components/index.vue'),
            children: [
                {
                    path: 'tmTodoListView/:id',
                    name: 'tmTodoListView',
                    component: () => import('../components/tmTodoListView.vue')
                }
            ]
        }
    ]
})

