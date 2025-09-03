<template>
  <div class="about-container">
    <header class="about-header">
      <h1>เกี่ยวกับเรา</h1>
      <p>เรียนรู้เรื่องราวของเราและสิ่งที่เราทำ</p>
      <h1>วัทยาลัยเทคนิคชัยภูมิ 2525</h1>
    </header>

    <section class="about-content">
    </section>

    <div class="text-center">
      <NuxtLink to="/" class="button-back">กลับหน้าหลัก</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// ไม่มี script สำหรับหน้านี้ เพราะเป็นแค่เนื้อหาสั้นๆ
</script>

<style scoped>
.about-container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-header {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.about-header h1 {
  color: #007bff;
  font-size: 2.8em;
  margin-bottom: 10px;
}

.about-header p {
  color: #666;
  font-size: 1.2em;
}

.about-content p {
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #444;
}

.text-center {
  text-align: center;
  margin-top: 30px;
}

.button-back {
  display: inline-block;
  background-color: #6c757d;
  color: white;
  padding: 12px 25px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 1em;
}

.button-back:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .about-container {
    margin: 20px auto;
    padding: 20px;
  }
  .about-header h1 {
    font-size: 2em;
  }
  .about-header p {
    font-size: 1em;
  }
  .about-content p {
    font-size: 0.95em;
  }
}
</style>