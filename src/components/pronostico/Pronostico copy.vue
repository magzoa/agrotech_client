
<template>
    <div>
<h3>{{pronostico}}</h3> 

    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Registro de Pronosticos</v-toolbar-title>
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
   			
    <v-text-field
           v-model="pronostico.fechaString"
           label="FechaString"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
   
   
   <v-text-field
       label="Precipitacion"
       type="number"
       v-model="pronostico.precipitacion"
       :rules="numberRules"
     ></v-text-field>
   
   
    <v-text-field
           v-model="pronostico.observacion"
           label="Observacion"
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
      El presente registro es responsable de almacenar información sobre el Pronostico.<br>
      
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
          Busqueda por nombre de Pronostico
        </template>
          
          
          </v-text-field>



             
 <v-simple-table fixed-header>
    <template v-slot:default>


      <thead class="thead-dark">
        <tr>    
			
		<th scope="col">Id</th>
		 <th scope="col">Fecha</th>
		<th scope="col">FechaString</th>
		<th scope="col">Precipitacion</th>
		<th scope="col">Observacion</th>
		        <th scope="col">Editar</th>
		          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pronostico in pronosticosBuscados" :key="pronostico.codigo">       
<td>{{pronostico.id}}</td>


 <td>{{pronostico.fecha}}</td>


<td>{{pronostico.fechaString}}</td>


<td>{{pronostico.precipitacion}}</td>


<td>{{pronostico.observacion}}</td>



          <td>
              <button @click="editarPronostico(pronostico)" class="btn"><v-icon left>mdi-pencil</v-icon></button>
              
            </td>
            <td>
              <button @click="eliminarPronostico(pronostico)" class="btn"><v-icon left>mdi-delete-forever</v-icon></button>
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
import pronosticoService from "@/services/pronosticoService.js";

import axios from 'axios'




export default {
     name: 'Pronostico',
    
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
  pronosticos: [],
        pronostico:{

id:'',
 fecha:vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
fechaString:'',
		precipitacion:0, 
observacion:'',

          
        },

date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),






        rules: {
                  required: value => !!value || 'Campo Requerido',
                  min: v => v.length >= 5 || 'Minimo 5 caracteres',
                  emailMatch: () => (`The email and password you entered don't match`),
                },
        	messages:undefined,
        
        
        
        
        
         numberRules: [
              (v) => (v >= 0) || "Valor debe ser mayor o igual a 0",
            ],
        
        
    
  }),
  created(){

       }
  ,mounted(){
      this.listarPronosticos();
    
      this.tab="two";

   
    },

  methods: {
    listarPronosticos() {
      pronosticoService
        .listarPronosticos()
        .then((resposta) => {
      //    console.log(resposta.data);
          this.pronosticos = resposta.data;
        })
  
  },
    registrar(){
    if (this.$refs.form.validate()) {
   
          if(this.pronostico.codigo===""||this.pronostico.codigo===null){
      //Eliminar para que funcione el auto incrementable
        delete this.pronostico.codigo;
          }

        console.log(this.pronostico);

          pronosticoService.save(this.pronostico,this.config).then(resposta=>{
           this.limpiar();
              alert('Guardado exitoso!!')
              this.listarPronosticos();
               this.selectedTab="second";
          });


        
      }
    },
    editarPronostico(pronostico){

    //  console.log('Editar Pronostico');
      
     //
     // console.log(this.pronostico);


     this.pronostico.id=pronostico.id;
     this.pronostico.id=pronostico.id;
      this.pronostico.fecha=pronostico.fecha;
     this.dateFormatted = this.formatDate(pronostico.fecha);
     this.date=this.formatDate(pronostico.fecha);
     this.pronostico.fechaString=pronostico.fechaString;
     this.pronostico.precipitacion=pronostico.precipitacion;
     this.pronostico.observacion=pronostico.observacion;
     

      this.tab="one";
  
       console.log(pronostico);

    },
    eliminarPronostico(pronostico){

        if(confirm('Desea remover al pronostico')){
        
        pronosticoService.delete(pronostico).then(resposta=>{
          this.listarPronosticos();
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
     
		this.pronostico={
				id:'',
				id:0,
				fecha:this.dateFormatted,
				fechaString:'',
				precipitacion:0,
				observacion:'',
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
		        this.pronostico.fecha=this.dateFormatted;
		
       
      },
    },
  computed:{
    
	computedDateFormatted () {
        return this.formatDate(this.date)
      },


    
  
  },
};
</script>




