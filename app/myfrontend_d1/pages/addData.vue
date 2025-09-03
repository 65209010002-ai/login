<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="email" label="E-mail" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="password" label="Password" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="status" label="Status" />
      </v-col>

      <v-col cols="12" md="4">
        <input type="file" @change="onFileChange" />
      </v-col>
    </v-row>
    <v-btn class="mt-2" block @click="addMember">Add</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const password = ref("");
const status = ref("");
const file = ref(null);

const onFileChange = (e) => {
  file.value = e.target.files[0];
};

const addMember = async () => {
  try {
    const formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("status", status.value);
    formData.append("photo", file.value); // key ต้องตรงกับ multer.single('photo')

    const response = await axios.post("http://localhost:7000/add-user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ Upload success", response.data);
  } catch (error) {
    console.error("❌ Upload failed", error.response?.data || error.message);
  }
};
</script>
