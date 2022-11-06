import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/ciudades',
      name: 'Ciudades',
      component: () => import('../views/CiudadesView.vue')
    },
    {
      path: '/ec',
      name: 'Estado civil',
      component: () => import('../views/EstadoCivilView.vue')
    },
    {
      path: '/sexo',
      name: 'Sexo',
      component: () => import('../views/SexoView.vue')
    },
    {
      path: '/funeraria',
      name: 'Funeraria',
      component: () => import('../views/FunerariaView.vue')
    },
    {
      path: '/entierro',
      name: 'Entierro',
      component: () => import('../views/EntierroView.vue')
    },
    {
      path: '/cobro',
      name: 'Cobro',
      component: () => import('../views/CobroView.vue')
    },
    {
      path: '/fallecidos',
      name: 'Fallecido',
      component: () => import('../views/FallecidoView.vue')
    },
    {
      path: '/planentierro',
      name: 'Plan Entierro',
      component: () => import('../views/PlanEntierroView.vue')
    }
    
  ]
})

export default router
