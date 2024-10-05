

<template>
  
  <v-app-bar
      app
      
      
      dark
   
      prominent
    scroll-off-screen
      
     
    >
      <template v-slot:img="{ props }" >
        <v-img
          v-bind="props"
          gradient=""
          class="hidden-sm-and-down"
        ></v-img>
      </template>


      

        <v-toolbar-title>{{ChapterDetails.descripcion}}</v-toolbar-title>
  
        <v-spacer></v-spacer>
<template >
      <v-btn icon >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
</template>
        <template v-slot:extension>
        <v-tabs
          align-with-title
          background-color="transparent"
        >
        


        <v-tab
        
        
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        class="mr-3 google-font hidden-sm-and-down"
        style="text-transform: capitalize;pading" 
        @click="onClick($event, link)"
        data-cy="menu"
      >
        {{ link.text }}
        </v-tab>



        </v-tabs>
      </template>
  

 <v-app-bar-nav-icon class="hidden-md-and-up"
      @click="toggleDrawer"></v-app-bar-nav-icon>
  


</v-app-bar>
  
</template>

<script>

import ChapterDetails from '@/assets/data/chapterDetails.json'

  import { 
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
   data() {
      return {
        ChapterDetails:ChapterDetails

      }
    },
    components:{

    },
    computed: {
      ...mapGetters(['links'])
    },
    methods: {
      ...mapMutations(['toggleDrawer']),
      onClick (e, item) {
        e.stopPropagation()
        if (item.to || !item.href) return
        this.$vuetify.goTo(item.href)
      }
    }
  } 
</script>

