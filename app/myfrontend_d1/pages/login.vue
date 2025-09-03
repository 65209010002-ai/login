<template>
  <v-sheet class="mx-auto" width="300">
    <v-form ref="form">
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field v-model="password" label="Password"></v-text-field>
      <div class="d-flex flex-column">
        <v-btn class="mt-4" color="success" block @click="doLogin">
          Login
        </v-btn>
        <v-btn class="mt-4" color="error" block @click="reset">
          Reset Form
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

 methods: {
  async doLogin() {
    try {
      console.log("Login with", this.email, this.password);

      const response = await axios.post("http://localhost:7000/login", {
        email: this.email,
        password: this.password,
      });

      if (response.data.status === "ok") {
        const token = response.data.token;

        // เก็บ token (JWT) ลง localStorage
        localStorage.setItem("token", token);

        alert("เข้าสู่ระบบสำเร็จ!");
        this.$router.push("/showData");
      } else {
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        this.reset();
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  },

  reset() {
    this.email = "";
    this.password = "";
  },
},
}
</script>
