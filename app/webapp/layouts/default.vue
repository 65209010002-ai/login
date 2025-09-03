
<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <AppDrawer />
    </v-navigation-drawer>

    <v-app-bar  app color="#01579B" dark>
      <AppHeader />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <v-footer app color="#0D47A1">
      <AppFooter />
    </v-footer>
  </v-app>
</template>

<script setup>
import AppDrawer from '~/components/AppDrawer.vue'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>