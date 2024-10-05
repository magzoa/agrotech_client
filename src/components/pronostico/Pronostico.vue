<template>
  <v-container>

    {{ requestData }}
    <v-form v-model="valid">
      <!-- Start Date -->
      <v-text-field
        label="Start Date (YYYYMMDD)"
        v-model="requestData.start"
        :rules="dateRules"
        required
      ></v-text-field>

      <!-- End Date -->
      <v-text-field
        label="End Date (YYYYMMDD)"
        v-model="requestData.end"
        :rules="dateRules"
        required
      ></v-text-field>

      <!-- Latitude -->
      <v-text-field
        label="Latitude"
        type="number"
        v-model="requestData.latitude"
        :rules="latLongRules"
        required
      ></v-text-field>

      <!-- Longitude -->
      <v-text-field
        label="Longitude"
        type="number"
        v-model="requestData.longitude"
        :rules="latLongRules"
        required
      ></v-text-field>

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

      <!-- Submit Button -->
      <v-btn @click="submitForm" :disabled="!valid">Generate Request</v-btn>
    </v-form>

    <!-- Chart Component -->
    <line-chart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions"></line-chart>
  </v-container>
</template>

<script>
// Importing required components from vue-chartjs and chart.js
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Registering the required components globally
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  components: {
    LineChart: {
      extends: Line,
      props: ['chartData', 'chartOptions'],
      mounted() {
        this.renderChart(this.chartData, this.chartOptions);
      }
    }
  },
  data() {
    return {
      valid: false,
      requestData: {
        start: '20200101',
        end: '20210101',
        latitude: '-24',
        longitude: '-54',
        parameter: ''
      },
      totalPrecipitation: 0, // New property to hold total precipitation
      parameters: [
        { name: 'Precipitation Total (PRECTOT)', value: 'PRECTOT' },
        { name: 'Precipitación Total Corregida (PRECTOTCORR)', value: 'PRECTOTCORR' }, // Agregado
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
      }
    };
  },
  methods: {
    async submitForm() {
      const { start, end, latitude, longitude, parameter } = this.requestData;
      const url = `https://power.larc.nasa.gov/api/temporal/hourly/point?start=${start}&end=${end}&latitude=${latitude}&longitude=${longitude}&community=ag&parameters=${parameter}&format=json&user=Magno&header=true&time-standard=lst`;

      console.log("URL");
      console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();

        // Inspecciona la respuesta de la API
        console.log("API Response:", data);

        // Asegúrate de que existe la estructura esperada
        if (data.properties.parameter[parameter]) {
          this.processData(data.properties.parameter[parameter]);
        } else {
          console.error("Data format incorrect or parameter missing");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    processData(data) {
      if (!data || typeof data !== 'object') {
        console.error("Invalid data format");
        return;
      }

      // Obtener las fechas como etiquetas y los valores de precipitación o parámetro
      const labels = Object.keys(data);  // Ejemplo: ["2020010100", "2020010101"]
      const values = Object.values(data); // Ejemplo: [0.01, 0.03]

      // Calcular la suma total de precipitaciones
      this.totalPrecipitation = values.reduce((acc, value) => acc + value, 0);

      // Actualizar los datos del gráfico
      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Precipitation Data (PRECTOTCORR)',  // Cambiar el label según el parámetro
            backgroundColor: '#42A5F5',
            borderColor: '#42A5F5',
            data: values,
            fill: false
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
  margin: 0 auto;
}

.line-chart {
  max-height: 400px;
}
</style>
