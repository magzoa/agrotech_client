
<template>

<v-app id="app">
 <CoreToolbar></CoreToolbar>
 <CoreDrawer></CoreDrawer>
<CoreView></CoreView>

<Footer></Footer>

    </v-app>



</template>

<script>

import CoreDrawer from '@/components/common/Drawer'
import CoreToolbar from '@/components/common/Toolbar'

import CoreView from '@/components/common/View'

import Footer from '@/components/common/Footer.vue';




export default {
  name: 'App',

  components: {
    CoreToolbar,
    CoreDrawer,
    CoreView,
    Footer
  },

  data: () => ({
    refreshing: false,
      registration: null,
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: 6000
  }),
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
        this.refreshing = true;
      window.location.reload();
    });
  },
  methods:{
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = 'Refresh';
      this.snackWithBtnText = 'New version available!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
  }
};




</script>




