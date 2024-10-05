
<template>
    <div>
<h3>{{about}}</h3> 

    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Registro de Abouts</v-toolbar-title>
      </v-toolbar>
      <v-tabs v-model="tab">
       
       <v-tab href="#one">
          <v-icon left>mdi-account</v-icon>
          Registro
        </v-tab>
        
        <v-tab href="#two" >
          <v-icon left>mdi-dns</v-icon>
          Listado
        </v-tab>
    </v-tabs>
         <v-tabs-items :value="tab"> 
          <!-- <div :value="tab"> -->
        <v-tab-item value="one">
          <v-card flat>
            <v-card-text>
               <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
   
   
    <v-text-field
           v-model="about.descripcion"
           label="Descripcion"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
   

 <v-row no-gutters>
      
      <v-col>
      </v-col>

      <v-col order="last">
        
      </v-col>
     
    </v-row>


      
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="registrar"
      >
        Registrar
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset();"
      >
        Cancelar
      </v-btn>
  
    </v-form> 
            </v-card-text>


           <v-card-text>

            <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
      
    >
      El presente registro es responsable de almacenar información sobre el About.<br>
      
    </v-alert>

          </v-card-text>




          </v-card>
        </v-tab-item>

   <!--  fin item 1-->
<v-tab-item value="two">
          <v-card flat>
            <v-card-text>

<v-text-field
            v-model="buscador" 
            placeholder="Ejemplo: Juan Perez"
            outlined
           
          >
          <template v-slot:label>
          <v-icon style="vertical-align: middle">
            mdi-magnify
          </v-icon>
          Busqueda por nombre de About
        </template>
          
          
          </v-text-field>



             
 <v-simple-table fixed-header>
    <template v-slot:default>


      <thead class="thead-dark">
        <tr>    
			
		<th scope="col">Id</th>
		<th scope="col">Descripcion</th>
		        <th scope="col">Editar</th>
		          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="about in aboutsBuscados" :key="about.codigo">       
<td>{{about.id}}</td>


<td>{{about.descripcion}}</td>



          <td>
              <button @click="editarAbout(about)" class="btn"><v-icon left>mdi-pencil</v-icon></button>
              
            </td>
            <td>
              <button @click="eliminarAbout(about)" class="btn"><v-icon left>mdi-delete-forever</v-icon></button>
            </td>
     
 </tr>
      </tbody>
    </template>
  </v-simple-table>

            </v-card-text>
          </v-card>
        </v-tab-item>

        <!--  fin item 2-->
     

      </v-tabs-items> 

          <!-- </div> -->
    </v-card>
  </div>
</template>


<script>
import aboutService from "@/services/aboutService.js";

import axios from 'axios'




export default {
     name: 'About',
    
  components: {
   
  },
  computed: {
    tab: {
      set (tab) {
        this.$router.replace({ query: { ...this.$route.query, tab } })
      },
      get () {
        return this.$route.query.tab
      }
    }
  },
    data: vm => ({
    valid: true,
    tab:"",
    buscador:'',
showPass: false,
  abouts: [],
        about:{

id:'',
descripcion:'',

          
        },




        rules: {
                  required: value => !!value || 'Campo Requerido',
                  min: v => v.length >= 5 || 'Minimo 5 caracteres',
                  emailMatch: () => (`The email and password you entered don't match`),
                },
        	messages:undefined,
        
        
        
        
    
  }),
  created(){

       }
  ,mounted(){
      this.listarAbouts();
    
      this.tab="two";

   
    },

  methods: {
    listarAbouts() {
      aboutService
        .listarAbouts()
        .then((resposta) => {
      //    console.log(resposta.data);
          this.abouts = resposta.data;
        })
  
  },
    registrar(){
    if (this.$refs.form.validate()) {
   
          if(this.about.codigo===""||this.about.codigo===null){
      //Eliminar para que funcione el auto incrementable
        delete this.about.codigo;
          }

        console.log(this.about);

          aboutService.save(this.about,this.config).then(resposta=>{
           this.limpiar();
              alert('Guardado exitoso!!')
              this.listarAbouts();
               this.selectedTab="second";
          });


        
      }
    },
    editarAbout(about){

    //  console.log('Editar About');
      
     //
     // console.log(this.about);


     this.about.id=about.id;
     this.about.id=about.id;
     this.about.descripcion=about.descripcion;
     

      this.tab="one";
  
       console.log(about);

    },
    eliminarAbout(about){

        if(confirm('Desea remover al about')){
        
        aboutService.delete(about).then(resposta=>{
          this.listarAbouts();
          this.errors=[]
          this.limpiar();

        }).catch(e=>{

          this.errors =e.response.data.errors

        })

        }


        


    },
    limpiar(){

     
		this.about={
				id:'',
				id:0,
				descripcion:'',
	}

        
    },
		
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
    //  this.$refs.form.reset();
      this.limpiar();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },

    watch: {
      date (val) {
        
		
       
      },
    },
  computed:{
    


    
  
  },
};
</script>




