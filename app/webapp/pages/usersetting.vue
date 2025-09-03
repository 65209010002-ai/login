<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">ชื่อ:</label>
      <input type="text" id="firstName" v-model="formData.firstName" required>
    </div>
    <div>
      <label for="lastName">นามสกุล:</label>
      <input type="text" id="lastName" v-model="formData.lastName" required>
    </div>
    <div>
      <label for="age">อายุ:</label>
      <input type="number" id="age" v-model.number="formData.age" required min="0">
    </div>
    <div>
      <label for="gender">เพศ:</label>
      <select id="gender" v-model="formData.gender" required>
        <option value="">เลือกเพศ</option>
        <option value="male">ชาย</option>
        <option value="female">หญิง</option>
        <option value="other">อื่นๆ</option>
      </select>
    </div>
    <button type="submit">เปลี่ยน</button>
  </form>

  <div v-if="submittedData">
    <h3>ข้อมูลที่ส่งไป:</h3>
    <p><strong>ชื่อ:</strong>phaonalrad </p>
    <p><strong>นามสกุล:</strong>jansan </p>
    <p><strong>อายุ:</strong>34  ปี</p>
    <p><strong>เพศ:</strong>ชาย </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  firstName: '',
  lastName: '',
  age: null,
  gender: ''
});

const submittedData = ref(null);

const handleSubmit = () => {
  // เมื่อฟอร์มถูกส่ง เราจะเก็บข้อมูลไว้ใน submittedData
  submittedData.value = { ...formData.value };

  // คุณสามารถส่งข้อมูลนี้ไปยัง API หรือจัดการตามต้องการ
  console.log('ข้อมูลฟอร์ม:', formData.value);

  // หลังจากส่งข้อมูล คุณอาจจะต้องการล้างฟอร์ม
  // formData.value = {
  //   firstName: '',
  //   lastName: '',
  //   age: null,
  //   gender: ''
  // };
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: calc(100% - 12px);
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

h3 {
  margin-top: 30px;
  color: #333;
}

p {
  margin-bottom: 5px;
}

strong {
  color: #555;
}
</style>