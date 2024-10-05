
<template>
    <div>
<h3>{{tutorial}}</h3> 

    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Registro de Tutorials</v-toolbar-title>
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
           v-model="tutorial.titulo"
           label="Titulo"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
    <v-text-field
           v-model="tutorial.texto"
           label="Texto"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
    <v-text-field
           v-model="tutorial.imagen"
           label="Imagen"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
   
   
   		 <template>
               <v-text-field
                 v-model="dateFormatted"
                 label="Date"
                 hint="DD-MM-YYYY format"
                 persistent-hint
                 prepend-icon="mdi-calendar"      
                 @blur="date = parseDate(dateFormatted)" 
               ></v-text-field>
             </template>
             <v-date-picker
               v-model="date"
               no-title
               @input="menu1 = false"
             ></v-date-picker>
             <!-- <p>Date in ISO format: <strong>{{ date }}</strong></p>
    <p>Date in ISO format: <strong>{{dateFormatted}}</strong></p> -->
   			
   

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
      El presente registro es responsable de almacenar información sobre el Tutorial.<br>
      
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
          Busqueda por nombre de Tutorial
        </template>
          
          
          </v-text-field>



             
 <v-simple-table fixed-header>
    <template v-slot:default>


      <thead class="thead-dark">
        <tr>    
			
		<th scope="col">Id</th>
		<th scope="col">Titulo</th>
		<th scope="col">Texto</th>
		<th scope="col">Imagen</th>
		 <th scope="col">Fecha</th>
		        <th scope="col">Editar</th>
		          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tutorial in tutorialsBuscados" :key="tutorial.codigo">       
<td>{{tutorial.id}}</td>


<td>{{tutorial.titulo}}</td>


<td>{{tutorial.texto}}</td>


<td>{{tutorial.imagen}}</td>


 <td>{{tutorial.fecha}}</td>



          <td>
              <button @click="editarTutorial(tutorial)" class="btn"><v-icon left>mdi-pencil</v-icon></button>
              
            </td>
            <td>
              <button @click="eliminarTutorial(tutorial)" class="btn"><v-icon left>mdi-delete-forever</v-icon></button>
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
import tutorialService from "@/services/tutorialService.js";

import axios from 'axios'




export default {
     name: 'Tutorial',
    
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
  tutorials: [],
        tutorial:{

id:'',
titulo:'',
texto:'',
imagen:'',
 fecha:vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),

          
        },




date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),



        rules: {
                  required: value => !!value || 'Campo Requerido',
                  min: v => v.length >= 5 || 'Minimo 5 caracteres',
                  emailMatch: () => (`The email and password you entered don't match`),
                },
        	messages:undefined,
        
        
        
         textRules: [
              (v) => !!v || "Campo es requerido",
              (v) => (v && v.length >= 3) || "Debe contener al menos 3 caracteres",
            ],
        
         textRules: [
              (v) => !!v || "Campo es requerido",
              (v) => (v && v.length >= 3) || "Debe contener al menos 3 caracteres",
            ],
        
        
        
    
  }),
  created(){

       }
  ,mounted(){
      this.listarTutorials();
    
      this.tab="two";

   
    },

  methods: {
    listarTutorials() {
      tutorialService
        .listarTutorials()
        .then((resposta) => {
      //    console.log(resposta.data);
          this.tutorials = resposta.data;
        })
  
  },
    registrar(){
    if (this.$refs.form.validate()) {
   
          if(this.tutorial.codigo===""||this.tutorial.codigo===null){
      //Eliminar para que funcione el auto incrementable
        delete this.tutorial.codigo;
          }

        console.log(this.tutorial);

          tutorialService.save(this.tutorial,this.config).then(resposta=>{
           this.limpiar();
              alert('Guardado exitoso!!')
              this.listarTutorials();
               this.selectedTab="second";
          });


        
      }
    },
    editarTutorial(tutorial){

    //  console.log('Editar Tutorial');
      
     //
     // console.log(this.tutorial);


     this.tutorial.id=tutorial.id;
     this.tutorial.id=tutorial.id;
     this.tutorial.titulo=tutorial.titulo;
     this.tutorial.texto=tutorial.texto;
     this.tutorial.imagen=tutorial.imagen;
      this.tutorial.fecha=tutorial.fecha;
     this.dateFormatted = this.formatDate(tutorial.fecha);
     this.date=this.formatDate(tutorial.fecha);
     

      this.tab="one";
  
       console.log(tutorial);

    },
    eliminarTutorial(tutorial){

        if(confirm('Desea remover al tutorial')){
        
        tutorialService.delete(tutorial).then(resposta=>{
          this.listarTutorials();
          this.errors=[]
          this.limpiar();

        }).catch(e=>{

          this.errors =e.response.data.errors

        })

        }


        


    },
    limpiar(){

     this.date=(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
           this.dateFormatted=this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
     
		this.tutorial={
				id:'',
				id:0,
				titulo:'',
				texto:'',
				imagen:'',
				fecha:this.dateFormatted,
	}

        
    },
		formatDate (date) {
		        if (!date) return null
		
		        const [year, month, day] = date.split('-')
		        return `${day}-${month}-${year}`
		      },
		      parseDate (date) {
		        if (!date) return null
		
		        const [year, month, day] = date.split('-')
		        return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
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
        
				this.dateFormatted = this.formatDate(this.date)
		        this.tutorial.fecha=this.dateFormatted;
		
       
      },
    },
  computed:{
    
	computedDateFormatted () {
        return this.formatDate(this.date)
      },


    	
    tutorialsBuscados() {
          return this.tutorials.filter(tutorial => {
            return tutorial.titulo.toLowerCase().includes(this.buscador.toLowerCase());
          });
    
      }
    	
   
    
  
  },
};
</script>




