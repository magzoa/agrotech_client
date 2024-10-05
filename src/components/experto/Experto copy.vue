
<template>
    <div>
<h3>{{experto}}</h3> 

    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Registro de Expertos</v-toolbar-title>
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
           v-model="experto.nombre"
           label="Nombre"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
    <v-text-field
           v-model="experto.apellido"
           label="Apellido"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
    <v-text-field
           v-model="experto.especialidad"
           label="Especialidad"
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
      El presente registro es responsable de almacenar información sobre el Experto.<br>
      
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
          Busqueda por nombre de Experto
        </template>
          
          
          </v-text-field>



             
 <v-simple-table fixed-header>
    <template v-slot:default>


      <thead class="thead-dark">
        <tr>    
			
		<th scope="col">Id</th>
		<th scope="col">Nombre</th>
		<th scope="col">Apellido</th>
		<th scope="col">Especialidad</th>
		        <th scope="col">Editar</th>
		          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="experto in expertosBuscados" :key="experto.codigo">       
<td>{{experto.id}}</td>


<td>{{experto.nombre}}</td>


<td>{{experto.apellido}}</td>


<td>{{experto.especialidad}}</td>



          <td>
              <button @click="editarExperto(experto)" class="btn"><v-icon left>mdi-pencil</v-icon></button>
              
            </td>
            <td>
              <button @click="eliminarExperto(experto)" class="btn"><v-icon left>mdi-delete-forever</v-icon></button>
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
import expertoService from "@/services/expertoService.js";

import axios from 'axios'




export default {
     name: 'Experto',
    
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
  expertos: [],
        experto:{

id:'',
nombre:'',
apellido:'',
especialidad:'',

          
        },






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
      this.listarExpertos();
    
      this.tab="two";

   
    },

  methods: {
    listarExpertos() {
      expertoService
        .listarExpertos()
        .then((resposta) => {
      //    console.log(resposta.data);
          this.expertos = resposta.data;
        })
  
  },
    registrar(){
    if (this.$refs.form.validate()) {
   
          if(this.experto.codigo===""||this.experto.codigo===null){
      //Eliminar para que funcione el auto incrementable
        delete this.experto.codigo;
          }

        console.log(this.experto);

          expertoService.save(this.experto,this.config).then(resposta=>{
           this.limpiar();
              alert('Guardado exitoso!!')
              this.listarExpertos();
               this.selectedTab="second";
          });


        
      }
    },
    editarExperto(experto){

    //  console.log('Editar Experto');
      
     //
     // console.log(this.experto);


     this.experto.id=experto.id;
     this.experto.id=experto.id;
     this.experto.nombre=experto.nombre;
     this.experto.apellido=experto.apellido;
     this.experto.especialidad=experto.especialidad;
     

      this.tab="one";
  
       console.log(experto);

    },
    eliminarExperto(experto){

        if(confirm('Desea remover al experto')){
        
        expertoService.delete(experto).then(resposta=>{
          this.listarExpertos();
          this.errors=[]
          this.limpiar();

        }).catch(e=>{

          this.errors =e.response.data.errors

        })

        }


        


    },
    limpiar(){

     
		this.experto={
				id:'',
				id:0,
				nombre:'',
				apellido:'',
				especialidad:'',
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
    


    	
    expertosBuscados() {
          return this.expertos.filter(experto => {
            return experto.nombre.toLowerCase().includes(this.buscador.toLowerCase());
          });
    
      }
    	

    
  
  },
};
</script>




