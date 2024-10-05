
<template>
    <div>
<!-- aca comienza todo -->
  <v-row>
    <!-- Fila 1 -->
    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://eos.com/wp-content/uploads/2023/05/green-soybeans.jpg.webp"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
          <strong>07/11/2023</strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show1 = !show1">
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show1">
            <v-divider></v-divider>
            <v-card-text>
              <Strong>Cultivo De Soja: Condiciones De Crecimiento Y Cuidado</Strong><br>
El cultivo de la soja no es especialmente complicado, crece bien con la cantidad justa de sol, calor y suelo húmedo. Sin embargo, las características del cultivo de soja hacen que, en las primeras etapas de crecimiento, la soja sea vulnerable a heladas, encharcamientos, enfermedades y plagas. <br>
Así pues, los productores agrícolas deben conocer cómo cultivar soja, seleccionando cuidadosamente el momento ideal de siembra y monitorizando de cerca sus cultivos durante el proceso de crecimiento. Afortunadamente, la tecnología moderna aplicada al cultivo de la soja permite monitorizarla a distancia. Una vez que el cultivo ha madurado, cosecharlas en el momento adecuado garantizará que todos los esfuerzos del agricultor han merecido la pena.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
<!-- cultivo de trigo -->
    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://eos.com/wp-content/uploads/2023/05/wheat-crop-field.jpg.webp"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
           <strong>07/11/2023</strong>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show2 = !show2">
            <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show2">
            <v-divider></v-divider>
            <v-card-text>
              <strong>Cultivo De Trigo: Como Sembrar, Manejar Y Cosechar</strong> <br>
El cultivo del trigo depende en gran medida de cuál de las 2 variedades existentes vamos a plantar. Aunque cada una tiene sus propios requisitos de crecimiento y cuidado, conocer cómo se cultiva el trigo de forma general puedes ser útil, puesto que hay más similitudes que diferencias. <br>
Una técnica adecuada de cultivo de trigo se basa en regar en los momentos adecuados durante las distintas etapas de crecimiento, añadir fertilizantes y vigilar la maleza, las plagas y las enfermedades. Éstas y otras tareas forman parte del manejo del cultivo de trigo y pueden beneficiarse del uso de tecnología de agricultura de precisión.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
<!-- Aca empieza otro -->
    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://www.lanacion.com.py/resizer/v2/7F3QF45E5NBX3GO6CILZDXMZU4.jpeg?auth=ddc7d39cb783e2655e38f9a3a42f4ebb8a1db1f512bf8f8058ab7c8696ec037c&width=1016&smart=true"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
          <strong>07/11/2023</strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show1 = !show1">
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show1">
            <v-divider></v-divider>
            <v-card-text>
              Prefiere suelos ligeros a medios, bien drenados, no demasiado húmedos; como la mayoría de las salvias, es tolerante respecto a la acidez y a la sequía, pero no soporta las heladas. Requiere abundante sol, y no fructifica en la sombra.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>

    <!-- Fila 2 -->
    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://eos.com/wp-content/uploads/2023/09/how-to-grow-sunflower.png.webp"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
          <strong>07/11/2023</strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show1 = !show1">
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show5">
            <v-divider></v-divider>
            <v-card-text>
              <strong>Cultivo De Girasol: De La Siembra A La Cosecha</strong> <br>
El cultivo de girasoles es muy lucrativo para los agricultores debido a sus múltiples usos, desde aceite y semillas hasta alimento para el ganado. El éxito en el cultivo del girasol empieza por conocer las condiciones locales de crecimiento y plantar en el momento adecuado. Los agricultores deben proporcionar a su girasol diversos cuidados durante toda la temporada, asegurándose de que el cultivo en crecimiento tenga suficiente agua, suelo fértil y esté libres de plagas. Asimismo, es esencial realizar la cosecha del girasol a tiempo para no malgastar ni dinero ni semillas por culpa de una mala programación. <br>
Gracias a la tecnología agrícola moderna y su conocimiento agronómico, los agricultores pueden superar cualquier dificultad y promover el cultivo del girasol en todo su potencial.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>

    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://eos.com/wp-content/uploads/2023/04/rice-field.jpg.webp"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
          <strong>07/11/2023</strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show1 = !show1">
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show1">
            <v-divider></v-divider>
            <v-card-text>
              <strong>Cultivo Del Arroz: Técnicas E Impacto Medioambiental</strong> <br>
Desde el punto de vista de la seguridad alimentaria mundial, el cultivo del arroz es una actividad esencial. Sin embargo, a pesar de saber cómo crece el arroz, todavía se siguen usando prácticas de cultivo anticuadas, que resultan ineficaces tanto en términos de agricultura industrial como por su impacto medioambiental. <br>
Algunos de los costes medioambientales del cultivo de arroz son la inundación de tierras para convertirlas en arrozales, las enormes emisiones de gases de efecto invernadero y el uso excesivo de productos químicos. Afortunadamente, existen numerosos métodos de cómo cultivar arroz de forma más inteligente, rentable y sostenible.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>

    <v-col cols="12" sm="4" md="4">
      <v-card class="mx-auto" max-width="344">
        <v-img
          src="https://eos.com/wp-content/uploads/2023/03/dry-corn.jpg.webp"
          height="200px"
        ></v-img>

        <v-card-title>
          <Strong>Autor: </Strong>Juan Perez
        </v-card-title>

        <v-card-subtitle>
          <strong>07/11/2023</strong>
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show6 = show6">
            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show6">
            <v-divider></v-divider>
            <v-card-text>
              <strong>Cultivo Del Maíz: Consejos Para Tener Una Buena Cosecha</strong> <br>
              Cultivar maíz es rentable si se le proporciona suficiente espacio, calor y agua. Sin embargo, el cultivo del maíz es muy sensible al clima y a las condiciones del campo, no existe una respuesta única para todos los casos. Con la tecnología disponible hoy en día, las ventajas de sembrar maíz radican en un proceso que se puede ajustar rápidamente para obtener el máximo rendimiento, controlando diversos factores del campo, como el clima, los datos de humedad del suelo, las potenciales amenazas, incluidas la maleza y las plagas y mucho más.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-col>
  </v-row>






<!-- aca termina todo -->
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
      show1: false,  // Controla el desplegable de la primera carta
      show2: false,  // Controla el desplegable de la segunda carta
      show3: false,  // Controla el desplegable de la tercera carta
      show4: false,  // Controla el desplegable de la cuarta carta
      show5: false,  
      show6: false,
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




