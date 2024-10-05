
<template>
    <div>
<h3>{{usuario}}</h3> 

    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Registro de Usuarios</v-toolbar-title>
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
           v-model="usuario.nombre"
           label="Nombre"
           :counter="3"
           :rules="textRules"
           required
         ></v-text-field>
   
   
    <v-text-field
           v-model="usuario.apellido"
           label="Apellido"
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
   			
   
   
   		<v-text-field
               v-model="usuario.pass"
               :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
               :rules="[rules.required, rules.min]"
               :type="showPass ? 'text' : 'password'"
               name="input-pass"
               label="Contraseña"
               hint="Minimo 5 caracteres"
               counter
               @click:append="showPass = !showPass"
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
      El presente registro es responsable de almacenar información sobre el Usuario.<br>
      
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
          Busqueda por nombre de Usuario
        </template>
          
          
          </v-text-field>



             
 <v-simple-table fixed-header>
    <template v-slot:default>


      <thead class="thead-dark">
        <tr>    
			
		<th scope="col">Id</th>
		<th scope="col">Nombre</th>
		<th scope="col">Apellido</th>
		 <th scope="col">Fecha_registro</th>
		        <th scope="col">Editar</th>
		          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuariosBuscados" :key="usuario.codigo">       
<td>{{usuario.id}}</td>


<td>{{usuario.nombre}}</td>


<td>{{usuario.apellido}}</td>


 <td>{{usuario.fecha_registro}}</td>





          <td>
              <button @click="editarUsuario(usuario)" class="btn"><v-icon left>mdi-pencil</v-icon></button>
              
            </td>
            <td>
              <button @click="eliminarUsuario(usuario)" class="btn"><v-icon left>mdi-delete-forever</v-icon></button>
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
import usuarioService from "@/services/usuarioService.js";

import axios from 'axios'




export default {
     name: 'Usuario',
    
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
  usuarios: [],
        usuario:{

id:'',
nombre:'',
apellido:'',
 fecha_registro:vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
pass:'',

          
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
        
        
        
        
    
  }),
  created(){

       }
  ,mounted(){
      this.listarUsuarios();
    
      this.tab="two";

   
    },

  methods: {
    listarUsuarios() {
      usuarioService
        .listarUsuarios()
        .then((resposta) => {
      //    console.log(resposta.data);
          this.usuarios = resposta.data;
        })
  
  },
    registrar(){
    if (this.$refs.form.validate()) {
   
          if(this.usuario.codigo===""||this.usuario.codigo===null){
      //Eliminar para que funcione el auto incrementable
        delete this.usuario.codigo;
          }

        console.log(this.usuario);

          usuarioService.save(this.usuario,this.config).then(resposta=>{
           this.limpiar();
              alert('Guardado exitoso!!')
              this.listarUsuarios();
               this.selectedTab="second";
          });


        
      }
    },
    editarUsuario(usuario){

    //  console.log('Editar Usuario');
      
     //
     // console.log(this.usuario);


     this.usuario.id=usuario.id;
     this.usuario.id=usuario.id;
     this.usuario.nombre=usuario.nombre;
     this.usuario.apellido=usuario.apellido;
      this.usuario.fecha_registro=usuario.fecha_registro;
     this.dateFormatted = this.formatDate(usuario.fecha_registro);
     this.date=this.formatDate(usuario.fecha_registro);
     this.usuario.pass=usuario.pass;
     

      this.tab="one";
  
       console.log(usuario);

    },
    eliminarUsuario(usuario){

        if(confirm('Desea remover al usuario')){
        
        usuarioService.delete(usuario).then(resposta=>{
          this.listarUsuarios();
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
     
		this.usuario={
				id:'',
				id:0,
				nombre:'',
				apellido:'',
				fecha_registro:this.dateFormatted,
				pass:'',
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
		        this.usuario.fecha_registro=this.dateFormatted;
		
       
      },
    },
  computed:{
    
	computedDateFormatted () {
        return this.formatDate(this.date)
      },


    	
    usuariosBuscados() {
          return this.usuarios.filter(usuario => {
            return usuario.nombre.toLowerCase().includes(this.buscador.toLowerCase());
          });
    
      }
    
  
  },
};
</script>




