<template>
  <v-text-field v-model="firstName" label="First name"></v-text-field>
  <v-text-field v-model="lastName" label="Last name"></v-text-field>
  <v-btn @click="Login" class="mt-2" block>Submit</v-btn>

  <div class="mt-4">
    <p>ผลลัพธ์จาก API:</p>
    <p>ชื่อ: {{ apiFirstName }}</p>
  </div>
</template>
<script setup>
import { ref } from "vue";

const firstName = ref('')
const lastName = ref('')
const apiFirstName = ref('')

 async function Login(params) {
   console.log("name=", firstName.value);
   
  const response = await fetch('http://localhost:7000/list?username='+ firstName.value); // URL ของ API
  const data = await response.json(); // แปลง response เป็น JSON
  console.log('data=', data)
  apiFirstName.value = data.user.username


}
</script>