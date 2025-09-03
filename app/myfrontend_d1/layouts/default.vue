<template>
  <v-app class="bg-grey-lighten-5">
    <!-- Main Content -->
    <v-main>
      <v-container class="py-4">
        <slot />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="grey-lighten-4">
      <v-col class="text-center text-caption">
        &copy; {{ new Date().getFullYear() }} วิทยาลัยเทคนิคชัยภูมิ | ระบบประเมินบุคลากร
      </v-col>
    </v-footer>
  </v-app>
</template>
