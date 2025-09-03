<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://scontent.fbkk7-2.fna.fbcdn.net/v/t39.30808-6/487814502_1825972538189630_5897150491870014809_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGncNCk_Oe9mR20wA9_wwllP3ehRNdzJaA_d6FE13MloCMsAulxAajzXrljwMhY8UiVP9TZf6D0DVMBV_iwcbAf&_nc_ohc=7JnWL4AwA9MQ7kNvwGXt1yS&_nc_oc=AdlG8qzPnydT-1tRgqTMqyVK9MfNolCCd5Y1zQ9KGG6SbN-Mnn7OeRXnf8v_l9M6uWY&_nc_zt=23&_nc_ht=scontent.fbkk7-2.fna&_nc_gid=ANBfhCGjWmiCvrqbqJduYg&oh=00_AfMEeVqs87LipWwEpI132xAgt-r-bBCv3Dot7AAqRRHsKA&oe=684DD64C"
            title="DIER5555"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item
            prepend-icon="mdi-minus-box"
            title="Login"
            value="account"
            to="/login"
          ></v-list-item>
           <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Home"
            value="account"
            to="/index"
          ></v-list-item>
         
          <v-list-item
            prepend-icon="	mdi-pencil"
            title="Userseting"
            value="users"
            to="/usersetting"
          ></v-list-item>
           <v-list-item
            prepend-icon="	mdi-checkbox-marked"
            title="Dashbord"
            value="account"
            to="/dashbord"
          ></v-list-item>
          
          
           <v-list-item
            prepend-icon="	mdi-information"
            title="About"
            value="account"
            to="/about"
          ></v-list-item>

        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 650px"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
  import { ref } from 'vue'

  const drawer = ref(true)
  const rail = ref(true)
</script>