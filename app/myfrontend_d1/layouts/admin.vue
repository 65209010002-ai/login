<template>
  <v-app>
    <v-app-bar app dark elevation="2" image="https://wallpapercat.com/w/full/d/2/3/678921-3840x2160-desktop-4k-cn-tower-canada-wallpaper-image.jpg">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white" />
      <v-toolbar-title class="text-h6 font-weight-bold text-white">
        ระบบประเมินบุคลากรเทคนิคชัยภูมิ
      </v-toolbar-title>
      <v-spacer />
      <v-btn text class="text-white text-caption mr-3 d-none d-md-flex" v-if="userName">
        {{ userName }}
      </v-btn>
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title class="text-caption">บทบาท: {{ userRole }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container class="py-4">
        <slot />
      </v-container>
    </v-main>

    <v-footer app color="grey-lighten-4">
      <v-col class="text-center text-caption">
        &copy; {{ currentYear }} วิทยาลัยเทคนิคชัยภูมิ | ระบบประเมินบุคลากร
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      userName: 'นายสมชาย',
      userRole: 'ผู้ดูแลระบบ'
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  },
  methods: {
    logout() {
      alert("ออกจากระบบแล้ว");
    }
  }
};
</script>
