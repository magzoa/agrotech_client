
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    name: 'home',
    component: Home
  },
	{
    path: '/tutorial',
    name: 'tutorial',
    component: () => import(/* webpackChunkName: "tutorial" */ '../views/TutorialV.vue')
  	},
	{
    path: '/experto',
    name: 'experto',
    component: () => import(/* webpackChunkName: "experto" */ '../views/ExpertoV.vue')
  	},
	{
    path: '/pronostico',
    name: 'pronostico',
    component: () => import(/* webpackChunkName: "pronostico" */ '../views/PronosticoV.vue')
  	},
	{
    path: '/usuario',
    name: 'usuario',
    component: () => import(/* webpackChunkName: "usuario" */ '../views/UsuarioV.vue')
  	},
	{
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutV.vue')
  	},

  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

] 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

