<template>
  <div class="dashboard-layout">


    <main class="main-content">
      <header class="dashboard-header">
        <h1>หน้า Dashboard</h1>
        <p>ยินดีต้อนรับ</p>
      </header>

      <section class="stats-grid">
        <div class="stat-card">
          <h3><i class="icon-users"></i> ผู้ใช้งานทั้งหมด</h3>
          <p class="stat-value">{{ totalUsers.toLocaleString() }}</p>
        </div>
        <div class="stat-card">
          <h3><i class=""></i> ยอดเข้าชม</h3>
          <p class="stat-value">{{ totalSales.toLocaleString() }} คน</p>
        </div>
        <div class="stat-card">
          <h3><i class=""></i> ผู้ให้การสนับสนุน</h3>
          <p class="stat-value">{{ newOrders.toLocaleString() }}</p>
        </div>
        <div class="stat-card">
          <h3><i class=""></i> ค่าเฉลี่ยผู้ใช้งาน</h3>
          <p class="stat-value">{{ averageRevenue.toLocaleString() }} คน</p>
        </div>
         <div class="stat-card">
          <h3><i class=""></i> คนไทย</h3>
          <p class="stat-value">{{ thai.toLocaleString() }} คน</p>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// ข้อมูลสมมติสำหรับ Dashboard
const totalUsers = ref(25);
const totalSales = ref(200);
const newOrders = ref(78);
const averageRevenue = ref(58.50);
const thai = ref(198);

// สำหรับสร้างกราฟตัวอย่าง (ไม่ใช้งาน Chart.js หรือไลบรารีใดๆ)
const drawSampleChart = () => {
  const canvas = document.getElementById('monthlySalesChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    // วาดกราฟเส้นง่ายๆ
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width * 0.1, canvas.height * 0.7);
    ctx.lineTo(canvas.width * 0.2, canvas.height * 0.8);
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.5);
    ctx.lineTo(canvas.width * 0.4, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.6, canvas.height * 0.4);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.2);
    ctx.lineTo(canvas.width * 0.8, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.9, canvas.height * 0.1);
    ctx.lineTo(canvas.width, canvas.height * 0.2);
    ctx.strokeStyle = '#03A6A1';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};

onMounted(() => {
  drawSampleChart(); // วาดกราฟเมื่อคอมโพเนนต์ถูก Mount
});
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  background-color: #343a40;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  font-size: 1.8em;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  display: block;
  color: #adb5bd;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar a:hover {
  background-color: #495057;
  color: #fff;
}

.sidebar a.active {

  color: #fff;
  font-weight: bold;
}

.main-content {
  flex-grow: 1;
  padding: 30px;
}

.dashboard-header {
  margin-bottom: 30px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.dashboard-header h1 {
  color: #343a40;
  margin-bottom: 5px;
}

.dashboard-header p {
  color: #6c757d;
  font-size: 1.1em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-left: 5px solid #03A6A1; /* Accent border */
}

.stat-card h3 {
  color: #555;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.stat-card .stat-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
}

/* Simple icons placeholder */



.charts-section,
.recent-activity {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.charts-section h2,
.recent-activity h2 {
  color: #343a40;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.chart-container {
  text-align: center;
}

.chart-container h3 {
  margin-bottom: 15px;
  color: #555;
}

.chart-note {
  font-size: 0.9em;
  color: #888;
  margin-top: 10px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
}

.recent-activity li {
  background-color: #fefefe;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  color: #555;
}

.recent-activity li:last-child {
  border-bottom: none;
}

.activity-time {
  font-weight: bold;
  color: #007bff;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 15px;
  }

  .sidebar h2 {
    margin-bottom: 20px;
  }

  .sidebar nav ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .sidebar nav li {
    margin: 5px;
  }

  .main-content {
    padding: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>