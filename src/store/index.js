
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    drawer:false,
    items:[ 
	 {text:'Tutorials',to:'/tutorial',icon:'mdi-account-circle'},
	 {text:'Expertos',to:'/experto',icon:'mdi-account-circle'},
	 {text:'Pronosticos',to:'/pronostico',icon:'mdi-account-circle'},
	 {text:'Usuarios',to:'/usuario',icon:'mdi-account-circle'},
	 {text:'Abouts',to:'/about',icon:'mdi-account-circle'},
      {text:'About',to:'/about',icon:'mdi-account-circle'},
    ] 
  },
  getters:{
    links:(state)=>{
      return state.items
    }
  },
  mutations: {
    setDrawer:(state,payload)=>(state.drawer=payload),
    toggleDrawer:state=>(state.drawer=!state.drawer)
  },
  actions: {
  },
  modules: { 
   
  }
})


