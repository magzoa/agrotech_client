
<template>
  



<v-footer
      dark
      padless
      
    >
      <v-card
        flat
        tile
        class="lighten-1 white--text text-center"
        color="#757575"
      >
        <v-card-text>
          <v-btn
           v-for="(item,i) in ChapterDetails.socialLinks" :key="i.name"
            class="mx-4 white--text"
            icon
          >
            <v-btn  icon :href="item.link" target="_blank" >
                    <v-icon>{{item.icon}}</v-icon>
                  </v-btn>
                  


          </v-btn>
        </v-card-text>
  
        <v-card-text class="white--text pt-0">
    {{ChapterDetails.proyectoDetalle}}
      <strong> {{ChapterDetails.descripcion}} </strong>  
        
        
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>{{ChapterDetails.descripcion}}</strong>
        </v-card-text>
      </v-card>
    </v-footer>









</template>

<script>
  import ChapterDetails from '@/assets/data/chapterDetails.json'
 
  export default {
    data() {
      return {
        ChapterDetails:ChapterDetails
      }
    },
  }
</script>


