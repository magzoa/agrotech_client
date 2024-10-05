

<template>

    <v-app-bar
      app
      absolute
      color="#6A76AB"
      dark
   
      prominent
      src="@/assets/img/logo.png"
      
      
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>agrotech</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

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
      >
        {{ link.text }}
        </v-tab>



        </v-tabs>
      </template>


      <CoreView></CoreView>
    </v-app-bar>

</template>


<script>

import CoreView from '@/components/common/View'
import ChapterDetails from '@/assets/data/chapterDetails.json'
 
  import { 
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
   data() {
      return {
        ChapterDetails:ChapterDetails,
        drawer:false
      }
    },
    components:{
      CoreView
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

