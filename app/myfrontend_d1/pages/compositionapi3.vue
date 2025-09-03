<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="firstname" label="First name" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="lastname" label="Last name" required />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="email" label="E-mail" />
      </v-col>
       <v-col cols="12" md="4">
        <v-text-field v-model="email" label="E-mail" />
      </v-col>
    </v-row>
    <v-btn class="mt-2" type="submit" block @click="login">Login</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstname = ref('')
const lastname = ref('')
const email = ref('')

const login = async () => {
  const dataMember = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
  }

  console.log('dataMember', dataMember)

  try {
    const response = await axios.post('http://localhost:7000/add-user', dataMember)
    console.log('response', response.data)

    // ย้ายหน้า ถ้าสำเร็จ
    // router.push('/dashboard')
  } catch (error) {
    console.error('เกิดข้อผิดพลาด', error)
  }
}
</script>
