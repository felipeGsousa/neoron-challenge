import {createRouter, createWebHistory} from 'vue-router'
import NewFlight from '../views/NewFlight.vue'
import ListFlights from '../views/ListFlights.vue'
import UpdateFlight from '../views/UpdateFlight.vue'

const routes = [
    {
        path: '/new',
        name: 'new-flight',
        component: NewFlight,
    },
    {
        path: '/',
        name: 'flights',
        component: ListFlights,
    },
    {
        path: '/update/:id',
        name: 'update-flight',
        component: UpdateFlight,
        props: true,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;