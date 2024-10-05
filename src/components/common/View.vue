

<template>
  <v-main id="app" class="pb-0">
    <v-slide-y-reverse-transition>
      <router-view v-show="show" />
    </v-slide-y-reverse-transition>
  </v-main>
</template>

<script>
export default {
  created() {
    this.show = true;
  },
};
</script>



