<template>
  <v-container>
    {{ requestData }}
    <v-form v-model="valid">
      <!-- Start Date -->
      

      <v-menu
      ref="menuStart"
      v-model="menuStart"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="requestData.start"
          label="Start Date (YYYYMMDD)"
          prepend-icon="mdi-calendar"
        
          v-bind="attrs"
          v-on="on"
          :rules="dateRules"
          required
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="selectedStartDate"
        @input="formatStartDate"
        no-title
        scrollable
      ></v-date-picker>
    </v-menu>


  



    <!-- End Date Field -->
    <v-menu
      ref="menuEnd"
      v-model="menuEnd"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="requestData.end"
          label="End Date (YYYYMMDD)"
          prepend-icon="mdi-calendar"
          
          v-bind="attrs"
          v-on="on"
          :rules="dateRules"
          required
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="selectedEndDate"
        @input="formatEndDate"
        no-title
        scrollable
      ></v-date-picker>
    </v-menu>
 <!-- Latitude Field -->
 <v-text-field
      label="Latitude"
      type="number"
      v-model="requestData.latitude"
      :rules="latLongRules"
      required
    ></v-text-field>

    <!-- Longitude Field -->
    <v-text-field
      label="Longitude"
      type="number"
      v-model="requestData.longitude"
      :rules="latLongRules"
      required
    ></v-text-field>

    <!-- Map Element -->
    <template>
  <v-container>
    <!-- Otros elementos de la UI -->

    <!-- Mapa utilizando Vue2Leaflet -->
    <l-map :zoom="zoom" :center="center" style="height: 300px" @click="onMapClick">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>

    <!-- Otros elementos de la UI -->
  </v-container>
</template>



      <!-- Precipitation (Select Parameter) -->
      <v-select
        label="Parameter"
        v-model="requestData.parameter"
        :items="parameters"
        item-text="name"
        item-value="value"
        :rules="[v => !!v || 'Please select a parameter']"
        required
      ></v-select>

      <!-- Total Precipitation (Inactive Input) -->
      <v-text-field
        label="Total Precipitation"
        v-model="totalPrecipitation"
        readonly
        disabled
      ></v-text-field>

      <!-- Suggested Crops -->
      <v-text-field
        label="Suggested Crops"
        v-model="suggestedCrops"
        readonly
        disabled
      ></v-text-field>

      <!-- Submit Button -->
      <v-btn @click="submitForm" :disabled="!valid">Generate Request</v-btn>
    </v-form>

    <!-- Chart Component -->
    <line-chart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions"></line-chart>

    <!-- Respuesta de ChatGPT -->
    <v-card-text v-if="chatGPTResponse">
      <h3>Recomendación de ChatGPT:</h3>
      <p>{{ chatGPTResponse }}</p>
    </v-card-text>


  



    




    
  </v-container>
</template>

<script>
import moment from 'moment';


