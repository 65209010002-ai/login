<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="firstname"
          label="First name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="lastname"
          label="Last name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="email"
          label="E-mail"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn class="mt-2" type="submit" block @click="login">Login</v-btn>
  </v-container>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');

    const login = function()  {
      console.log('Login');
      console.log('firstname=', firstname.value);
      console.log('lastname=', lastname.value);
      console.log('email=', email.value);
    };

    return {
      firstname,
      lastname,
      email,
      login,
    };
  },
};
</script>