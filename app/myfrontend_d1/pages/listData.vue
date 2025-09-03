<template>
<input type="button" @click="showData" value="show">
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const showData = async () => {
  
  const response = await axios.get("http://localhost:7000");
  const data = response.data;
  console.log(data)
};
</script>