import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import axios from 'axios';
import { http } from '@/services/config';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Registering the required components globally
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  
    LineChart: {
      extends: Line,
      props: ['chartData', 'chartOptions'],
      mounted() {
        this.renderChart(this.chartData, this.chartOptions);
        // Inicializar el mapa al cargar el componente
    this.initMap();
      }
    }
  },
  data() {
    return {

      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [-24, -54],
      markerLatLng: [51.504, -0.159],

      valid: false,
      selectedStartDate: null,
      selectedEndDate: null,
      menuStart: false,
      menuEnd: false,
      requestData: {
        start: '20230101',
        end: '20231231',
        latitude: '-24',
        longitude: '-54',
        parameter: ''
      },
      totalPrecipitation: 0,
      suggestedCrops: '',
      parameters: [
        { name: 'Precipitation Total (PRECTOT)', value: 'PRECTOT' },
        { name: 'Precipitación Total Corregida (PRECTOTCORR)', value: 'PRECTOTCORR' },
        { name: 'Temperature (T2M)', value: 'T2M' },
        { name: 'Wind Speed (WS2M)', value: 'WS2M' }
      ],
      dateRules: [
        v => !!v || 'Date is required',
        v => /^\d{8}$/.test(v) || 'Date must be in YYYYMMDD format'
      ],
      latLongRules: [
        v => !!v || 'Field is required',
        v => (v >= -90 && v <= 90) || 'Latitude must be between -90 and 90',
        v => (v >= -180 && v <= 180) || 'Longitude must be between -180 and 180'
      ],
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      },
      chatGPTResponse: '',
      latLongRules: [
        v => !!v || "Latitude and Longitude are required",
      ],
      map: null,
      marker: null,
    };
  },

  watch: {
    // Cada vez que cambian latitud o longitud, actualiza la posición del marcador
    'requestData.latitude': function(newVal) {
      this.updateMarkerPosition();
    },
    'requestData.longitude': function(newVal) {
      this.updateMarkerPosition();
    }
  },
  methods: {

    formatStartDate() {
      this.requestData.start = moment(this.selectedStartDate).format('YYYYMMDD');
      this.menu = false; // Cierra el menú después de seleccionar la fecha
    },
    formatEndDate() {
      this.requestData.end = moment(this.selectedEndDate).format('YYYYMMDD');
      this.menuEnd = false; // Cierra el menú después de seleccionar la fecha
    },


    async submitForm() {
      const { start, end, latitude, longitude, parameter } = this.requestData;
      const url = `https://power.larc.nasa.gov/api/temporal/hourly/point?start=${start}&end=${end}&latitude=${latitude}&longitude=${longitude}&community=ag&parameters=${parameter}&format=json&user=Magno&header=true&time-standard=lst`;

      console.log("URL:", url);
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Inspect the API response
        console.log("API Response:", data);

        // Ensure the expected structure exists
        if (data.properties.parameter[parameter]) {
          this.processData(data.properties.parameter[parameter]);

          // After processing the data, send the request to ChatGPT
          const chatGPTResponse = await this.sendToChatGPT({
            start,
            end,
            latitude,
            longitude,
            totalPrecipitation: this.totalPrecipitation,
            suggestedCrops: this.suggestedCrops
          });

          console.log('ChatGPT Response:', chatGPTResponse);
          this.chatGPTResponse = chatGPTResponse;  // Store the response for display
        } else {
          console.error("Data format incorrect or parameter missing");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async sendToChatGPT(data) {
      const prompt = `Los datos de precipitación acumulada para la ubicación (latitud: ${data.latitude}, longitud: ${data.longitude}) desde ${data.start} hasta ${data.end} muestran un total de ${data.totalPrecipitation} mm de lluvia. Los cultivos sugeridos para esta cantidad de precipitación son: ${data.suggestedCrops}. Basado en esta información, ¿qué recomendaciones puedes dar a los agricultores que desean plantar soja y maíz en esta área?`;

      try {
      
        const response = await http.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
          },
          {
          
          }
        );

        return response.data.choices[0].message.content;
      } catch (error) {
        console.error("Error sending data to ChatGPT:", error);
        return "Hubo un problema al procesar la solicitud.";
      }
    },

    processData(data) {
      if (!data || typeof data !== 'object') {
        console.error("Invalid data format");
        return;
      }

      // Get dates as labels and values of precipitation or parameter
      const labels = Object.keys(data);
      const values = Object.values(data);

      // Calculate total precipitation
      this.totalPrecipitation = values.reduce((acc, value) => acc + value, 0);

      // Suggest crops based on total precipitation
      this.suggestCrops(this.totalPrecipitation);

      // Update chart data
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Precipitation Data (PRECTOTCORR)',  // Change the label based on the parameter
            backgroundColor: '#42A5F5',
            borderColor: '#42A5F5',
            data: values,
            fill: false
          }
        ]
      };
    },

    suggestCrops(totalPrecipitation) {
      if (totalPrecipitation < 300) {
        this.suggestedCrops = "Trigo, Cítricos";
      } else if (totalPrecipitation >= 300 && totalPrecipitation < 400) {
        this.suggestedCrops = "Trigo, Soja";
      } else if (totalPrecipitation >= 400 && totalPrecipitation < 500) {
        this.suggestedCrops = "Soja, Maíz";
      } else if (totalPrecipitation >= 500 && totalPrecipitation < 600) {
        this.suggestedCrops = "Soja, Maíz, Trigo";
      } else if (totalPrecipitation >= 600 && totalPrecipitation < 800) {
        this.suggestedCrops = "Maíz, Soja, Cítricos";
      } else if (totalPrecipitation >= 800 && totalPrecipitation < 1200) {
        this.suggestedCrops = "Maíz, Soja, Arroz";
      } else {
        this.suggestedCrops = "Maíz, Soja, Arroz";
      }
    },


    updateMarkerPosition() {
      this.markerLatLng = [this.requestData.latitude, this.requestData.longitude];
    },
    
    // Manejador de eventos cuando el usuario hace clic en el mapa
    onMapClick(event) {
      // Extrae latitud y longitud de la posición del clic
      const { lat, lng } = event.latlng;

      // Actualiza las coordenadas en los campos de latitud y longitud
      this.requestData.latitude = lat;
      this.requestData.longitude = lng;
    }

  }
};
</script>

