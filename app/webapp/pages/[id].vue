<template>
  <div class="container">
    <header class="hero">
      <h1>ยินดีต้อนรับสู่เว็บไซต์ของเรา!</h1>
      <p>นี่คือหน้าโฮมเพจแบบง่าย ๆ ที่สร้างด้วย Nuxt.js</p>
      <NuxtLink to="/about" class="button">เกี่ยวกับเรา</NuxtLink>
      <NuxtLink to="/contact" class="button secondary">ติดต่อเรา</NuxtLink>
    </header>

    <section class="features">
  
    </section>

    <footer class="footer">
      <p>&copy; {{ currentYear }} เว็บไซต์ของฉัน. สงวนลิขสิทธิ์.</p>
    </footer>
  </div>
</template>

<script setup>
// สำหรับแสดงปีปัจจุบันใน footer
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  background-color: #f4f4f4;
  padding: 50px 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.hero p {
  color: #666;
  font-size: 1.2em;
  margin-bottom: 20px;
}

.button {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin: 5px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

.button.secondary {
  background-color: #6c757d;
}

.button.secondary:hover {
  background-color: #5a6268;
}

.features {
  margin-bottom: 30px;
}

.features h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
  font-size: 2em;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.feature-item {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-item h3 {
  color: #007bff;
  margin-bottom: 10px;
}

.footer {
  text-align: center;
  padding: 20px;
  border-top: 1px solid #eee;
  color: #777;
  font-size: 0.9em;
  margin-top: 40px;
}
</style>